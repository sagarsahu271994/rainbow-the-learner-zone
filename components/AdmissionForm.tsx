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
    <label>
      <span className="label">{label}</span>

      <span className="flex min-h-28 cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 text-center text-sm">

        <Upload size={22} className="mb-2 text-violet" />

        {fileName ? (
          <span className="text-green-600 font-medium">
            ✓ {fileName}
          </span>
        ) : (
          <span className="text-slate-500">
            Tap to choose file
          </span>
        )}

        <input
          name={name}
          type="file"
          accept={accept}
          required={required}
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              setFileName(file.name);
            }
          }}
        />

      </span>
    </label>
  );
}
