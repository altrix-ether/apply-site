import fs from "fs";
import path from "path";
import { DatabaseSync } from "node:sqlite";
import { fileURLToPath } from "url";
import { jobs as catalog, queryDepartments, queryJob, queryJobs, queryLocations } from "./jobs.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, "data");
const uploadDir = path.join(__dirname, "uploads");
const legacyJson = path.join(dataDir, "applications.json");
export const dbFile = path.join(dataDir, "careers.sqlite");

fs.mkdirSync(dataDir, { recursive: true });

const db = new DatabaseSync(dbFile);
db.exec(`
  PRAGMA journal_mode = WAL;
  CREATE TABLE IF NOT EXISTS jobs (
    id TEXT PRIMARY KEY,
    slug TEXT NOT NULL UNIQUE,
    status TEXT NOT NULL,
    department TEXT NOT NULL,
    document TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS applications (
    id TEXT PRIMARY KEY,
    job_id TEXT NOT NULL,
    job_title TEXT NOT NULL,
    department TEXT NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL DEFAULT '',
    city TEXT NOT NULL DEFAULT '',
    linkedin TEXT NOT NULL DEFAULT '',
    work_auth TEXT NOT NULL DEFAULT '',
    note TEXT NOT NULL DEFAULT '',
    resume_name TEXT,
    resume_size INTEGER,
    resume_bytes BLOB,
    submitted_at TEXT NOT NULL
  );
  CREATE UNIQUE INDEX IF NOT EXISTS applications_job_email
    ON applications (job_id, email COLLATE NOCASE);
`);

function syncJobs() {
  const insert = db.prepare(
    "INSERT INTO jobs (id, slug, status, department, document) VALUES (?, ?, ?, ?, ?)",
  );
  db.exec("BEGIN IMMEDIATE");
  try {
    db.exec("DELETE FROM jobs");
    for (const job of catalog) {
      insert.run(job.id, job.slug, job.status || "closed", job.department, JSON.stringify(job));
    }
    db.exec("COMMIT");
  } catch (error) {
    db.exec("ROLLBACK");
    throw error;
  }
}

function legacyResume(storedName) {
  if (!storedName) return null;
  const file = path.resolve(uploadDir, path.basename(storedName));
  const relative = path.relative(uploadDir, file);
  if (relative.startsWith("..") || path.isAbsolute(relative) || !fs.existsSync(file)) return null;
  return fs.readFileSync(file);
}

function migrateApplications() {
  const count = db.prepare("SELECT COUNT(*) AS n FROM applications").get().n;
  if (count > 0 || !fs.existsSync(legacyJson)) return;
  let apps = [];
  try {
    const parsed = JSON.parse(fs.readFileSync(legacyJson, "utf8"));
    apps = Array.isArray(parsed) ? parsed : [];
  } catch {
    return;
  }
  const insert = db.prepare(`
    INSERT INTO applications (
      id, job_id, job_title, department, name, email, phone, city, linkedin, work_auth, note,
      resume_name, resume_size, resume_bytes, submitted_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  db.exec("BEGIN IMMEDIATE");
  try {
    for (const item of apps) {
      const bytes = legacyResume(item.resume?.storedName);
      insert.run(
        item.id,
        item.jobId,
        item.jobTitle,
        item.department,
        item.name,
        item.email,
        item.phone || "",
        item.city || "",
        item.linkedin || "",
        item.workAuth || "",
        item.note || "",
        item.resume?.originalName || null,
        bytes ? bytes.length : item.resume?.size || null,
        bytes,
        item.submittedAt,
      );
    }
    db.exec("COMMIT");
  } catch (error) {
    db.exec("ROLLBACK");
    throw error;
  }
}

syncJobs();
migrateApplications();

function readJobs() {
  return db.prepare("SELECT document FROM jobs").all().map((row) => JSON.parse(row.document));
}

function publicJob(job) {
  if (!job || job.status !== "closed") return job;
  const hidden = ["summary", "projectName", "project", "about", "responsibilities", "stack", "team", "requirements", "bonus"];
  const visible = { ...job };
  for (const field of hidden) delete visible[field];
  return visible;
}

export function listJobs(options) {
  return queryJobs(readJobs(), options).map(publicJob);
}

export function getJob(slug) {
  return publicJob(queryJob(readJobs(), slug));
}

export function departments() {
  return queryDepartments(readJobs());
}

export function locations() {
  return queryLocations(readJobs());
}

function publicApplication(row) {
  return {
    id: row.id,
    jobId: row.job_id,
    jobTitle: row.job_title,
    department: row.department,
    name: row.name,
    email: row.email,
    phone: row.phone || "",
    city: row.city || "",
    linkedin: row.linkedin || "",
    workAuth: row.work_auth || "",
    note: row.note || "",
    submittedAt: row.submitted_at,
    resume: row.resume_name ? { originalName: row.resume_name, size: row.resume_size } : null,
  };
}

const applicationColumns = `
  id, job_id, job_title, department, name, email, phone, city, linkedin, work_auth, note,
  resume_name, resume_size, submitted_at
`;

export function listApplications() {
  return db
    .prepare(`SELECT ${applicationColumns} FROM applications ORDER BY submitted_at DESC`)
    .all()
    .map(publicApplication);
}

export function insertApplication(application) {
  const insert = db.prepare(`
    INSERT INTO applications (
      id, job_id, job_title, department, name, email, phone, city, linkedin, work_auth, note,
      resume_name, resume_size, resume_bytes, submitted_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  db.exec("BEGIN IMMEDIATE");
  try {
    const existing = db
      .prepare("SELECT id FROM applications WHERE job_id = ? AND lower(email) = lower(?)")
      .get(application.jobId, application.email);
    if (existing) {
      db.exec("ROLLBACK");
      return { conflict: true };
    }
    insert.run(
      application.id,
      application.jobId,
      application.jobTitle,
      application.department,
      application.name,
      application.email,
      application.phone,
      application.city,
      application.linkedin,
      application.workAuth,
      application.note,
      application.resumeName,
      application.resumeSize,
      application.resumeBytes,
      application.submittedAt,
    );
    db.exec("COMMIT");
    return { conflict: false, submittedAt: application.submittedAt };
  } catch (error) {
    try {
      db.exec("ROLLBACK");
    } catch {
      /* the transaction is already closed */
    }
    throw error;
  }
}

export function getResume(id) {
  const row = db.prepare("SELECT resume_name, resume_bytes FROM applications WHERE id = ?").get(id);
  if (!row?.resume_name || !row.resume_bytes) return null;
  return { name: row.resume_name, bytes: Buffer.from(row.resume_bytes) };
}
