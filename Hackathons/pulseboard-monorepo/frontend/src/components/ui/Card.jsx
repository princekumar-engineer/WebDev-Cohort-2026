export default function Card({ children, className = "" }) {
  return (
    <div className={`bg-white rounded-2xl shadow-sm p-6 ${className}`}>
      {children}
    </div>
  );
}