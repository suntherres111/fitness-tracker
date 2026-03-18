import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { CalorieEatenChartData } from "../types/progressChart";
import { useEffect } from "react";
import type { Tracker } from "../types/tracker";

interface Props {
  entriesData: Tracker[];
  refreshData: () => void;
}

const CalorieEatenChart = ({ entriesData, refreshData }: Props) => {
  const calorieEatenData: CalorieEatenChartData[] = entriesData;
  useEffect(() => {
    refreshData();
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h2 className="text-xl font-bold mb-4">Calorie Eaten</h2>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={calorieEatenData} syncId="anyId">
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />

          <Line
            type="monotone"
            dataKey="calories_eaten"
            strokeWidth={3}
            stroke="rgb(130, 202, 157)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CalorieEatenChart;
