import { useEffect } from "react";
// import { supabase } from "../lib/supabaseClient";
import type { Tracker } from "../types/tracker";

interface Props {
  entriesData: Tracker[];
  refreshData: () => void;
}

const targetWeight = 110;

const GoalProjection = ({ entriesData, refreshData }: Props) => {
  // const [goalDate, setGoalDate] = useState<string>("");
  let goalDate = "";

  if (entriesData && entriesData.length >= 2) {
    const weights = entriesData;
    const startWeight = weights[0].weight;
    const currentWeight = weights[weights.length - 1].weight;

    const startDate = new Date(weights[0].date);
    const currentDate = new Date(weights[weights.length - 1].date);

    const days =
      (currentDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
    const dailyLoss = (startWeight - currentWeight) / days;

    const remainingWeight = currentWeight - targetWeight;

    const daysNeeded = remainingWeight / dailyLoss;

    const goal = new Date();
    goal.setDate(goal.getDate() + Math.ceil(daysNeeded));
    if (dailyLoss <= 0) {
      goalDate = "Trend Unclear";
    } else {
      goalDate = goal.toLocaleDateString();
    }
  }
  useEffect(() => {
    refreshData();
  }, []);

  return (
    <div className="bg-white shadow rounded-xl p-5">
      <h2 className="text-xl font-bold mb-2">Estimated Goal Date</h2>

      <p className="text-blue-800 text-2xl font-bold mt-1">{goalDate || "-"}</p>
    </div>
  );
};

export default GoalProjection;
