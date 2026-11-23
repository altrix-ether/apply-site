"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

function storageKey(jobId) {
  return `ax-applied:${jobId}`;
}

function readApplied(jobId) {
  try {
    const saved = localStorage.getItem(storageKey(jobId));
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

function rememberApplied(jobId, record) {
  try {
    localStorage.setItem(storageKey(jobId), JSON.stringify(record));
  } catch {
    // The form still stays closed for this visit.
  }
}

export default function ApplyForm({ job }) {
  const router = useRouter();
  const lock = useRef(false);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [ready, setReady] = useState(false);
  const [applied, setApplied] = useState(null);

  useEffect(() => {
    setApplied(readApplied(job.id));
    setReady(true);
  }, [job.id]);

  async function onSubmit(event) {
    event.preventDefault();
    if (lock.current || applied) return;
    lock.current = true;
    setError("");
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const note = String(data.get("note") || "").trim();
    const linkedin = String(data.get("linkedin") || "").trim();

    const reject = (message) => {
      lock.current = false;
      setPending(false);
      setError(message);
    };

    if (name.length < 2) return reject("Enter your full name.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return reject("Enter a valid email address.");
    if (linkedin && !/^https?:\/\/.+/i.test(linkedin)) {
      return reject("LinkedIn should be a full URL, starting with https://.");
    }
    if (note.length < 20) return reject("Tell us a little more — at least a sentence or two.");

    data.set("jobId", job.id);
    setPending(true);
    try {
      const res = await fetch("/api/applications", { method: "POST", body: data });
      const body = await res.json().catch(() => ({}));
      if (res.status === 409) {
        const record = { id: "", jobTitle: job.title, email };
        rememberApplied(job.id, record);
        setApplied(record);
        setPending(false);
        lock.current = false;
        return;
      }
      if (!res.ok) return reject(body.error || "Something went wrong. Try again.");
      const record = {
        id: body.application.id,
        jobTitle: body.application.jobTitle,
        email,
      };
      rememberApplied(job.id, record);
      setApplied(record);
      const params = new URLSearchParams({
        ref: record.id,
        role: record.jobTitle,
      });
      router.push(`/apply/success?${params.toString()}`);
    } catch {
      reject("Could not reach the application service. Is the API running?");
    }
  }

  if (!ready) {
    return (
      <aside className="apply-card">
        <h2>Apply</h2>
        <p className="hint">Checking this role…</p>
      </aside>
    );
  }

  if (applied) {
    return (
      <aside className="apply-card">
        <h2>You already applied</h2>
        <p className="hint">This page already sent an application for {job.title}. A second one is not accepted.</p>
        {applied.id ? <div className="ref">{applied.id}</div> : null}
        <p className="fine">A recruiter writes back within ten days if there is a fit.</p>
      </aside>
    );
  }

  return (
    <form className="apply-card form" onSubmit={onSubmit}>
      <h2>Apply</h2>
      <p className="hint">{job.title}</p>
      {error ? <div className="error">{error}</div> : null}
      <label>
        Full name
        <input className="field" name="name" autoComplete="name" required />
      </label>
      <label>
        Email
        <input className="field" name="email" type="email" autoComplete="email" required />
      </label>
      <label>
        Phone
        <input className="field" name="phone" type="tel" autoComplete="tel" />
      </label>
      <label>
        City
        <input className="field" name="city" autoComplete="address-level2" />
      </label>
      <label>
        LinkedIn
        <input className="field" name="linkedin" placeholder="https://linkedin.com/in/..." />
      </label>
      <label>
        Work authorization
        <select className="select" name="workAuth" defaultValue="Authorized where this role is based">
          <option>Authorized where this role is based</option>
          <option>Will need sponsorship</option>
          <option>Prefer not to say</option>
        </select>
      </label>
      <label>
        Resume
        <input className="file" name="resume" type="file" accept=".pdf,.doc,.docx,application/pdf" />
      </label>
      <label>
        Why this role
        <textarea
          className="area"
          name="note"
          required
          placeholder="A few sentences on a problem you made clearer."
        />
      </label>
      <button className="btn btn-primary btn-block" type="submit" disabled={pending}>
        {pending ? "Sending…" : "Submit application"}
      </button>
      <p className="fine">PDF or Word resume, up to 5 MB. We use this only to review your application.</p>
    </form>
  );
}
