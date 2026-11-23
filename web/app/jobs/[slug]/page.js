import Link from "next/link";
import { notFound } from "next/navigation";
import ApplyForm from "../../../components/ApplyForm";
import { getJob } from "../../../lib/api";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  try {
    const job = await getJob(slug);
    return { title: job ? job.title : "Role" };
  } catch {
    return { title: "Role" };
  }
}

function List({ title, items }) {
  if (!items?.length) return null;
  return (
    <>
      <h2>{title}</h2>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </>
  );
}

function Paragraphs({ text }) {
  const parts = (Array.isArray(text) ? text : [text]).filter(Boolean);
  return parts.map((part) => <p key={part}>{part}</p>);
}

export default async function JobPage({ params }) {
  const { slug } = await params;
  let job = null;
  try {
    job = await getJob(slug);
  } catch {
    return (
      <section className="detail">
        <div className="wrap empty">The roles service is not running. Start the API and refresh.</div>
      </section>
    );
  }
  if (!job) notFound();

  if (job.status === "closed") {
    return (
      <section className="detail">
        <div className="wrap detail-grid">
          <article className="prose">
            <p className="crumbs">
              <Link href="/jobs">Roles</Link> / {job.department}
            </p>
            <span className="pill pill-ink">Closed</span>
            <h1>{job.title}</h1>
            <p className="job-meta">
              {job.department} · {job.location} · {job.type} · Not accepting applications
            </p>
            <p>This role is closed. The posting is no longer available.</p>
          </article>
          <aside className="apply-card">
            <h2>This role is closed</h2>
            <p className="hint">Senior Blockchain Developer, Crypto Arbitrage is still open.</p>
            <Link className="btn btn-primary" href="/jobs/senior-blockchain-developer">
              See the open role
            </Link>
          </aside>
        </div>
      </section>
    );
  }

  return (
    <section className="detail">
      <div className="wrap detail-grid">
        <article className="prose">
          <p className="crumbs">
            <Link href="/jobs">Roles</Link> / {job.department}
          </p>
          <span className={`pill pill-${job.tone}`}>Open</span>
          <h1>{job.title}</h1>
          <p className="job-meta">
            {job.department} · {job.location} · {job.type} · Accepting applications
          </p>
          <dl className="facts">
            {job.projectName ? (
              <div className="fact">
                <dt>Project</dt>
                <dd>{job.projectName}</dd>
              </div>
            ) : null}
            <div className="fact">
              <dt>Status</dt>
              <dd>Ongoing, open to join</dd>
            </div>
            <div className="fact">
              <dt>Team</dt>
              <dd>{job.department}</dd>
            </div>
            <div className="fact">
              <dt>Where</dt>
              <dd>{job.location}</dd>
            </div>
          </dl>
          {job.project ? (
            <>
              <h2>The project</h2>
              <Paragraphs text={job.project} />
            </>
          ) : null}
          <h2>The role</h2>
          <Paragraphs text={job.about} />
          <List title="What you will do" items={job.responsibilities} />
          <List title="The stack" items={job.stack} />
          {job.team ? (
            <>
              <h2>Who you work with</h2>
              <Paragraphs text={job.team} />
            </>
          ) : null}
          <List title="What you bring" items={job.requirements} />
          <List title="Nice to have" items={job.bonus} />
        </article>
        <ApplyForm job={job} />
      </div>
    </section>
  );
}
