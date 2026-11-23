"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import JobCard from "./JobCard";

export default function JobsBrowser({ jobs, departments, locations, initial }) {
  const router = useRouter();
  const [q, setQ] = useState(initial.q || "");
  const [department, setDepartment] = useState(initial.department || "All");
  const [location, setLocation] = useState(initial.location || "All");

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return jobs.filter((job) => {
      if (department !== "All" && job.department !== department) return false;
      if (location !== "All" && !job.places.includes(location)) return false;
      if (!query) return true;
      return `${job.title} ${job.department} ${job.location} ${job.summary}`.toLowerCase().includes(query);
    });
  }, [jobs, q, department, location]);

  function sync(next) {
    const params = new URLSearchParams();
    const query = next.q ?? q;
    const dept = next.department ?? department;
    const loc = next.location ?? location;
    if (query.trim()) params.set("q", query.trim());
    if (dept !== "All") params.set("department", dept);
    if (loc !== "All") params.set("location", loc);
    const search = params.toString();
    router.replace(search ? `/jobs?${search}` : "/jobs", { scroll: false });
  }

  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <h1>Open roles</h1>
          <p className="sub">The open role is the crypto arbitrage bot. Closed Alteryx strategy roles stay on the list.</p>
          <div className="filters">
            <input
              className="field"
              placeholder="Search roles"
              value={q}
              aria-label="Search roles"
              onChange={(event) => setQ(event.target.value)}
            />
            <select
              className="select"
              aria-label="Department"
              value={department}
              onChange={(event) => {
                setDepartment(event.target.value);
                sync({ department: event.target.value });
              }}
            >
              <option>All</option>
              {departments.map((item) => (
                <option key={item.name}>{item.name}</option>
              ))}
            </select>
            <select
              className="select"
              aria-label="Location"
              value={location}
              onChange={(event) => {
                setLocation(event.target.value);
                sync({ location: event.target.value });
              }}
            >
              <option>All</option>
              {locations.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
            <button
              className="btn btn-ghost"
              type="button"
              onClick={() => {
                setQ("");
                setDepartment("All");
                setLocation("All");
                router.replace("/jobs", { scroll: false });
              }}
            >
              Clear
            </button>
          </div>
        </div>
      </section>
      <section className="results">
        <div className="wrap">
          <p className="count">
            {filtered.filter((job) => job.status !== "closed").length} open ·{" "}
            {filtered.filter((job) => job.status === "closed").length} closed
          </p>
          {filtered.length === 0 ? (
            <div className="empty">
              <h2>No roles match that search.</h2>
              <p>Try another team or clear the filters.</p>
            </div>
          ) : (
            <div className="job-list">
              {filtered.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
