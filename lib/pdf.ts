"use client";

import jsPDF from "jspdf";

export function downloadAdmissionPdf(data: Record<string, string>) {
  const pdf = new jsPDF();
  pdf.setFillColor(21, 35, 63);
  pdf.rect(0, 0, 210, 34, "F");
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(20);
  pdf.text("Rainbow The Learner Zone", 16, 16);
  pdf.setFontSize(10);
  pdf.text("Admission acknowledgement", 16, 24);
  pdf.setTextColor(21, 35, 63);
  pdf.setFontSize(14);
  pdf.text(`Admission ID: ${data.admissionId}`, 16, 48);
  const rows = [
    ["Student", data.studentName],
    ["Class", data.className],
    ["Mobile", data.mobile],
    ["Preferred batch", data.preferredBatch],
    ["Submitted", data.createdAt]
  ];
  rows.forEach(([label, value], i) => {
    pdf.setFontSize(10);
    pdf.setTextColor(95, 105, 125);
    pdf.text(label, 16, 66 + i * 14);
    pdf.setTextColor(21, 35, 63);
    pdf.text(value || "-", 66, 66 + i * 14);
  });
  pdf.setFontSize(9);
  pdf.text("110/2, Nehru Nagar, Indore  |  +91 6263549413", 16, 146);
  pdf.save(`${data.admissionId}-admission.pdf`);
}

export function downloadFeePdf(data: Record<string, string | number>) {
  const pdf = new jsPDF();
  pdf.setFillColor(21, 35, 63);
  pdf.rect(0, 0, 210, 34, "F");
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(20);
  pdf.text("Rainbow The Learner Zone", 16, 16);
  pdf.setFontSize(10);
  pdf.text("Fee slip", 16, 24);
  pdf.setTextColor(21, 35, 63);
  pdf.setFontSize(13);
  pdf.text(`Receipt: ${data.id}`, 16, 50);
  pdf.text(`Student: ${data.studentName}`, 16, 66);
  pdf.text(`Month: ${data.month}`, 16, 82);
  pdf.text(`Amount: INR ${data.amount}`, 16, 98);
  pdf.text(`Status: ${String(data.status).toUpperCase()}`, 16, 114);
  pdf.setFontSize(9);
  pdf.text("110/2, Nehru Nagar, Indore  |  +91 6263549413", 16, 140);
  pdf.save(`${data.id}-fee-slip.pdf`);
}
