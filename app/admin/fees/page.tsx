"use client";

import { useState } from "react";

export default function FeesPage() {
  const [form, setForm] = useState({
    receiptNo: "",
    date: "",
    studentName: "",
    className: "",
    feeMonth: "",
    amount: "",
  });

  const [loading, setLoading] = useState(false);

  function update(name: string, value: string) {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function submit() {
    try {
      setLoading(true);

      const res = await fetch("/api/fees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        alert("Fees Saved");
      } else {
        alert("Save Failed");
      }
    } catch {
      alert("Error");
    }

    setLoading(false);
  }

  return (
    <div
      style={{
        maxWidth: 900,
        margin: "auto",
        padding: 40,
      }}
    >
      <h1>Fees Receipt</h1>

      <div
        style={{
          display: "grid",
          gap: 16,
          gridTemplateColumns: "1fr 1fr",
        }}
      >
        <input
          placeholder="Receipt No"
          value={form.receiptNo}
          onChange={(e) =>
            update("receiptNo", e.target.value)
          }
        />

        <input
          type="date"
          value={form.date}
          onChange={(e) =>
            update("date", e.target.value)
          }
        />

        <input
          placeholder="Student Name"
          value={form.studentName}
          onChange={(e) =>
            update("studentName", e.target.value)
          }
        />

        <input
          placeholder="Class"
          value={form.className}
          onChange={(e) =>
            update("className", e.target.value)
          }
        />

        <input
          placeholder="Fee Month"
          value={form.feeMonth}
          onChange={(e) =>
            update("feeMonth", e.target.value)
          }
        />

        <input
          placeholder="Amount"
          value={form.amount}
          onChange={(e) =>
            update("amount", e.target.value)
          }
        />
      </div>

      <button
        onClick={submit}
        style={{
          marginTop: 24,
          padding: "14px 28px",
        }}
      >
        {loading ? "Saving..." : "Generate Receipt"}
      </button>
    </div>
  );
}
