import Card from "./Card";

export default function StatsCard({ title, value }) {
  return (
    <Card>
      <h3 className="text-gray-500 text-sm">{title}</h3>

      <p className="text-3xl font-bold mt-2">{value}</p>
    </Card>
  );
}