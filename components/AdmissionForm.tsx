"use client";

import { useState } from "react";
import { Upload } from "lucide-react";

function FileField({
  name,
  label,
  accept,
  required = false
}: {
  name: string;
  label: string;
  accept: string;
  required?: boolean;
}) {
  const [fileName, setFileName] = useState("");

  return (
    <div>
      <span className="label">{label}</span>

      <label
        htmlFor={name}
        className="flex min-h-28 cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-center"
      >
        <Upload size={22} className="mb-2 text-violet" />

        {fileName ? (
          <>
            <p className="text-green-600 font-semibold">
              ✓ {fileName}
            </p>
          </>
        ) : (
          <>
            <p>Tap to choose file</p>
          </>
        )}
      </label>

      <input
        id={name}
        name={name}
        type="file"
        accept={accept}
        required={required}
        hidden
        onChange={(e) => {
          const file = e.target.files?.[0];

          if (file) {
            console.log(file.name);
            setFileName(file.name);
          }
        }}
      />
    </div>
  );
}

export function AdmissionForm() {
  return (
    <div className="space-y-6">

      <FileField
        name="studentPhoto"
        label="Student photo"
        accept="image/*"
        required
      />

      <FileField
        name="previousReport"
        label="Previous report"
        accept="image/*,.pdf"
      />

    </div>
  );
}
