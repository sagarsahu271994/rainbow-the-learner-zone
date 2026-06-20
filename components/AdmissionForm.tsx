export function AdmissionForm({
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
    <label className="block cursor-pointer">
      <span className="label">{label}</span>

      <div className="flex min-h-28 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-center hover:border-violet">

        <Upload size={22} className="mb-2 text-violet" />

        {fileName ? (
          <>
            <p className="font-medium text-green-600">
              ✓ File selected
            </p>

            <p className="mt-1 text-xs text-slate-500 break-all">
              {fileName}
            </p>
          </>
        ) : (
          <>
            <p className="text-slate-600">
              Tap to choose file
            </p>

            <p className="mt-1 text-xs text-slate-400">
              JPG, PNG, WEBP, PDF
            </p>
          </>
        )}

        <input
          name={name}
          type="file"
          accept={accept}
          required={required}
          className="absolute opacity-0 w-px h-px"

          onChange={(e) => {
            const file = e.target.files?.[0];

            console.log("Selected file:", file);

            if (file) {
              setFileName(file.name);
            }
          }}
        />
      </div>
    </label>
  );
}
