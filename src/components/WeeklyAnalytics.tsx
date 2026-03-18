import { useEffect } from "react";
import type { Tracker } from "../types/tracker";

interface Props {
  entriesData: Tracker[];
  refreshData: () => void;
}

const WeeklyAnalytics = ({ entriesData, refreshData }: Props) => {
  const first = entriesData[0].weight;
  const last = entriesData[entriesData.length - 1].weight;
  const loss = first - last;

  useEffect(() => {
    refreshData();
  }, []);

  const analyticColor =
    loss > 0
      ? "text-emerald-600"
      : loss == 0
        ? "text-cyan-600"
        : "text-red-600";

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-2">Weekly Fat Loss</h2>
      <p className={`text-2xl font-bold ${analyticColor}`}>
        {loss.toFixed(2)} kg lost
      </p>
    </div>
  );
};

export default WeeklyAnalytics;
