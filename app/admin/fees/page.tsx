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
  set: (value: string) => void;
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
          color: "#334155",
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
          padding: "14px",
          border: "1px solid #dbe2ea",
          borderRadius: "10px",
          outline: "none",
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
      receiptNo: receipt,
      date: today,
      studentName: "",
      className: "",
      feeMonth: "",
      amount: "",
      receivedBy: "",
    });

  function update(
    key: keyof FormData,
    value: string
  ) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  async function submit() {

try {

const response =
await fetch(
"/api/fees",
{
method:"POST",

headers:{
"Content-Type":
"application/json"
},

body:
JSON.stringify(
form
)
}
);

const data =
await response.json();

if(
data.success
){

alert(
"Receipt Saved"
);

}

else{

alert(
"Save Failed"
);

}

}

catch{

alert(
"Server Error"
);

}

}

  async function pdf(){

const html2canvas=
(await import(
"html2canvas"
)).default;

const {
default: jsPDF
}=await import(
"jspdf"
);

const el=
document.getElementById(
"receipt"
);

if(!el) return;

const canvas=
await html2canvas(
el
);

const img=
canvas.toDataURL(
"image/png"
);

const pdfDoc =
new jsPDF(
"p",
"mm",
"a4"
);

pdfDoc.addImage(
img,
"PNG",
10,
10,
190,
250
);

pdfDoc.save(
`${form.receiptNo}.pdf`
);

}

 function whatsapp(){

const text=

`Receipt No:
${form.receiptNo}

Student:
${form.studentName}

Class:
${form.className}

Month:
${form.feeMonth}

Amount:
₹${form.amount}`;

window.open(
`https://wa.me/?text=${encodeURIComponent(text)}`,
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
        padding: 40,
      }}
    >
      <div
        style={{
          maxWidth: 980,
          margin: "auto",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 12,
            marginBottom: 20,
            flexWrap:
              "wrap",
          }}
        >
          <button
            style={blue}
            onClick={
              submit
            }
          >
            Submit
          </button>

          <button
            style={black}
            onClick={
              pdf
            }
          >
            Download PDF
          </button>

          <button
            style={green}
            onClick={
              whatsapp
            }
          >
            Send WhatsApp
          </button>
        </div>

<div
id="receipt"
style={{
background:"#fff",
borderRadius:24,
padding:40,
boxShadow:
"0 15px 50px rgba(0,0,0,.08)",
}}
>
          <div
            style={{
              display:
                "flex",
              gap: 20,
              alignItems:
                "center",
              borderBottom:
                "2px solid #ececec",
              paddingBottom:
                20,
            }}
          >
            <img
  src="/logo.png"
  loading="lazy"
  alt="Rainbow Logo"
  style={{
    width: 90,
  }}
/>

            <div>
              <h1
                style={{
                  margin:
                    0,
                  fontSize:
                    34,
                }}
              >
                Rainbow
              </h1>

              <div>
                The Learner
                Zone
              </div>

              <div>
                Fees Receipt
              </div>
            </div>
          </div>

          <div
            style={{
              display:
                "flex",
              justifyContent:
                "space-between",
              marginTop:
                25,
            }}
          >
            <div>
              <b>
                Receipt:
              </b>{" "}
              {
                form.receiptNo
              }
            </div>

            <div>
              <b>
                Date:
              </b>{" "}
              {
                form.date
              }
            </div>
          </div>

          <div
            style={{
              marginTop:
                30,
              display:
                "grid",
              gap: 18,
            }}
          >
            <Field
              label="Student Name"
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
              label="Fee Month"
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
          </div>

          <div
            style={{
              display:
                "flex",
              justifyContent:
                "space-between",
              marginTop:
                70,
            }}
          >
            <div>
              Student
              Signature
            </div>

            <div>
              <img
  src="/signature.jpeg"
  loading="lazy"
  alt="Signature"
  style={{
    height: 80,
  }}
/>

              <div>
                Authorized
                Signature
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const blue = {
  background:
    "#4f46e5",
  color: "#fff",
  border: "none",
  padding:
    "14px 24px",
  borderRadius:
    10,
};

const black = {
  background:
    "#111",
  color: "#fff",
  border: "none",
  padding:
    "14px 24px",
  borderRadius:
    10,
};

const green = {
  background:
    "#16a34a",
  color: "#fff",
  border: "none",
  padding:
    "14px 24px",
  borderRadius:
    10,
};
