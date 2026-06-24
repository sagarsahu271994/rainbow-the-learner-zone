"use client";

import React, { useMemo, useState } from "react";

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
  set: (value: string) => void;
};

function Field({
  label,
  value,
  set,
}: FieldProps) {
  return (
    <div style={{ marginBottom: 16 }}>
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
          set(e.target.value)
        }
        style={{
          width: "100%",
          padding: 14,
          border: "1px solid #ddd",
          borderRadius: 10,
          boxSizing:
            "border-box",
        }}
      />
    </div>
  );
}

export default function FeesPage() {
  const today =
    new Date()
      .toISOString()
      .split("T")[0];

  const receipt =
    useMemo(
      () =>
        `RTL-${Date.now()}`,
      []
    );

  const [form, setForm] =
    useState<FormData>({
      receiptNo:
        receipt,
      date: today,
      studentName:
        "",
      className:
        "",
      feeMonth:
        "",
      amount:
        "",
      receivedBy:
        "",
    });

  function update(
    key: keyof FormData,
    value: string
  ) {
    setForm(
      (prev) => ({
        ...prev,
        [key]:
          value,
      })
    );
  }

  async function createPdfBase64() {
    const html2canvas =
      (
        await import(
          "html2canvas"
        )
      ).default;

    const {
      default:
        jsPDF,
    } =
      await import(
        "jspdf"
      );

    const el =
      document.getElementById(
        "receipt"
      );

    if (!el)
      return null;

    const canvas =
      await html2canvas(
        el
      );

    const img =
      canvas.toDataURL(
        "image/png"
      );

    const pdf =
      new jsPDF(
        "p",
        "mm",
        "a4"
      );

    pdf.addImage(
      img,
      "PNG",
      10,
      10,
      190,
      250
    );

    return {
      pdf,
      base64:
        pdf.output(
          "datauristring"
        ),
    };
  }

  async function submit() {
    try {
      const pdfData =
        await createPdfBase64();

      if (
        !pdfData
      ) {
        alert(
          "PDF Failed"
        );
        return;
      }

      const response =
        await fetch(
          "/api/fees",
          {
            method:
              "POST",

            headers:
              {
                "Content-Type":
                  "application/json",
              },

            body:
              JSON.stringify(
                {
                  ...form,
                  receiptPdf:
                    pdfData.base64,
                }
              ),
          }
        );

      const data =
        await response.json();

      if (
        data.success
      ) {
        pdfData.pdf.save(
          `${form.receiptNo}.pdf`
        );

        if (
          data.pdfUrl
        ) {
          window.open(
            `https://wa.me/?text=${encodeURIComponent(
              `Fees Receipt\n${data.pdfUrl}`
            )}`,
            "_blank"
          );
        }

        alert(
          "Receipt Saved"
        );
      } else {
        alert(
          "Save Failed"
        );
      }
    } catch {
      alert(
        "Server Error"
      );
    }
  }

  async function pdf() {
    const data =
      await createPdfBase64();

    data?.pdf.save(
      `${form.receiptNo}.pdf`
    );
  }

  function whatsapp() {
    const msg =
      `Receipt ${form.receiptNo}
Student ${form.studentName}
Amount ₹${form.amount}`;

    window.open(
      `https://wa.me/?text=${encodeURIComponent(
        msg
      )}`,
      "_blank"
    );
  }

  return (
    <div
      style={{
        background:
          "#f4f7fc",
        minHeight:
          "100vh",
        padding:
          40,
      }}
    >
      <div
        style={{
          maxWidth:
            900,
          margin:
            "auto",
        }}
      >
        <div
          style={{
            display:
              "flex",
            gap: 10,
            marginBottom:
              20,
          }}
        >
          <button
            style={
              blue
            }
            onClick={
              submit
            }
          >
            Submit
          </button>

          <button
            style={
              black
            }
            onClick={
              pdf
            }
          >
            Download PDF
          </button>

          <button
            style={
              green
            }
            onClick={
              whatsapp
            }
          >
            WhatsApp
          </button>
        </div>

        <div
          id="receipt"
          style={{
            background:
              "#fff",
            padding:
              40,
            borderRadius:
              20,
          }}
        >
          <img
            src="/logo.png"
            width="90"
            alt=""
          />

          <h1>
            Rainbow
          </h1>

          <p>
            Fees
            Receipt
          </p>

          <Field
            label="Student"
            value={
              form.studentName
            }
            set={(
              v
            ) =>
              update(
                "studentName",
                v
              )
            }
          />

          <Field
            label="Class"
            value={
              form.className
            }
            set={(
              v
            ) =>
              update(
                "className",
                v
              )
            }
          />

          <Field
            label="Month"
            value={
              form.feeMonth
            }
            set={(
              v
            ) =>
              update(
                "feeMonth",
                v
              )
            }
          />

          <Field
            label="Amount"
            value={
              form.amount
            }
            set={(
              v
            ) =>
              update(
                "amount",
                v
              )
            }
          />

          <Field
            label="Received By"
            value={
              form.receivedBy
            }
            set={(
              v
            ) =>
              update(
                "receivedBy",
                v
              )
            }
          />

          <br />

          <img
            src="/signature.jpeg"
            height="80"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

const blue: React.CSSProperties =
{
  background:
    "#4f46e5",
  color:
    "#fff",
  border:
    "none",
  padding:
    "14px 24px",
  borderRadius:
    8,
};

const black: React.CSSProperties =
{
  background:
    "#111",
  color:
    "#fff",
  border:
    "none",
  padding:
    "14px 24px",
  borderRadius:
    8,
};

const green: React.CSSProperties =
{
  background:
    "#16a34a",
  color:
    "#fff",
  border:
    "none",
  padding:
    "14px 24px",
  borderRadius:
    8,
};
