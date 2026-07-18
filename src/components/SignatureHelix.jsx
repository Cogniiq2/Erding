import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useReducedMotion } from "../lib/motion.js";

const KEYTIMES = [0, 0.42, 0.62, 0.8, 1];
const ACT_COLORS = ["#5fd4cf", "#8fe0db", "#f7f6f2", "#c9964b", "#5fd4cf"];
const CAM_Z = [12.4, 9.8, 14.5, 10.5, 7.5];
const CAM_Y = [0, -5.5, 0, 0, 0];
const ROT_SPEED = [0.22, 0.3, 0.015, 0.1, 0.4];
const HELIX_TRAVEL = 13;

function rand(i, salt = 1) {
  const x = Math.sin(i * 127.1 + salt * 311.7) * 43758.5453123;
  return x - Math.floor(x);
}

function smooth(x) {
  return x * x * (3 - 2 * x);
}

function segmentFromProgress(progress) {
  for (let i = 0; i < KEYTIMES.length - 1; i += 1) {
    if (progress <= KEYTIMES[i + 1] || i === KEYTIMES.length - 2) {
      const local = (progress - KEYTIMES[i]) / (KEYTIMES[i + 1] - KEYTIMES[i]);
      return i + Math.min(Math.max(local, 0), 0.9999);
    }
  }
  return KEYTIMES.length - 2 + 0.9999;
}

function buildHelix(count, phaseShift, yShift, radius) {
  const out = new Float32Array(count * 3);
  const turns = 5.5;
  const height = 31;
  for (let i = 0; i < count; i += 1) {
    const k = i * 3;
    const r = rand(i, 2);
    const t = ((i * 7919) % count) / count;
    const jitterX = (rand(i, 5) - 0.5) * 0.14;
    const jitterZ = (rand(i, 9) - 0.5) * 0.14;

    if (r < 0.84) {
      const strand = r < 0.42 ? 0 : Math.PI;
      const angle = t * Math.PI * 2 * turns + strand + phaseShift;
      out[k] = Math.cos(angle) * radius + jitterX;
      out[k + 1] = (t - 0.5) * height + yShift;
      out[k + 2] = Math.sin(angle) * radius + jitterZ;
    } else {
      const rung = Math.floor(t * 46) / 46;
      const angle = rung * Math.PI * 2 * turns + phaseShift;
      const side = ((r - 0.84) / 0.16) * 2 - 1;
      out[k] = Math.cos(angle) * radius * side;
      out[k + 1] = (rung - 0.5) * height + yShift;
      out[k + 2] = Math.sin(angle) * radius * side;
    }
  }
  return out;
}

function pulse(u) {
  if (u < 0.14) return Math.sin((u / 0.14) * Math.PI) * 0.32;
  if (u < 0.22) return 0;
  if (u < 0.26) return -((u - 0.22) / 0.04) * 0.5;
  if (u < 0.32) return -0.5 + ((u - 0.26) / 0.06) * 3.4;
  if (u < 0.38) return 2.9 - ((u - 0.32) / 0.06) * 3.7;
  if (u < 0.46) return -0.8 + ((u - 0.38) / 0.08) * 0.8;
  if (u < 0.72) return Math.sin(((u - 0.46) / 0.26) * Math.PI) * 0.6;
  return 0;
}

function buildShapes(count) {
  const helixA = buildHelix(count, 0, 0, 3.45);
  const helixB = buildHelix(count, Math.PI * 2.2, 7.5, 3.9);
  const ecg = new Float32Array(count * 3);
  const cell = new Float32Array(count * 3);
  const core = new Float32Array(count * 3);
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < count; i += 1) {
    const k = i * 3;
    const t = i / count;
    const beat = (t * 2) % 1;
    ecg[k] = (t - 0.5) * 19 + (rand(i, 12) - 0.5) * 0.05;
    ecg[k + 1] = pulse(beat) * 1.6 + (rand(i, 13) - 0.5) * 0.16;
    ecg[k + 2] = (rand(i, 14) - 0.5) * 0.5;

    if (i % 5 === 0) {
      const theta = rand(i, 15) * Math.PI * 2;
      const phi = Math.acos(2 * rand(i, 16) - 1);
      const r = 1.05 * Math.cbrt(rand(i, 17));
      cell[k] = r * Math.sin(phi) * Math.cos(theta);
      cell[k + 1] = r * Math.sin(phi) * Math.sin(theta);
      cell[k + 2] = r * Math.cos(phi);
    } else {
      const y = 1 - (i / (count - 1)) * 2;
      const radial = Math.sqrt(1 - y * y);
      const theta = goldenAngle * i;
      const r = 3.3 + (rand(i, 18) - 0.5) * 0.12;
      cell[k] = Math.cos(theta) * radial * r;
      cell[k + 1] = y * r;
      cell[k + 2] = Math.sin(theta) * radial * r;
    }

    const gaussian = (salt) => (rand(i, salt) + rand(i, salt + 1) + rand(i, salt + 2) - 1.5) * 0.75;
    core[k] = gaussian(21);
    core[k + 1] = gaussian(24);
    core[k + 2] = gaussian(27);
  }

  return [helixA, helixB, ecg, cell, core];
}

