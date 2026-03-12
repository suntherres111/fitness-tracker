import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { supabase } from "../lib/supabaseClient";
import type { ProgressChartData } from "../types/progressChart";
import { useEffect, useState } from "react";

const ProgressChart = () => {
  const [data, setData] = useState<ProgressChartData[]>([]);
  // Fetch data from Supabase
  const loadData = async () => {
    const { data, error } = await supabase
      .from("daily_tracker")
      .select("date, weight, calories_eaten")
      .order("date");

    if (!error && data) {
      setData(data);
    }
  };
  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h2 className="text-xl font-bold mb-4">Weight Progress</h2>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data} syncId="anyId">
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="weight" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProgressChart;
