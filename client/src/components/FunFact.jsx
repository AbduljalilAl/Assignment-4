import { useEffect, useState } from "react";

const FunFact = () => {
  const [fact, setFact] = useState("Loading...");
  const [loading, setLoading] = useState(false);

  const loadTip = async () => {
    setLoading(true);
    setFact("Loading...");
    try {
      const res = await fetch("https://api.adviceslip.com/advice", { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setFact(data?.slip?.advice || "Here is a tip: keep learning!");
    } catch {
      setFact('Could not load a tip. You can retry.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTip();
  }, []);

  return (
    <section id="fun-fact" className="section">
      <h2>Random Dev Tip</h2>
      <div id="fact-box" className="card" aria-live="polite">
        {fact}
      </div>
      <button id="fact-retry" type="button" className="secondary" onClick={loadTip} disabled={loading}>
        {loading ? "Loading..." : "Try another"}
      </button>
    </section>
  );
};

export default FunFact;
