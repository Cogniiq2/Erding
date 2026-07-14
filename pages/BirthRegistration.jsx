import { useMemo, useState } from "react";
import CTAButton from "../components/CTAButton.jsx";
import PageHero from "../components/PageHero.jsx";

const steps = ["Persönliches", "Schwangerschaft", "Terminwunsch"];

export default function BirthRegistration() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    week: "",
    date: "",
    note: "",
  });

  const errors = useMemo(() => {
    const next = {};
    if (step === 0) {
      if (!form.name.trim()) next.name = "Bitte Namen eintragen.";
      if (!form.phone.trim()) next.phone = "Bitte Telefonnummer eintragen.";
    }
    if (step === 1 && !form.week.trim()) next.week = "Bitte Schwangerschaftswoche eintragen.";
    if (step === 2 && !form.date.trim()) next.date = "Bitte Wunschtermin eintragen.";
    return next;
  }, [form, step]);

  function update(key, value) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function next(event) {
    event.preventDefault();
    if (Object.keys(errors).length) return;
    if (step < steps.length - 1) setStep(step + 1);
    else setSubmitted(true);
  }

  return (
    <>
      <PageHero
        kicker="Demo-Formular"
        title="Geburt anmelden"
        lead="Drei ruhige Schritte. Die Daten verlassen in dieser Konzeptstudie niemals den Browser."
        tone="gold"
        current="Geburt anmelden"
        index="09"
      />
      <section className="site-section">
        <div className="wrap form-shell">
          <ol className="stepper" aria-label="Formularschritte">
            {steps.map((label, index) => (
              <li key={label} className={index === step ? "on" : index < step || submitted ? "done" : ""}>
                <span className="mono">{String(index + 1).padStart(2, "0")}</span>
                {label}
              </li>
            ))}
          </ol>

          {submitted ? (
            <div className="summary-card">
              <h2 className="h2">Demo-Zusammenfassung</h2>
              <dl className="mono">
                <dt>Name</dt><dd>{form.name}</dd>
                <dt>Telefon</dt><dd>{form.phone}</dd>
                <dt>SSW</dt><dd>{form.week}</dd>
                <dt>Terminwunsch</dt><dd>{form.date}</dd>
                <dt>Hinweis</dt><dd>{form.note || "Keine Angabe"}</dd>
              </dl>
              <p>Diese Demo hat nichts versendet. Für echte Termine bitte das Sekretariat kontaktieren.</p>
              <CTAButton href="tel:+498122591648" icon="phone" tone="gold">08122 59-1648</CTAButton>
            </div>
          ) : (
            <form className="birth-form" onSubmit={next} noValidate>
              {step === 0 ? (
                <>
                  <label>
                    <span>Name</span>
                    <input value={form.name} onChange={(event) => update("name", event.target.value)} aria-invalid={Boolean(errors.name)} />
                    {errors.name ? <small>{errors.name}</small> : null}
                  </label>
                  <label>
                    <span>Telefon</span>
                    <input value={form.phone} onChange={(event) => update("phone", event.target.value)} aria-invalid={Boolean(errors.phone)} />
                    {errors.phone ? <small>{errors.phone}</small> : null}
                  </label>
                </>
              ) : null}
              {step === 1 ? (
                <>
                  <label>
                    <span>Schwangerschaftswoche</span>
                    <input value={form.week} onChange={(event) => update("week", event.target.value)} aria-invalid={Boolean(errors.week)} />
                    {errors.week ? <small>{errors.week}</small> : null}
                  </label>
                  <label>
                    <span>Hinweis</span>
                    <textarea value={form.note} onChange={(event) => update("note", event.target.value)} rows="4" />
                  </label>
                </>
              ) : null}
              {step === 2 ? (
                <label>
                  <span>Wunschtermin</span>
                  <input type="date" value={form.date} onChange={(event) => update("date", event.target.value)} aria-invalid={Boolean(errors.date)} />
                  {errors.date ? <small>{errors.date}</small> : null}
                </label>
              ) : null}
              <div className="form-actions">
                {step > 0 ? <button type="button" className="btn btn-ghost" onClick={() => setStep(step - 1)}>Zurück</button> : null}
                <button type="submit" className="btn btn-gold">{step === steps.length - 1 ? "Demo prüfen" : "Weiter"}</button>
              </div>
              <p className="demo-notice">Demo: Es werden keine Daten übertragen oder gespeichert.</p>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
