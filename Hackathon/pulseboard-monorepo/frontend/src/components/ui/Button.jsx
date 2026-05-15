export default function Button({
  children,
  className = "",
  variant = "primary",
  ...props
}) {
  const variants = {
    primary: "bg-violet-600 text-white hover:bg-violet-700",
    outline: "border border-gray-300 hover:bg-gray-100",
    danger: "bg-red-500 text-white hover:bg-red-600",
    success: "bg-green-500 text-white hover:bg-green-600",
  };

  return (
    <button
      className={`px-4 py-2 rounded-lg transition font-medium ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}