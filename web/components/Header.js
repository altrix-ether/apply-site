"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="site-header">
      <div className="announce">
        <span>Open role: develop the crypto arbitrage bot.</span>
        <Link href="/jobs">See roles</Link>
      </div>
      <div className="nav-bar">
        <div className="wrap nav-inner">
          <Link href="/" className="logo" aria-label="Alteryx home" onClick={close}>
            <img src="/alteryx-logo.svg" alt="Alteryx" width="102" height="36" />
          </Link>
          <nav className={open ? "nav-links open" : "nav-links"}>
            <Link href="/jobs" onClick={close}>Roles</Link>
            <Link href="/#teams" onClick={close}>Teams</Link>
            <Link href="/#hiring" onClick={close}>How we hire</Link>
            <Link href="/#life" onClick={close}>Life here</Link>
          </nav>
          <div className="nav-cta">
            <Link href="/#hiring" className="btn btn-ghost">How we hire</Link>
            <Link href="/jobs" className="btn btn-primary">See open roles</Link>
          </div>
          <button
            className="menu-btn"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}
