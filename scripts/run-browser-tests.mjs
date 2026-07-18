import { spawn } from "node:child_process";

const port = 4173;
const baseURL = `http://127.0.0.1:${port}`;
const viteBin = "./node_modules/vite/bin/vite.js";
const playwrightCli = "./node_modules/playwright/cli.js";
const isCI = process.env.CI === "true";
const usePlaywrightWebServer = isCI && process.platform !== "win32";

function spawnNode(args, options = {}) {
  return spawn(process.execPath, args, {
    stdio: "inherit",
    windowsHide: true,
    ...options,
  });
}

async function waitForServer(timeout = 60000) {
  const startedAt = Date.now();
  while (Date.now() - startedAt < timeout) {
    try {
      const response = await fetch(baseURL);
      if (response.ok) return;
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  }
  throw new Error(`Timed out waiting for ${baseURL}`);
}

function waitForExit(child) {
  return new Promise((resolve) => {
    child.once("exit", (code, signal) => {
      resolve(code ?? (signal ? 1 : 0));
    });
  });
}

function stop(child) {
  if (!child.killed) child.kill();
}

let server;

let exitCode;

try {
  if (usePlaywrightWebServer) {
    const testRun = spawnNode([playwrightCli, "test", ...process.argv.slice(2)]);
    exitCode = await waitForExit(testRun);
  } else {
    server = spawnNode([viteBin, "preview", "--host", "127.0.0.1", "--port", String(port)], {
      stdio: "ignore",
    });
    await waitForServer();
    const testRun = spawnNode([playwrightCli, "test", ...process.argv.slice(2)], {
      env: { ...process.env, PLAYWRIGHT_EXTERNAL_SERVER: "1" },
    });
    exitCode = await waitForExit(testRun);
  }
} finally {
  if (server) stop(server);
}

process.exit(exitCode ?? 1);
