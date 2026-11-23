const columns = [
  {
    title: "About Alteryx",
    links: [
      ["Platform", "https://www.alteryx.com/platform"],
      ["Pricing", "https://www.alteryx.com/platform/pricing"],
      ["Free Trial", "https://www.alteryx.com/trial"],
      ["Why Alteryx", "https://www.alteryx.com/why-alteryx"],
      ["Customer Stories", "https://www.alteryx.com/customer-center"],
    ],
  },
  {
    title: "Resources",
    links: [
      ["Resource Library", "https://www.alteryx.com/resources"],
      ["Events", "https://www.alteryx.com/events"],
      ["Alteryx Marketplace", "https://marketplace.alteryx.com/en-US/home"],
      ["Blog", "https://www.alteryx.com/blog"],
      ["Glossary", "https://www.alteryx.com/glossary"],
    ],
  },
  {
    title: "Support",
    links: [
      ["Platform Support", "https://my.alteryx.com"],
      ["Upgrade Center", "https://licenses.alteryx.com"],
      ["Help & Documentation", "https://help.alteryx.com"],
      ["Professional Services", "https://www.alteryx.com/resources/professional-services"],
    ],
  },
  {
    title: "Community",
    links: [
      ["Community", "https://community.alteryx.com/"],
      ["Academy", "https://academy.alteryx.com/"],
      ["Certification", "https://www.alteryx.com/sparked"],
      ["Community Programs", "https://www.alteryx.com/community-programs"],
      ["SWAG Store", "https://alteryxswag.com/"],
    ],
  },
  {
    title: "Company",
    links: [
      ["About Us", "https://www.alteryx.com/about-us"],
      ["Careers", "/jobs"],
      ["Contact Us", "https://www.alteryx.com/contact-us"],
      ["Find a Partner", "https://www.alteryx.com/partners"],
      ["Become a Partner", "https://www.alteryx.com/partners/become-a-partner"],
    ],
  },
];

const legal = [
  ["Terms and Conditions", "https://www.alteryx.com/terms-and-conditions"],
  ["Trust", "https://www.alteryx.com/trust"],
  ["Accessibility", "https://www.alteryx.com/accessibility"],
  ["Privacy Policy", "https://www.alteryx.com/privacy-policy"],
  ["Legal", "https://www.alteryx.com/legal"],
  ["Cookie Notice", "https://www.alteryx.com/cookie-notice"],
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-top">
        <div className="footer-brand">
          <a href="https://www.alteryx.com/" aria-label="Alteryx">
            <img className="footer-logo" src="/alteryx-footer-logo.svg" alt="Alteryx" width="196" height="58" />
          </a>
          <p>
            Alteryx is the agentic analytics and automation company that helps organizations turn complex data
            into trusted insights, decisions, and action with AI-ready datasets, governed business logic, and
            visual workflows.
          </p>
        </div>
        <div className="footer-columns">
          {columns.map((column) => (
            <div key={column.title}>
              <h3>{column.title}</h3>
              {column.links.map(([label, href]) =>
                href.startsWith("/") ? (
                  <a key={label} href={href}>
                    {label}
                  </a>
                ) : (
                  <a key={label} href={href} target="_blank" rel="noreferrer">
                    {label}
                  </a>
                )
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="wrap legal">
        <span>© Alteryx</span>
        <nav>
          {legal.map(([label, href]) => (
            <a key={label} href={href} target="_blank" rel="noreferrer">
              {label}
            </a>
          ))}
          <a href="/admin">Admin</a>
        </nav>
      </div>
    </footer>
  );
}
