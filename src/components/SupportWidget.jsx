import { useState } from "react";

export default function SupportWidget() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(
        "https://support-sdk.onrender.com/submit-ticket",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );
      if (res.ok) setSubmitted(true);
    } catch (err) {
      alert("Failed to submit. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-white dark:bg-gray-900 text-black dark:text-white p-4 rounded-2xl shadow-xl w-80">
        {submitted ? (
          <p className="text-green-600 dark:text-green-400">
            🎉 Ticket Submitted!
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Your Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="p-2 border rounded dark:bg-gray-800"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="p-2 border rounded dark:bg-gray-800"
              required
            />
            <textarea
              placeholder="Message"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="p-2 border rounded dark:bg-gray-800"
              rows={4}
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-primary hover:bg-primary-dark text-white py-2 rounded"
            >
              {loading ? "Sending..." : "Submit Ticket"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
