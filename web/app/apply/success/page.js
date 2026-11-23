import Link from "next/link";

export const metadata = { title: "Application received" };

export default async function SuccessPage({ searchParams }) {
  const params = await searchParams;
  const ref = typeof params.ref === "string" ? params.ref : "";
  const role = typeof params.role === "string" ? params.role : "this role";

  return (
    <section className="success">
      <div className="success-card">
        <div className="eyebrow">Application received</div>
        <h1>Thanks for applying.</h1>
        <p>
          We have your application for <strong>{role}</strong>. A recruiter writes back within ten days if
          there is a fit.
        </p>
        <div className="confirm-row">
          {ref ? <div className="ref">{ref}</div> : null}
          <Link className="btn btn-primary" href="/jobs">
            See other roles
          </Link>
        </div>
      </div>
    </section>
  );
}
