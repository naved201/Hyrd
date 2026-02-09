import express from "express";
import cors from "cors";
import "dotenv/config";
import { v4 as uuid } from "uuid";
import { createPresignedUploadUrl } from "./s3.js"; // adjust if your path differs

const app = express();
app.use(cors());
app.use(express.json());

let latestResumeKey = null;

// health check
app.get("/health", (req, res) => res.json({ ok: true }));

// 1) Create presigned URL for direct S3 upload
app.post("/resumes/presign", async (req, res) => {
  try {
    const key = `resumes/${uuid()}.pdf`;
    const uploadUrl = await createPresignedUploadUrl(key);
    res.json({ uploadUrl, s3Key: key });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate upload URL" });
  }
});

// 2) Confirm upload (frontend tells backend which key was uploaded)
app.post("/resumes/confirm", (req, res) => {
  const { s3Key } = req.body;
  if (!s3Key) return res.status(400).json({ error: "Missing s3Key" });

  latestResumeKey = s3Key;
  res.json({ ok: true, savedKey: latestResumeKey });
});

// 3) Trigger matching (stub for now)
app.post("/match", (req, res) => {
  if (!latestResumeKey) {
    return res.status(400).json({ error: "No resume uploaded yet" });
  }

  // later: parse resume -> compute scores -> store results
  return res.json({ ok: true, resumeKey: latestResumeKey });
});

// 4) Return matched jobs (stub for now)
app.get("/jobs", (req, res) => {
  if (!latestResumeKey) return res.json([]);

  return res.json([
    {
      id: 1,
      title: "Software Developer Intern",
      company: "ExampleCo",
      location: "Edmonton",
      score: 92,
    },
    {
      id: 2,
      title: "Backend Developer",
      company: "NorthStack",
      location: "Remote",
      score: 86,
    },
    {
      id: 3,
      title: "Frontend Developer",
      company: "UIWorks",
      location: "Calgary",
      score: 81,
    },
  ]);
});

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
