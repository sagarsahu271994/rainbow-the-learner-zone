"use client";

export default function FeesPage() {
  return (
    <div
      style={{
        padding: 40,
        background: "#f5f7ff",
        minHeight: "100vh",
      }}
    >
      <h1
        style={{
          fontSize: 40,
          color: "#4f46e5",
        }}
      >
        🎉 NEW FEES UI LOADED
      </h1>

      <input
        placeholder="Student Name"
        style={{
          display: "block",
          padding: 12,
          marginTop: 20,
          width: 300,
        }}
      />

      <button
        style={{
          marginTop: 20,
          padding: "14px 24px",
          background: "#111",
          color: "#fff",
          border: "none",
          borderRadius: 10,
        }}
      >
        Save Receipt
      </button>
    </div>
  );
}
