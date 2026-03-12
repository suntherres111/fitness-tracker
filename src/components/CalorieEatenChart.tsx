import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Brush,
} from "recharts";
import { supabase } from "../lib/supabaseClient";
import type { CalorieEatenChartData } from "../types/progressChart";
import { useEffect, useState } from "react";

const CalorieEatenChart = () => {
  const [calorieEatenData, setCalorieEatenData] = useState<
    CalorieEatenChartData[]
  >([]);
  // Fetch data from Supabase
  const loadData = async () => {
    const { data, error } = await supabase
      .from("daily_tracker")
      .select("date, calories_eaten")
      .order("date");

    if (!error && data) {
      setCalorieEatenData(data);
    }
  };
  useEffect(() => {
    loadData();
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
