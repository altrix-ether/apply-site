import Link from "next/link";

export default function JobCard({ job }) {
  const closed = job.status === "closed";
  const body = (
    <>
      <div>
        <span className={closed ? "pill pill-ink" : `pill pill-${job.tone}`}>
          {closed ? "Closed" : "Open"}
        </span>
        <h3>{job.title}</h3>
        <p className="job-meta">
          {job.department} · {job.location} · {job.type}
        </p>
        {closed ? null : (
          <>
            {job.projectName ? <p className="job-project">{job.projectName}</p> : null}
            <p className="job-summary">{job.summary}</p>
          </>
        )}
      </div>
      <span className={closed ? "job-go closed" : "job-go"}>{closed ? "Closed" : "Apply"}</span>
    </>
  );
  if (closed) return <article className="job-card closed">{body}</article>;
  return (
    <Link href={`/jobs/${job.slug}`} className="job-card">
      {body}
    </Link>
  );
}
