import { useMemo, useState } from "react";

// Private admin view to fetch contact messages. Requires ADMIN_SECRET on the API.
const Admin = () => {
  const [secret, setSecret] = useState("");
  const [messages, setMessages] = useState([]);
  const [status, setStatus] = useState("With the correct secret you can see the messages.");
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    emailQuery: "",
    sort: "desc",
    range: "last_week",
    specificDate: "",
  });
  const [showSecret, setShowSecret] = useState(false);

  const handleFilterChange = (key) => (e) => {
    setFilters((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const filteredMessages = useMemo(() => {
    const emailQ = filters.emailQuery.toLowerCase().trim();
    const now = new Date();
    let startDate = null;

    if (filters.range === "today") {
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    } else if (filters.range === "last_week") {
      startDate = new Date(now);
      startDate.setDate(now.getDate() - 7);
    } else if (filters.range === "last_month") {
      startDate = new Date(now);
      startDate.setMonth(now.getMonth() - 1);
    } else if (filters.range === "specific" && filters.specificDate) {
      startDate = new Date(filters.specificDate);
    }

    let list = messages.filter((m) => {
      const matchEmail = !emailQ || (m.email || "").toLowerCase().includes(emailQ);
      const matchDate =
        !startDate ||
        (m.createdAt && new Date(m.createdAt).getTime() >= startDate.getTime());
      return matchEmail && matchDate;
    });

    list = list.sort((a, b) => {
      const aDate = new Date(a.createdAt).getTime();
      const bDate = new Date(b.createdAt).getTime();
      return filters.sort === "asc" ? aDate - bDate : bDate - aDate;
    });

    return list;
  }, [messages, filters]);

  const loadMessages = async () => {
    if (!secret.trim()) {
      setStatus("Enter your secret first.");
      return;
    }
    setLoading(true);
    setStatus("Loading messages...");
    setMessages([]);
    try {
      const res = await fetch("/api/admin/messages", {
        headers: { "x-admin-secret": secret.trim() },
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus(data?.error || "Unauthorized. Check the secret.");
        return;
      }
      setStatus(`Fetched ${data.count} messages.`);
      setMessages(data.messages || []);
      setFilters((prev) => ({ ...prev, range: "last_week" }));
    } catch (err) {
      setStatus("Could not reach the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="admin" className="section">
      <h2>Admin (Private)</h2>
      <div className="card">
        <p className="small-muted">With the correct secret you can see the messages.</p>
        <form
          className="input-group"
          style={{ marginTop: "0.5rem" }}
          onSubmit={(e) => {
            e.preventDefault();
            loadMessages();
          }}
        >
          <input
            type={showSecret ? "text" : "password"}
            placeholder="Enter admin secret"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
          />
          <button
            type="button"
            className="input-addon btn-ghost"
            aria-label={showSecret ? "Hide secret" : "Show secret"}
            onClick={() => setShowSecret((v) => !v)}
          >
            {showSecret ? "🙈" : "👁"}
          </button>
          <button type="submit" className="input-addon btn-primary" disabled={loading}>
            {loading ? "Loading..." : "Load messages"}
          </button>
        </form>
        <p className="small-muted" style={{ marginTop: "0.5rem" }} aria-live="polite">
          {status}
        </p>
      </div>

      {messages.length > 0 && (
        <div className="card" style={{ marginTop: "1rem" }}>
          <form
            className="admin-filters"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <input
              type="search"
              placeholder="Search by email"
              value={filters.emailQuery}
              onChange={handleFilterChange("emailQuery")}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                }
              }}
              className="chip-input"
            />
            <select value={filters.sort} onChange={handleFilterChange("sort")} className="chip-input">
              <option value="desc">Date: newest first</option>
              <option value="asc">Date: oldest first</option>
            </select>
            <select value={filters.range} onChange={handleFilterChange("range")} className="chip-input">
              <option value="last_week">From last week</option>
              <option value="today">Today</option>
              <option value="last_month">Last month</option>
              <option value="specific">Specific date</option>
              <option value="all">All time</option>
            </select>
            {filters.range === "specific" && (
              <input
                type="date"
                value={filters.specificDate}
                onChange={handleFilterChange("specificDate")}
                className="chip-input"
              />
            )}
          </form>
          <p className="small-muted" style={{ marginTop: "0.5rem" }}>
            Showing {filteredMessages.length} of {messages.length} messages.
          </p>
        </div>
      )}

      {filteredMessages.length > 0 && (
        <div className="github-list" style={{ marginTop: "1rem" }}>
          {filteredMessages.map((msg) => (
            <div key={msg._id} className="github-item">
              <h3>
                #{msg.contactId ?? "N/A"} — {msg.name}
              </h3>
              <p className="small-muted">{msg.email}</p>
              <p style={{ marginTop: "0.25rem" }}>{msg.message}</p>
              <div className="github-meta">
                <span>{new Date(msg.createdAt).toLocaleString()}</span>
                <span>ID: {msg._id}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Admin;
