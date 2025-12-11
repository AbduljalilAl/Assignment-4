import { useEffect, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const GH_KEY = "github-username";

const Github = () => {
  const [storedUser, setStoredUser] = useLocalStorage(GH_KEY, "octocat");
  const [username, setUsername] = useState(storedUser || "octocat");
  const [status, setStatus] = useState({ text: "Waiting to load repos...", type: "info" });
  const [repos, setRepos] = useState([]);

  const setStatusMsg = (text, type = "info") => setStatus({ text, type });

  const loadRepos = async (user) => {
    const trimmed = (user || "").trim();
    if (!trimmed) {
      setStatusMsg("Please enter a GitHub username.", "error");
      return;
    }

    setStatusMsg("Loading repositories...");
    setRepos([]);

    try {
      const res = await fetch(
        `https://api.github.com/users/${encodeURIComponent(trimmed)}/repos?sort=updated&per_page=5`,
        { headers: { Accept: "application/vnd.github+json" } }
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (!Array.isArray(data) || data.length === 0) {
        setStatusMsg("No repositories found for that user.", "error");
        return;
      }
      setStatusMsg("Showing most recently updated repositories.");
      setRepos(data.slice(0, 5));
    } catch (err) {
      setStatusMsg("Could not load GitHub data. Please try again later.", "error");
    }
  };

  useEffect(() => {
    if (storedUser) {
      setUsername(storedUser);
      loadRepos(storedUser);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setStoredUser(username);
    loadRepos(username);
  };

  return (
    <section id="github" className="section">
      <h2>Latest GitHub Repositories</h2>
      <p className="section-lead">Live data from the GitHub API with loading and error handling.</p>
      <form id="github-form" className="github-form" onSubmit={handleSubmit}>
        <label htmlFor="github-username">GitHub username</label>
        <div className="remember-row">
          <input
            type="text"
            id="github-username"
            name="github-username"
            placeholder="octocat"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <button type="submit" id="github-load">
            Load repos
          </button>
        </div>
        <p className="small-muted">Saved locally so you do not have to retype it.</p>
      </form>
      <div id="github-status" className={`card status-${status.type}`} aria-live="polite">
        {status.text}
      </div>
      <ul id="github-repos" className="github-list">
        {repos.map((repo) => (
          <li key={repo.id} className="github-item">
            <h3>
              <a href={repo.html_url} target="_blank" rel="noreferrer">
                {repo.name}
              </a>
            </h3>
            <p>{repo.description || "No description provided."}</p>
            <div className="github-meta">
              <span>Language: {repo.language || "n/a"}</span>
              <span>Updated: {repo.updated_at ? new Date(repo.updated_at).toLocaleDateString() : "n/a"}</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Github;
