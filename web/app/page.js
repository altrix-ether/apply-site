import Link from "next/link";
import StackArt from "../components/StackArt";
import JobCard from "../components/JobCard";
import { getCatalog } from "../lib/api";

export const dynamic = "force-dynamic";

const highlights = [
  {
    title: "Answers you can walk through",
    body: "Every workflow keeps the steps visible, so a teammate can see how a number was reached before anyone acts on it.",
  },
  {
    title: "The same result, next quarter",
    body: "Rules live in one place. Ask the question again in six months and you get the same path, not a fresh guess.",
  },
  {
    title: "Built with the people who use it",
    body: "Analysts, operators, and engineers ship together. The person closest to the work can change the logic.",
  },
];

export default async function HomePage() {
  let catalog = { jobs: [], departments: [] };
  let offline = false;
  try {
    catalog = await getCatalog();
  } catch {
    offline = true;
  }

  const featured = catalog.jobs.slice(0, 5);

  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <h1>
              Make every answer one you can <span className="grad">defend.</span>
            </h1>
            <p className="lede">
              Alteryx is the workflow layer enterprises use when a number has to be explainable.
              The open role develops the arbitrage bot on the ongoing crypto trading project. Alteryx strategy roles are listed and closed.
            </p>
            <div className="actions">
              <Link className="btn btn-primary" href="/jobs">
                See open roles
              </Link>
              <Link className="btn btn-ghost" href="#hiring">
                How we hire
              </Link>
            </div>
          </div>
          <StackArt />
        </div>
      </section>

      <section className="band">
        <div className="wrap cards-3">
          {highlights.map((item) => (
            <article key={item.title} className="soft-card">
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="black-band">
        <Link className="btn btn-primary" href="/jobs">
          Browse open roles
        </Link>
        <h2>Provable work starts with a team that owns the logic.</h2>
      </section>

      <section className="section" id="hiring">
        <div className="wrap">
          <div className="split">
            <article className="soft-card">
              <div className="eyebrow">How we hire</div>
              <h3>Four steps, then a decision.</h3>
              <p>
                No puzzle rounds. You will meet the team, walk through work you have already done, and try a
                short slice of the real job. We reply within ten days of the last conversation.
              </p>
              <Link className="text-link" href="/jobs">
                Start with an open role
              </Link>
            </article>
            <article className="dark-card">
              <div className="eyebrow">What you get</div>
              <h3>The brief before the interview.</h3>
              <p>
                The customer, the metric, and the team you would join are shared up front. You should know
                what the role is for before you spend an afternoon with us.
              </p>
              <Link className="text-link" href="#life">
                Life on the team
              </Link>
            </article>
          </div>
          <div className="steps">
            <article className="step">
              <span>01</span>
              <h3>Apply</h3>
              <p>A short form and a resume. A note about a problem you made clearer helps most.</p>
            </article>
            <article className="step">
              <span>02</span>
              <h3>Conversation</h3>
              <p>A recruiter call about the team, the location, and what you want next.</p>
            </article>
            <article className="step">
              <span>03</span>
              <h3>Work sample</h3>
              <p>A practical exercise with the people you would work beside. Timed to fit in a day.</p>
            </article>
            <article className="step">
              <span>04</span>
              <h3>Decision</h3>
              <p>A yes, a no, or a clear reason we need another conversation. Within ten days.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section" id="roles" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="section-head">
            <div>
              <h2>Roles</h2>
              <p className="sub">The open role is the crypto arbitrage bot. Closed Alteryx strategy roles stay on the list.</p>
            </div>
            <Link className="btn btn-ghost" href="/jobs">
              View all roles
            </Link>
          </div>
          {offline ? (
            <div className="empty">The roles service is not running. Start the API and refresh.</div>
          ) : (
            <div className="job-list">
              {featured.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="section" id="teams" style={{ paddingTop: 10 }}>
        <div className="wrap">
          <div className="section-head">
            <div>
              <h2>Teams</h2>
              <p className="sub">Strategy, analytics, product, and the one team with an open role.</p>
            </div>
          </div>
          <div className="team-grid">
            {catalog.departments.map((team) => (
              <Link
                key={team.name}
                className="team-card"
                href={`/jobs?department=${encodeURIComponent(team.name)}`}
              >
                <span className={`pill pill-${team.tone}`}>{team.open ? `${team.open} open` : "Closed"}</span>
                <h3>{team.name}</h3>
                <p>See {team.name.toLowerCase()} roles</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="life" style={{ paddingTop: 10 }}>
        <div className="wrap life">
          <div>
            <h2>Life here</h2>
            <p className="lede">
              The open role develops the crypto arbitrage bot and can sit in Austin or remote. Closed strategy roles span Irvine, Austin, London,
              and remote. Health coverage starts on day one. There is a yearly learning stipend, and the
              calendar leaves room to do the careful version of the work.
            </p>
          </div>
          <div className="stats">
            <div className="stat">
              <span className="stat-num">{catalog.jobs.filter((job) => job.status !== "closed").length || "—"}</span>
              <p>open roles right now</p>
            </div>
            <div className="stat">
              <span className="stat-num">{catalog.departments.length || "—"}</span>
              <p>teams</p>
            </div>
            <div className="stat">
              <span className="stat-num">10</span>
              <p>days to a decision</p>
            </div>
            <div className="stat">
              <span className="stat-num">
                {new Set(catalog.jobs.flatMap((job) => job.places).filter((place) => place !== "Remote")).size || "—"}
              </span>
              <p>cities, plus remote</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
