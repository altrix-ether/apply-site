"use client";

import { useEffect, useMemo, useState } from "react";

function when(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value || "";
  return date.toLocaleString();
}

function fileSize(bytes) {
  if (!bytes && bytes !== 0) return "";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function isPdf(name) {
  return /\.pdf$/i.test(name || "");
}

export default function AdminDesk() {
  const [ready, setReady] = useState(false);
  const [username, setUsername] = useState("");
  const [applications, setApplications] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function loadApplications() {
    const res = await fetch("/api/admin/applications", { cache: "no-store" });
    if (res.status === 401) {
      setUsername("");
      setApplications([]);
      return false;
    }
    const body = await res.json().catch(() => ({}));
    if (!res.ok) {
      setError(body.error || "Could not load applications.");
      return false;
    }
    const list = body.applications || [];
    setApplications(list);
    setSelectedId((current) => current || list[0]?.id || "");
    return true;
  }

  useEffect(() => {
    let active = true;
    fetch("/api/admin/session", { cache: "no-store" })
      .then(async (res) => {
        if (!active) return;
        if (!res.ok) {
          setReady(true);
          return;
        }
        const body = await res.json();
        setUsername(body.username || "");
        await loadApplications();
        if (active) setReady(true);
      })
      .catch(() => {
        if (active) setReady(true);
      });
    return () => {
      active = false;
    };
  }, []);

  async function onLogin(event) {
    event.preventDefault();
    setError("");
    setPending(true);
    const data = new FormData(event.currentTarget);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: data.get("username"),
          password: data.get("password"),
        }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(body.error || "Could not sign in.");
        setPending(false);
        return;
      }
      setUsername(body.username || "");
      await loadApplications();
    } catch {
      setError("Could not reach the admin service.");
    }
    setPending(false);
  }

  async function onLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    setUsername("");
    setApplications([]);
    setSelectedId("");
  }

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return applications;
    return applications.filter((application) =>
      [application.name, application.email, application.jobTitle, application.city, application.id]
        .join(" ")
        .toLowerCase()
        .includes(needle),
    );
  }, [applications, query]);

  const selected = filtered.find((application) => application.id === selectedId) || filtered[0] || null;
  const withResume = applications.filter((application) => application.resume).length;

  if (!ready) {
    return (
      <section className="admin">
        <div className="wrap">
          <p className="sub">Loading admin…</p>
        </div>
      </section>
    );
  }

  if (!username) {
    return (
      <section className="admin">
        <div className="wrap">
          <h1>Admin</h1>
          <p className="sub">Sign in to read applications and resumes.</p>
          <form className="apply-card form admin-login" onSubmit={onLogin}>
            {error ? <div className="error">{error}</div> : null}
            <label>
              Username
              <input className="field" name="username" autoComplete="username" required />
            </label>
            <label>
              Password
              <input className="field" name="password" type="password" autoComplete="current-password" required />
            </label>
            <button className="btn btn-primary btn-block" type="submit" disabled={pending}>
              {pending ? "Signing in…" : "Sign in"}
            </button>
          </form>
        </div>
      </section>
    );
  }

  const resumeHref = selected?.resume ? `/api/admin/applications/${selected.id}/resume` : "";

  return (
    <section className="admin">
      <div className="wrap">
        <div className="admin-head">
          <div>
            <h1>Applications</h1>
            <p className="sub">Signed in as {username}. Open a person to read the resume, or download the file.</p>
          </div>
          <button className="btn btn-ghost" type="button" onClick={onLogout}>
            Sign out
          </button>
        </div>
        {error ? <div className="error">{error}</div> : null}
        <div className="admin-stats">
          <div className="admin-stat">
            <span>Applications</span>
            <strong>{applications.length}</strong>
          </div>
          <div className="admin-stat">
            <span>With a resume</span>
            <strong>{withResume}</strong>
          </div>
          <div className="admin-stat">
            <span>Latest</span>
            <strong>{applications[0] ? when(applications[0].submittedAt) : "—"}</strong>
          </div>
        </div>
        {applications.length === 0 ? (
          <div className="empty">No applications yet. A new one appears here after someone applies to the open role.</div>
        ) : (
          <div className="admin-board">
            <aside className="admin-side">
              <div className="admin-search">
                <input
                  className="field"
                  value={query}
                  placeholder="Search name, email, or role"
                  aria-label="Search applications"
                  onChange={(event) => setQuery(event.target.value)}
                />
              </div>
              <div className="admin-people">
                {filtered.length === 0 ? (
                  <p className="fine" style={{ padding: 14 }}>
                    No applications match that search.
                  </p>
                ) : (
                  filtered.map((application) => (
                    <button
                      key={application.id}
                      type="button"
                      className={selected?.id === application.id ? "admin-person active" : "admin-person"}
                      onClick={() => setSelectedId(application.id)}
                    >
                      <strong>{application.name}</strong>
                      <span>
                        {application.jobTitle}
                        {application.resume ? " · Resume" : " · No resume"}
                      </span>
                      <span>{when(application.submittedAt)}</span>
                    </button>
                  ))
                )}
              </div>
            </aside>
            {selected ? (
              <article className="admin-detail">
                <h2>{selected.name}</h2>
                <p className="app-meta">{selected.jobTitle}</p>
                <dl className="admin-fields">
                  <div>
                    <dt>Email</dt>
                    <dd>
                      <a href={`mailto:${selected.email}`}>{selected.email}</a>
                    </dd>
                  </div>
                  <div>
                    <dt>Phone</dt>
                    <dd>{selected.phone || "—"}</dd>
                  </div>
                  <div>
                    <dt>City</dt>
                    <dd>{selected.city || "—"}</dd>
                  </div>
                  <div>
                    <dt>Work authorization</dt>
                    <dd>{selected.workAuth || "—"}</dd>
                  </div>
                  <div>
                    <dt>Submitted</dt>
                    <dd>{when(selected.submittedAt)}</dd>
                  </div>
                  <div>
                    <dt>Reference</dt>
                    <dd>{selected.id}</dd>
                  </div>
                  <div>
                    <dt>LinkedIn</dt>
                    <dd>
                      {selected.linkedin ? (
                        <a href={selected.linkedin} target="_blank" rel="noreferrer">
                          {selected.linkedin}
                        </a>
                      ) : (
                        "—"
                      )}
                    </dd>
                  </div>
                  <div>
                    <dt>Resume</dt>
                    <dd>
                      {selected.resume
                        ? `${selected.resume.originalName} · ${fileSize(selected.resume.size)}`
                        : "Not attached"}
                    </dd>
                  </div>
                </dl>
                <h3>Note</h3>
                <p className="app-note">{selected.note}</p>
                <h3>Resume</h3>
                {selected.resume ? (
                  <>
                    <div className="admin-actions">
                      <a className="btn btn-ghost" href={resumeHref} target="_blank" rel="noreferrer">
                        Open resume
                      </a>
                      <a className="btn btn-primary" href={`${resumeHref}?download=1`}>
                        Download resume
                      </a>
                    </div>
                    {isPdf(selected.resume.originalName) ? (
                      <iframe className="resume-frame" title={`Resume for ${selected.name}`} src={resumeHref} />
                    ) : (
                      <p className="resume-missing">
                        This Word file can be downloaded. A preview is available for PDF resumes.
                      </p>
                    )}
                  </>
                ) : (
                  <p className="resume-missing">This application has no resume.</p>
                )}
              </article>
            ) : null}
          </div>
        )}
      </div>
    </section>
  );
}
