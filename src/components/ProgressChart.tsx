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
