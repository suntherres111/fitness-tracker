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
    <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg border border-gray-200 dark:border-gray-700 shadow-lg rounded-2xl p-5">
      <h2 className="text-xl font-bold mb-4 text-gray-500">Calorie Eaten</h2>
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
