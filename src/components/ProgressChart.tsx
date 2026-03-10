import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { supabase } from "../lib/supabaseClient";
import type { ProgressChart } from "../types/progressChart";
import { useEffect, useState } from "react";

// const data = [
//   { day: 1, weight: 125 },
//   { day: 7, weight: 123 },
//   { day: 14, weight: 121 },
//   { day: 21, weight: 119 },
//   { day: 30, weight: 117 },
// ];

// supabase.from("tracker").select("date, weight").order("date");

const ProgressChart = () => {
  const [data, setData] = useState<ProgressChart[]>([]);
  // Fetch data from Supabase
  const loadData = async () => {
    const { data, error } = await supabase
      .from("daily_tracker")
      .select("date, weight")
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
        <LineChart data={data}>
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
