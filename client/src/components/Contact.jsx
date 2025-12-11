import { useState } from "react";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState({ text: "", type: "" });

  const updateField = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const showMsg = (text, type) => setStatus({ text, type });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = form.name.trim();
    const email = form.email.trim();
    const message = form.message.trim();
    const emailOk = !!email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!name) return showMsg("Please enter your name.", "error");
    if (!emailOk) return showMsg("Please enter a valid email.", "error");
    if (!message) return showMsg("Please write a message.", "error");

    showMsg("Sending...", "info");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      if (!res.ok) throw new Error("Request failed");
      showMsg("Thanks! Your message was saved.", "success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      showMsg("Could not reach the server. Your message stayed on this device.", "error");
    }
  };

  return (
    <section id="contact" className="section">
      <h2>Contact Me</h2>
      <form className="contact-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" placeholder="Your Name" required value={form.name} onChange={updateField("name")} />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="Your Email"
          required
          value={form.email}
          onChange={updateField("email")}
        />

        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          rows="4"
          placeholder="Your Message"
          value={form.message}
          onChange={updateField("message")}
        />
        <div id="form-msg" className={`form-msg ${status.text ? "show" : ""} ${status.type}`} role="alert" aria-live="assertive">
          {status.text}
        </div>
        <button type="submit">Send</button>
      </form>
    </section>
  );
};

export default Contact;
