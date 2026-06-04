import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function PollLineChart({
  data = [],
  dataKey = "value",
  xKey = "name",
}) {
  return (
    <ResponsiveContainer
      width="100%"
      height={300}
    >
      <LineChart data={data}>
        <XAxis dataKey={xKey} />

        <YAxis />

        <Tooltip />

        <Line
          type="monotone"
          dataKey={dataKey}
          stroke="#7c3aed"
          strokeWidth={3}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}