import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./homepage.css";

export default function HomePage() {
  const navigate = useNavigate();

  const [status, setStatus] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [resumeKey, setResumeKey] = useState(null); // keep internal only

  const fileInputRef = useRef(null);

  async function uploadPdf(file) {
    if (!file) return;

    const isPdf =
      file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");

    if (!isPdf) {
      setStatus("Please upload a PDF file.");
      return;
    }

    try {
      setStatus("Requesting upload URL...");

      // Get presigned URL from backend
      const presignRes = await fetch("http://localhost:5050/resumes/presign", {
        method: "POST",
      });

      if (!presignRes.ok) throw new Error("Presign request failed");

      const { uploadUrl, s3Key } = await presignRes.json();

      // Upload directly to S3
      setStatus("Uploading resume...");
      const putRes = await fetch(uploadUrl, {
        method: "PUT",
        headers: { "Content-Type": "application/pdf" },
        body: file,
      });

      if (!putRes.ok) throw new Error("S3 upload failed");

      // Store key internally, do NOT show it in UI
      setResumeKey(s3Key);
      setStatus("Upload Complete");
    } catch (err) {
      console.error(err);
      setStatus("Upload failed — check console for details");
    }
  }

  function onChooseFileClick() {
    fileInputRef.current?.click();
  }

  function onFilePicked(e) {
    const file = e.target.files?.[0];
    uploadPdf(file);
    e.target.value = ""; // allow re-uploading same file
  }

  // Drag & drop handlers (prevent browser from opening the PDF)
  function onDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  function onDragEnter(e) {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }

  function onDragLeave(e) {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }

  function onDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    uploadPdf(file);
  }

  function onMatchJobs() {
    if (!resumeKey) return;

    // Pass resumeKey privately via router state (not visible in URL)
    navigate("/jobs", { state: { resumeKey } });
  }

  return (
    <main className="row">
      {/* Left: Site Description */}
      <section className="placeholder-card">
        <h1 className="hero-title">Find jobs that match your resume</h1>
        <p className="placeholder-text">
          Upload your resume to get instant job matches, or generate a résumé from
          your skills and experience.
        </p>
        <ul className="benefits">
          <li>ATS-friendly parsing</li>
          <li>Explainable match scores</li>
          <li>Save & track applications</li>
        </ul>
      </section>

      {/* Right: CTA panel */}
      <section className="cta-card" aria-labelledby="cta-title">
        <h2 id="cta-title">Get matched in minutes</h2>

        {/* Upload */}
        <div className="uploader">
          <div
            className="drop"
            aria-label="Upload resume"
            onDragOver={onDragOver}
            onDragEnter={onDragEnter}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            style={{
              outline: isDragging ? "2px dashed #fff" : "none",
              outlineOffset: "4px",
            }}
          >
            <p>
              Drop PDF here or{" "}
              <button className="link-btn" type="button" onClick={onChooseFileClick}>
                choose file
              </button>
            </p>

            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="application/pdf"
              onChange={onFilePicked}
              style={{ display: "none" }}
            />
          </div>
        </div>

        {status && (
          <div style={{ textAlign: "center", marginTop: "10px" }}>
            <p className="fine">{status}</p>
          </div>
        )}


        {/* Show Match Jobs only after upload */}
        {resumeKey && (
          <button className="btn primary match" type="button" onClick={onMatchJobs}>
            Match Jobs
          </button>
        )}

        <div className="or">or</div>

        {/* Generate resume button */}
        <div className="generate">
          <button className="btn primary" type="button">
            Generate resume
          </button>
          <p className="fine">
            Prefer to type your skills? We’ll build the resume and match jobs.
          </p>
        </div>
      </section>
    </main>
  );
}
