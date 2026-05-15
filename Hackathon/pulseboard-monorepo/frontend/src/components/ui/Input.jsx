export default function Input({
  label,
  className = "",
  ...props
}) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm font-medium text-gray-600">
          {label}
        </label>
      )}

      <input
        className={`w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-violet-500 ${className}`}
        {...props}
      />
    </div>
  );
}