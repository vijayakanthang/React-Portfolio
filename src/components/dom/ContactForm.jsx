import { useState } from "react";
import { FiPhone, FiMail, FiSend, FiCopy, FiCheck } from "react-icons/fi";
import { links } from "../../data/profile";

const ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT || "";

export default function ContactForm() {
  const [method, setMethod] = useState("bottle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState({ state: "idle", msg: "" });
  const [copied, setCopied] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(links.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus({ state: "error", msg: "Fill in name, email and a message first." });
      return;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) {
      setStatus({ state: "error", msg: "That email doesn't look right — check it?" });
      return;
    }
    setStatus({ state: "sending", msg: "Sending your note into the world…" });

    // Real submit when a Formspree endpoint is configured; otherwise fall
    // back to the user's mail client so the message is never lost.
    if (ENDPOINT) {
      try {
        const res = await fetch(ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(form),
        });
        if (!res.ok) throw new Error("bad response");
        setStatus({ state: "sent", msg: "Message received. I'll reply soon — thanks for reaching out." });
        setForm({ name: "", email: "", message: "" });
      } catch {
        setStatus({ state: "error", msg: "Network hiccup. Try again, or email me directly." });
      }
      return;
    }

    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:${links.email}?subject=${encodeURIComponent(
      `Portfolio message from ${form.name}`
    )}&body=${body}`;
    setStatus({ state: "sent", msg: "Opening your email client to send the message…" });
  };

  return (
    <div className="contact-grid">
      {/* method selector — phone / letter / bottle */}
      <div className="methods">
        {links.phone && (
          <button type="button" className={`method${method === "phone" ? " on" : ""}`} onClick={() => setMethod("phone")}>
            <FiPhone />
            <span><b>PHONE</b><small>Let's talk</small></span>
          </button>
        )}
        <button type="button" className={`method${method === "letter" ? " on" : ""}`} onClick={() => setMethod("letter")}>
          <FiMail />
          <span><b>LETTER</b><small>Email me</small></span>
        </button>
        <button type="button" className={`method${method === "bottle" ? " on" : ""}`} onClick={() => setMethod("bottle")}>
          <FiSend />
          <span><b>BOTTLE</b><small>Leave a note</small></span>
        </button>

        {method === "letter" && (
          <div className="method-detail">
            <code>{links.email}</code>
            <button type="button" onClick={copyEmail} className="copy-btn">
              {copied ? <FiCheck /> : <FiCopy />} {copied ? "Copied" : "Copy"}
            </button>
          </div>
        )}
        {method === "phone" && links.phone && (
          <div className="method-detail">
            <a href={`tel:${links.phone}`}>{links.phone}</a>
          </div>
        )}
      </div>

      {/* the note */}
      <form className="bottle-note" onSubmit={submit} noValidate>
        <p className="note-head">SEND A MESSAGE</p>
        <label className="sr-only" htmlFor="cf-name">Your name</label>
        <input id="cf-name" className="note-input" placeholder="Your Name" value={form.name} onChange={set("name")} autoComplete="name" />
        <label className="sr-only" htmlFor="cf-email">Your email</label>
        <input id="cf-email" className="note-input" placeholder="Your Email" value={form.email} onChange={set("email")} autoComplete="email" inputMode="email" />
        <label className="sr-only" htmlFor="cf-message">Your message</label>
        <textarea id="cf-message" className="note-input" placeholder="Your Message" rows={4} value={form.message} onChange={set("message")} />
        <button type="submit" className="note-send" disabled={status.state === "sending"}>
          {status.state === "sending" ? "SENDING…" : "SEND MESSAGE"} <FiSend />
        </button>
        {status.msg && (
          <p className={`note-status ${status.state}`} role="status" aria-live="polite">{status.msg}</p>
        )}
      </form>
    </div>
  );
}
