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
    <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg border border-gray-200 dark:border-gray-700 shadow-lg rounded-2xl p-5">
      <h2 className="text-xl font-bold mb-2 text-gray-500">Weekly Fat Loss</h2>
      <p className={`text-2xl font-bold ${analyticColor}`}>
        {loss.toFixed(2)} kg lost
      </p>
    </div>
  );
};

export default WeeklyAnalytics;
