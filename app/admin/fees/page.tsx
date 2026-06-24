"use client";

import { useMemo, useState } from "react";

type FormData = {
  receiptNo: string;
  date: string;
  studentName: string;
  className: string;
  feeMonth: string;
  amount: string;
  receivedBy: string;
};

type FieldProps = {
  label: string;
  value: string;
  set={(v: string)=> => void;
};

function Field({ label, value, set }: FieldProps) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ marginBottom: 8, fontWeight: 600 }}>{label}</div>
      <input
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => set(e.target.value)}
        style={{
          width: "100%",
          padding: 14,
          border: "1px solid #ddd",
          borderRadius: 10,
          boxSizing: "border-box",
        }}
      />
    </div>
  );
}

export default function FeesPage() {
  const today = new Date().toISOString().split("T")[0];
  const receipt = useMemo(() => `RTL-${Date.now()}`, []);

  const [form, setForm] = useState<FormData>({
    receiptNo: receipt,
    date: today,
    studentName: "",
    className: "",
    feeMonth: "",
    amount: "",
    receivedBy: "",
  });

  function update(key: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function submit() {
    try {
      const response = await fetch("/api/fees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        alert("Save Failed");
        return;
      }

      const data = await response.json();

      if (data.success) {
        const params = new URLSearchParams({
          receiptNo: form.receiptNo,
          student: form.studentName,
          class: form.className,
          month: form.feeMonth,
          amount: form.amount,
        });
        window.location.href = `/fees/thank-you?${params.toString()}`;
      } else {
        alert("Save Failed");
      }
    } catch {
      alert("Server Error");
    }
  }

  async function pdf() {
    const html2canvas = (await import("html2canvas")).default;
    const { default: jsPDF } = await import("jspdf");

    const el = document.getElementById("receipt");
    if (!el) return;

    const canvas = await html2canvas(el);
    const img = canvas.toDataURL("image/png");

    const doc = new jsPDF("p", "mm", "a4");
    doc.addImage(img, "PNG", 10, 10, 190, 250);
    doc.save(`${form.receiptNo}.pdf`);
  }

  function whatsapp() {
    const msg = `Receipt ${form.receiptNo}\nStudent ${form.studentName}\nAmount ₹${form.amount}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, "_blank");
  }

  return (
    <div style={{ background: "#f4f7fc", minHeight: "100vh", padding: 40 }}>
      <div style={{ maxWidth: 900, margin: "auto" }}>

        <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
          <button style={blue} onClick={submit}>Submit</button>
          <button style={black} onClick={pdf}>Download PDF</button>
          <button style={green} onClick={whatsapp}>WhatsApp</button>
        </div>

        <div
          id="receipt"
          style={{ background: "#fff", padding: 40, borderRadius: 20 }}
        >
          <img src="/logo.png" alt="" width="90" />
          <h1>Rainbow</h1>
          <p>Fees Receipt</p>
          <br />

          <Field
            label="Student"
            value={form.studentName}
            set={(v: string) => update("studentName", v)}
          />
          <Field
            label="Class"
            value={form.className}
            set={(v: string) => update("className", v)}
          />
          <Field
            label="Month"
            value={form.feeMonth}
            set={(v: string) => update("feeMonth", v)}
          />
          <Field
            label="Amount"
            value={form.amount}
            set={(v: string) => update("amount", v)}
          />
          <Field
            label="Received By"
            value={form.receivedBy}
            set={(v: string) => update("receivedBy", v)}
          />

          <br />
          <img src="/signature.jpeg" alt="" height="80" />
        </div>

      </div>
    </div>
  );
}

const blue: React.CSSProperties = {
  background: "#4f46e5",
  color: "#fff",
  border: "none",
  padding: "14px 24px",
  cursor: "pointer",
  borderRadius: 8,
};

const black: React.CSSProperties = {
  background: "#111",
  color: "#fff",
  border: "none",
  padding: "14px 24px",
  cursor: "pointer",
  borderRadius: 8,
};

const green: React.CSSProperties = {
  background: "#16a34a",
  color: "#fff",
  border: "none",
  padding: "14px 24px",
  cursor: "pointer",
  borderRadius: 8,
};
