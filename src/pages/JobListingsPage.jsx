import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./joblistings-page.css";

export default function JobListingsPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // resumeKey is private router state (not in URL)
  const resumeKey = location.state?.resumeKey || null;

  const [jobs, setJobs] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If user refreshes /jobs directly, router state is lost.
    // For now, sending them back home.
    if (!resumeKey) {
      navigate("/", { replace: true });
      return;
    }

    async function loadJobs() {
      try {
        setLoading(true);

        const res = await fetch("http://localhost:5050/jobs");
        const data = await res.json();

        setJobs(data);
        setSelectedId(data?.[0]?.id ?? null);
      } catch (e) {
        console.error(e);
        setJobs([]);
        setSelectedId(null);
      } finally {
        setLoading(false);
      }
    }

    loadJobs();
  }, [resumeKey, navigate]);

  const filteredJobs = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return jobs;

    return jobs.filter((j) => {
      const hay = `${j.title} ${j.company} ${j.location}`.toLowerCase();
      return hay.includes(q);
    });
  }, [jobs, query]);

  const selectedJob = useMemo(
    () => jobs.find((j) => j.id === selectedId) || null,
    [jobs, selectedId]
  );

  return (
    <div className="jobs-wrap">
      <div className="job-card">
        <div className="job-top">
          <div className="job-title">Matched Jobs</div>

          <input
            className="search-bar"
            type="search"
            placeholder="Search Jobs"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="job-body">
          <div className="job-list">
            {loading && <div className="empty">Loading jobs…</div>}

            {!loading && filteredJobs.length === 0 && (
              <div className="empty">No matches found.</div>
            )}

            {!loading &&
              filteredJobs.map((job) => (
                <button
                  key={job.id}
                  className={`job-item ${job.id === selectedId ? "active" : ""}`}
                  onClick={() => setSelectedId(job.id)}
                >
                  <div className="job-item-title">{job.title}</div>
                  <div className="job-item-sub">
                    {job.company} • {job.location}
                  </div>
                  <div className="job-item-score">Match: {job.score}%</div>
                </button>
              ))}
          </div>

          <div className="job-detail">
            {!selectedJob ? (
              <div className="detail-empty">Select a job to view details.</div>
            ) : (
              <>
                <h2 className="detail-title">{selectedJob.title}</h2>
                <p className="detail-sub">
                  {selectedJob.company} • {selectedJob.location} • Match{" "}
                  {selectedJob.score}%
                </p>

                <div className="detail-box">
                  <p>Description of the selected job listing will appear here.</p>
                </div>

                <p className="detail-hint">
                  (Resume uploaded successfully — internal reference hidden.)
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
