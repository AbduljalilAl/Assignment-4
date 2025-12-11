import { useEffect, useMemo, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const NAME_KEY = "remembered-name";

const formatSeconds = (sec) => {
  const minutes = Math.floor(sec / 60);
  const seconds = sec % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

const About = () => {
  const [name, setName] = useLocalStorage(NAME_KEY, "");
  const [inputValue, setInputValue] = useState("");
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    setInputValue(name || "");
  }, [name]);

  useEffect(() => {
    const startedAt = Date.now();
    const id = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startedAt) / 1000));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const greetingText = useMemo(() => {
    const hour = new Date().getHours();
    const period = hour < 12 ? "morning" : hour < 18 ? "afternoon" : "evening";
    const trimmed = (name || "").trim();
    return trimmed
      ? `Good ${period}, ${trimmed}! Welcome to my portfolio.`
      : `Good ${period}, welcome to my portfolio.`;
  }, [name]);

  const handleSave = () => {
    setName(inputValue.trim());
  };

  return (
    <section id="about" className="section">
      <h2>About Me</h2>
      <p id="greeting" aria-live="polite" className="fade-in">
        {greetingText}
      </p>
      <div id="session-timer" className="pill" aria-live="polite" role="status">
        Time on site: {formatSeconds(elapsed)}
      </div>
      <div className="about-container">
        <img
          src="/assets/images/profile.png"
          alt="Profile Image"
          className="profile-img"
          width="180"
          height="180"
          loading="lazy"
          decoding="async"
        />
        <div className="about-text">
          <p>
            Hello! My name is <strong>Abbduljalil</strong>. I am passionate about web development and AI integration.
            This portfolio showcases my work and growth as a developer.
          </p>
          <p>
            <em>"Dream big and accomplish."</em>
          </p>
          <div className="remember-block">
            <label htmlFor="remember-name">Remember your name</label>
            <div className="remember-row">
              <input
                type="text"
                id="remember-name"
                placeholder="Type your name"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <button type="button" id="remember-save" onClick={handleSave}>
                Save
              </button>
            </div>
            <p id="remembered-name" className="small-muted" aria-live="polite">
              {name ? `Saved: ${name}` : ""}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
