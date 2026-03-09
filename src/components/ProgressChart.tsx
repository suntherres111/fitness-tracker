import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { day: 1, weight: 125 },
  { day: 7, weight: 123 },
  { day: 14, weight: 121 },
  { day: 21, weight: 119 },
  { day: 30, weight: 117 },
];

const ProgressChart = () => {
  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h2 className="text-xl font-bold mb-4">Weight Progress</h2>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />

          <Line type="monotone" dataKey="weight" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProgressChart;
