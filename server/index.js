import express from "express";
import cors from "cors";
import crypto from "crypto";
import multer from "multer";
import path from "path";
import { dbFile, departments, getJob, getResume, insertApplication, listApplications, listJobs, locations } from "./db.js";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const ok = /\.(pdf|doc|docx)$/i.test(file.originalname);
    if (!ok) {
      cb(new Error("Resume must be a PDF or Word document."));
      return;
    }
    cb(null, true);
  },
});

function clean(value, max) {
  return String(value || "").trim().slice(0, max);
}

const app = express();
app.use(cors());
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

function safeEqual(left, right) {
  const a = Buffer.from(String(left));
  const b = Buffer.from(String(right));
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

function adminSession(req) {
  const header = req.headers.cookie || "";
  const pair = header.split(";").map((part) => part.trim()).find((part) => part.startsWith("admin_session="));
  if (!pair) return null;
  const token = decodeURIComponent(pair.slice("admin_session=".length));
  const dot = token.lastIndexOf(".");
  if (dot <= 0) return null;
  const payload = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  const secret = process.env.ADMIN_SECRET || "alteryx-admin-session";
  const expected = crypto.createHmac("sha256", secret).update(payload).digest("base64url");
  if (!safeEqual(sig, expected)) return null;
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    const username = process.env.ADMIN_USER || "admin";
    if (!data?.u || data.u !== username || !data.exp || data.exp < Date.now()) return null;
    return data.u;
  } catch {
    return null;
  }
}

app.get("/api/admin/applications/:id/resume", (req, res) => {
  if (!adminSession(req)) {
    res.status(401).json({ error: "Sign in." });
    return;
  }
  const resume = getResume(req.params.id);
  if (!resume) {
    res.status(404).json({ error: "Resume not found." });
    return;
  }
  const name = String(resume.name || "resume").replace(/[\r\n"]/g, "");
  const types = {
    ".pdf": "application/pdf",
    ".doc": "application/msword",
    ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  };
  const ext = path.extname(name).toLowerCase();
  const download = req.query.download === "1";
  res.setHeader("Content-Type", types[ext] || "application/octet-stream");
  res.setHeader("Content-Disposition", `${download ? "attachment" : "inline"}; filename="${name}"`);
  res.send(resume.bytes);
});

app.get("/api/admin/applications", (req, res) => {
  if (!adminSession(req)) {
    res.status(401).json({ error: "Sign in." });
    return;
  }
  res.json({ applications: listApplications() });
});

app.get("/api/jobs", (req, res) => {
  const jobs = listJobs({
    q: req.query.q,
    department: req.query.department,
    location: req.query.location,
  });
  res.json({ jobs, departments: departments(), locations: locations() });
});

app.get("/api/jobs/:slug", (req, res) => {
  const job = getJob(req.params.slug);
  if (!job) {
    res.status(404).json({ error: "Role not found." });
    return;
  }
  res.json({ job });
});

app.post("/api/applications", (req, res) => {
  upload.single("resume")(req, res, (err) => {
    if (err) {
      const message = err.code === "LIMIT_FILE_SIZE" ? "Resume must be 5 MB or smaller." : err.message;
      res.status(400).json({ error: message });
      return;
    }

    const job = getJob(clean(req.body.jobId, 80));
    const name = clean(req.body.name, 80);
    const email = clean(req.body.email, 120);
    const phone = clean(req.body.phone, 40);
    const city = clean(req.body.city, 80);
    const linkedin = clean(req.body.linkedin, 200);
    const workAuth = clean(req.body.workAuth, 80);
    const note = clean(req.body.note, 2000);

    const fail = (status, error) => {
      res.status(status).json({ error });
    };

    if (!job) return fail(400, "Choose a role before applying.");
    if (job.status === "closed") return fail(400, "This role is closed.");
    if (name.length < 2) return fail(400, "Enter your full name.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return fail(400, "Enter a valid email address.");
    if (linkedin && !/^https?:\/\/.+/i.test(linkedin)) {
      return fail(400, "LinkedIn should be a full URL, starting with https://.");
    }
    if (note.length < 20) return fail(400, "Tell us a little more — at least a sentence or two.");

    const id = `ax-${Date.now().toString(36)}`;
    const saved = insertApplication({
      id,
      jobId: job.id,
      jobTitle: job.title,
      department: job.department,
      name,
      email,
      phone,
      city,
      linkedin,
      workAuth,
      note,
      resumeName: req.file?.originalname || null,
      resumeSize: req.file?.size || null,
      resumeBytes: req.file?.buffer || null,
      submittedAt: new Date().toISOString(),
    });
    if (saved.conflict) return fail(409, "You already applied for this role.");

    res.status(201).json({
      application: {
        id,
        jobTitle: job.title,
        submittedAt: saved.submittedAt,
      },
    });
  });
});

const port = Number(process.env.API_PORT) || 4000;
app.listen(port, "127.0.0.1", () => {
  console.log(`Alteryx api listening on http://127.0.0.1:${port}`);
  console.log(`SQLite database ${dbFile}`);
});
