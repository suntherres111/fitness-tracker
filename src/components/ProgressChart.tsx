import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
// import { supabase } from "../lib/supabaseClient";
import type { ProgressChartData } from "../types/progressChart";
import { useEffect } from "react";
import type { Tracker } from "../types/tracker";

interface Props {
  entriesData: Tracker[];
  refreshData: () => void;
}

const ProgressChart = ({ entriesData, refreshData }: Props) => {
  useEffect(() => {
    refreshData();
  }, []);
  const data: ProgressChartData[] = entriesData;

  return (
    <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg border border-gray-200 dark:border-gray-700 shadow-lg rounded-2xl p-5">
      <h2 className="text-xl font-bold mb-4 text-gray-500">Weight Progress</h2>

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
