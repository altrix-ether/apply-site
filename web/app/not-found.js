import Link from "next/link";

export default function NotFound() {
  return (
    <section className="success">
      <div className="success-card">
        <h1>That page is not here.</h1>
        <p>The role may have closed. The open list is the current one.</p>
        <Link className="btn btn-primary" href="/jobs">
          See open roles
        </Link>
      </div>
    </section>
  );
}
