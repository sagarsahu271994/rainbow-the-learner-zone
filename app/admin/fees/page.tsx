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

  function update(key: string, value: string) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  return (
    <div
      style={{
        background: "#f6f7fb",
        minHeight: "100vh",
        padding: "40px",
      }}
    >
      <div
        style={{
          maxWidth: 900,
          margin: "0 auto",
          background: "#fff",
          borderRadius: 18,
          padding: 40,
          boxShadow: "0 10px 30px rgba(0,0,0,.08)",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h1
            style={{
              color: "#283593",
              marginBottom: 5,
            }}
          >
            Rainbow The Learner Zone
          </h1>

          <p style={{ color: "#666" }}>
            Fees Receipt
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 18,
            marginTop: 30,
          }}
        >
          <input
            placeholder="Receipt No"
            value={form.receiptNo}
            onChange={(e) =>
              update("receiptNo", e.target.value)
            }
            style={input}
          />

          <input
            type="date"
            value={form.date}
            onChange={(e) =>
              update("date", e.target.value)
            }
            style={input}
          />

          <input
            placeholder="Student Name"
            value={form.studentName}
            onChange={(e) =>
              update("studentName", e.target.value)
            }
            style={input}
          />

          <input
            placeholder="Class"
            value={form.className}
            onChange={(e) =>
              update("className", e.target.value)
            }
            style={input}
          />

          <input
            placeholder="Fee Month"
            value={form.feeMonth}
            onChange={(e) =>
              update("feeMonth", e.target.value)
            }
            style={input}
          />

          <input
            placeholder="Amount"
            value={form.amount}
            onChange={(e) =>
              update("amount", e.target.value)
            }
            style={input}
          />
        </div>

        <div
          style={{
            marginTop: 30,
            display: "flex",
            gap: 15,
          }}
        >
          <button style={primaryBtn}>
            Save Receipt
          </button>

          <button style={secondaryBtn}>
            Download PDF
          </button>

          <button style={whatsappBtn}>
            Share WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}

const input = {
  width: "100%",
  padding: "16px",
  borderRadius: "10px",
  border: "1px solid #ddd",
};

const primaryBtn = {
  padding: "14px 24px",
  background: "#283593",
  color: "#fff",
  border: "none",
  borderRadius: "10px",
};

const secondaryBtn = {
  padding: "14px 24px",
  background: "#111",
  color: "#fff",
  border: "none",
  borderRadius: "10px",
};

const whatsappBtn = {
  padding: "14px 24px",
  background: "#1FA855",
  color: "#fff",
  border: "none",
  borderRadius: "10px",
};
