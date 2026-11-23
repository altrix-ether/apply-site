import JobsBrowser from "../../components/JobsBrowser";
import { getCatalog } from "../../lib/api";

export const dynamic = "force-dynamic";

export const metadata = { title: "Open roles" };

export default async function JobsPage({ searchParams }) {
  const params = await searchParams;
  let catalog = { jobs: [], departments: [], locations: [] };
  let offline = false;
  try {
    catalog = await getCatalog();
  } catch {
    offline = true;
  }

  if (offline) {
    return (
      <section className="page-hero">
        <div className="wrap">
          <h1>Open roles</h1>
          <div className="empty" style={{ marginTop: 18 }}>
            The roles service is not running. Start the API and refresh.
          </div>
        </div>
      </section>
    );
  }

  return (
    <JobsBrowser
      jobs={catalog.jobs}
      departments={catalog.departments}
      locations={catalog.locations}
      initial={{
        q: typeof params.q === "string" ? params.q : "",
        department: typeof params.department === "string" ? params.department : "All",
        location: typeof params.location === "string" ? params.location : "All",
      }}
    />
  );
}