export default function SignatureHelix() {
  const hostRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;

    const particleCount = window.innerWidth < 720 ? 1450 : 2400;
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x07181d, 0.045);

    const camera = new THREE.PerspectiveCamera(50, host.clientWidth / host.clientHeight, 0.1, 100);
    camera.position.set(0, 0, CAM_Z[0]);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, window.innerWidth < 720 ? 1.25 : 1.75));
    renderer.setSize(host.clientWidth, host.clientHeight);
    host.appendChild(renderer.domElement);

    const shapes = buildShapes(particleCount);
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(shapes[0]);
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const baseSize = window.innerWidth < 720 ? 2.4 : 2.2;
    const material = new THREE.PointsMaterial({
      color: new THREE.Color(ACT_COLORS[0]),
      size: baseSize,
      transparent: true,
      opacity: 1,
      sizeAttenuation: false,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const glowMaterial = new THREE.PointsMaterial({
      color: new THREE.Color(ACT_COLORS[0]),
      size: baseSize * 3.2,
      transparent: true,
      opacity: 0.12,
      sizeAttenuation: false,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const group = new THREE.Group();
    const visualOffset = window.innerWidth < 720 ? 0.7 : 3.15;
    group.position.x = visualOffset;
    const cloud = new THREE.Points(geometry, material);
    const glowCloud = new THREE.Points(geometry, glowMaterial);
    group.add(glowCloud);
    group.add(cloud);
    group.rotation.z = 0.22;
    scene.add(group);

    const phases = new Float32Array(particleCount);
    for (let i = 0; i < particleCount; i += 1) phases[i] = rand(i, 30) * Math.PI * 2;

    let mouseX = 0;
    let mouseY = 0;
    let raf = 0;
    let timePrev = 0;
    let elapsed = 0;
    const color = new THREE.Color();
    const colorA = new THREE.Color();
    const colorB = new THREE.Color();

    const onMouse = (event) => {
      mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    const resize = () => {
      const width = Math.max(host.clientWidth, 1);
      const height = Math.max(host.clientHeight, 1);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    const progressForHost = () => {
      const story = host.closest(".home-story");
      if (!story) {
        const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        return Math.min(1, window.scrollY / max);
      }
      const total = Math.max(1, story.offsetHeight - window.innerHeight);
      const rect = story.getBoundingClientRect();
      return Math.min(Math.max(-rect.top / total, 0), 1);
    };

    const animate = (timeNow) => {
      raf = requestAnimationFrame(animate);
      const dt = Math.min((timeNow - timePrev) / 1000, 0.05);
      timePrev = timeNow;
      elapsed += dt;

      const progress = reduced ? 0.18 : progressForHost();
      const segment = segmentFromProgress(progress);
      const idx = Math.floor(segment);
      const local = smooth(segment - idx);
      const a = shapes[idx];
      const b = shapes[idx + 1];

      const helixTravel = Math.min(segment / 2, 1);
      const travelFade = segment < 2 ? 1 : Math.max(1 - (segment - 2) * 5, 0);
      const streamY = smooth(helixTravel) * HELIX_TRAVEL * travelFade;
      group.position.y += (streamY - group.position.y) * (idx >= 2 ? 0.18 : 0.08);
      const targetX = idx === 2 ? (window.innerWidth < 720 ? 0.25 : 0.8) : visualOffset;
      group.position.x += (targetX - group.position.x) * 0.08;

      const arr = geometry.attributes.position.array;
      const wobble = reduced ? 0 : 0.05;
      for (let i = 0; i < particleCount; i += 1) {
        const k = i * 3;
        const tx = a[k] + (b[k] - a[k]) * local;
        const ty = a[k + 1] + (b[k + 1] - a[k + 1]) * local + Math.sin(elapsed * 1.4 + phases[i]) * wobble;
        const tz = a[k + 2] + (b[k + 2] - a[k + 2]) * local;
        arr[k] += (tx - arr[k]) * 0.09;
        arr[k + 1] += (ty - arr[k + 1]) * 0.09;
        arr[k + 2] += (tz - arr[k + 2]) * 0.09;
      }
      geometry.attributes.position.needsUpdate = true;

      colorA.set(ACT_COLORS[idx]);
      colorB.set(ACT_COLORS[idx + 1]);
      color.copy(colorA).lerp(colorB, local);
      material.color.copy(color);
      glowMaterial.color.copy(color);

      const ecgWeight = idx === 1 ? local : idx === 2 ? 1 - local : 0;
      material.size = baseSize + ecgWeight * 0.35 * (1 + Math.sin(elapsed * 6)) + (idx >= 3 ? local * 0.28 : 0);
      glowMaterial.size = material.size * 2.6;

      if (!reduced) {
        const camZ = CAM_Z[idx] + (CAM_Z[idx + 1] - CAM_Z[idx]) * local;
        const camY = CAM_Y[idx] + (CAM_Y[idx + 1] - CAM_Y[idx]) * local;
        camera.position.z += (camZ - camera.position.z) * 0.06;
        camera.position.x += (mouseX * 1.1 - camera.position.x) * 0.04;
        camera.position.y += (camY - mouseY * 0.8 - camera.position.y) * 0.04;
        camera.lookAt(0, camY * 0.8, 0);
        group.rotation.y += dt * (ROT_SPEED[idx] + (ROT_SPEED[idx + 1] - ROT_SPEED[idx]) * local);
        group.rotation.z += ((idx <= 1 ? 0.22 : 0) - group.rotation.z) * 0.05;
      }

      renderer.render(scene, camera);
    };

    window.addEventListener("mousemove", onMouse, { passive: true });
    window.addEventListener("resize", resize);
    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("resize", resize);
      geometry.dispose();
      material.dispose();
      glowMaterial.dispose();
      renderer.dispose();
      if (host.contains(renderer.domElement)) renderer.domElement.remove();
    };
  }, [reduced]);

  return (
    <div className="signature-helix" aria-hidden="true" ref={hostRef}>
      <div className="signature-fallback" />
    </div>
  );
}
