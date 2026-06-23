"use client";

import { useMemo, useState } from "react";

type FormType = {
  receiptNo: string;
  date: string;
  studentName: string;
  className: string;
  feeMonth: string;
  amount: string;
  receivedBy: string;
};

export default function FeesPage() {
  const today = new Date().toISOString().split("T")[0];

  const autoReceipt = useMemo(
    () => `RTL-${Date.now()}`,
    []
  );

  const [form, setForm] = useState<FormType>({
    receiptNo: autoReceipt,
    date: today,
    studentName: "",
    className: "",
    feeMonth: "",
    amount: "",
    receivedBy: "",
  });

  function update(
    key: keyof FormType,
    value: string
  ) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  function submitReceipt() {
    alert("Receipt Saved");
  }

  function downloadPDF() {
    alert("PDF Download Ready");
  }

  function shareWhatsapp() {
    const msg =
      `Receipt: ${form.receiptNo}\n` +
      `Student: ${form.studentName}\n` +
      `Class: ${form.className}\n` +
      `Month: ${form.feeMonth}\n` +
      `Amount: ₹${form.amount}`;

    window.open(
      `https://wa.me/?text=${encodeURIComponent(msg)}`
    );
  }

  return (
    <div
      style={{
        background: "#f4f6fb",
        minHeight: "100vh",
        padding: "40px",
      }}
    >
      <div
        style={{
          maxWidth: "1000px",
          margin: "auto",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 20,
            marginBottom: 20,
            flexWrap: "wrap",
          }}
        >
          <button
            style={primaryBtn}
            onClick={submitReceipt}
          >
            Submit
          </button>

          <button
            style={darkBtn}
            onClick={downloadPDF}
          >
            Download PDF
          </button>

          <button
            style={whatsappBtn}
            onClick={shareWhatsapp}
          >
            Send WhatsApp
          </button>
        </div>

        <div
          id="receipt"
          style={{
            background: "#fff",
            padding: "40px",
            borderRadius: 20,
            boxShadow:
              "0 10px 40px rgba(0,0,0,.08)",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 20,
              alignItems: "center",
              borderBottom:
                "2px solid #ddd",
              paddingBottom: 20,
            }}
          >
            <img
              src="/logo.png"
              alt=""
              style={{
                width: 90,
              }}
            />

            <div>
              <h1
                style={{
                  margin: 0,
                  fontSize: 34,
                }}
              >
                Rainbow
              </h1>

              <p>The Learner Zone</p>

              <p>
                110/2 Nehru Nagar,
                Indore
              </p>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent:
                "space-between",
              marginTop: 20,
            }}
          >
            <div>
              <b>Receipt No:</b>{" "}
              {form.receiptNo}
            </div>

            <div>
              <b>Date:</b>{" "}
              {form.date}
            </div>
          </div>

          <div
            style={{
              marginTop: 30,
              display: "grid",
              gap: 18,
            }}
          >
            <Field
              label="Received From"
              value={form.studentName}
              set={(v: string) =>
                update(
                  "studentName",
                  v
                )
              }
            />

            <Field
              label="Class"
              value={form.className}
              set={(v: string) =>
                update(
                  "className",
                  v
                )
              }
            />

            <Field
              label="Fees Month"
              value={form.feeMonth}
              set={(v: string) =>
                update(
                  "feeMonth",
                  v
                )
              }
            />

            <Field
              label="Amount Rs."
              value={form.amount}
              set={(v: string) =>
                update(
                  "amount",
                  v
                )
              }
            />

            <Field
              label="Received By"
              value={form.receivedBy}
              set={(v: string) =>
                update(
                  "receivedBy",
                  v
                )
              }
            />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent:
                "space-between",
              marginTop: 80,
            }}
          >
            <div>
              Student Signature
            </div>

            <div>
              <img
                src="/signature.jpeg"
                alt=""
                style={{
                  height: 80,
                }}
              />

              <p>
                Authorized Signature
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

type FieldProps = {
  label: string;
  value: string;
  set: (v: string) => void;
};

function Field({
  label,
  value,
  set,
}: FieldProps) {
  return (
    <div>
      <div
        style={{
          marginBottom: 8,
          fontWeight: 600,
        }}
      >
        {label}
      </div>

      <input
        value={value}
        onChange={(e) =>
          set(
            e.target.value
          )
        }
        style={{
          width: "100%",
          padding: 12,
          border:
            "1px solid #ccc",
          borderRadius: 8,
        }}
      />
    </div>
  );
}

const primaryBtn = {
  background: "#4f46e5",
  color: "#fff",
  padding: "14px 24px",
  border: "none",
  borderRadius: 10,
};

const darkBtn = {
  background: "#111",
  color: "#fff",
  padding: "14px 24px",
  border: "none",
  borderRadius: 10,
};

const whatsappBtn = {
  background: "#22c55e",
  color: "#fff",
  padding: "14px 24px",
  border: "none",
  borderRadius: 10,
};
