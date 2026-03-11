import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

interface WeightEntry {
  date: string;
  weight: number;
}

const targetWeight = 110;

const GoalProjection = () => {
  const [goalDate, setGoalDate] = useState<string>("");

  const loadWeights = async () => {
    const { data: userData } = await supabase.auth.getUser();

    const user = userData?.user;

    if (!user) return;

    const { data } = await supabase
      .from("daily_tracker")
      .select("date, weight")
      .eq("user_id", user.id)
      .order("date", { ascending: true });

    if (data && data.length >= 2) {
      calculateProjection(data);
    }
  };

  const calculateProjection = (weights: WeightEntry[]) => {
    const startWeight = weights[0].weight;
    const currentWeight = weights[weights.length - 1].weight;

    const startDate = new Date(weights[0].date);
    const currentDate = new Date(weights[weights.length - 1].date);

    const days =
      (currentDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);

    if (days <= 0) return;

    const dailyLoss = (startWeight - currentWeight) / days;

    console.log(startWeight, currentWeight, days, dailyLoss);

    if (dailyLoss <= 0) {
      setGoalDate("Trend unclear");
      return;
    }

    const remainingWeight = currentWeight - targetWeight;

    const daysNeeded = remainingWeight / dailyLoss;

    const goal = new Date();
    goal.setDate(goal.getDate() + Math.ceil(daysNeeded));

    setGoalDate(goal.toLocaleDateString());
  };

  useEffect(() => {
    loadWeights();
  }, []);

  return (
    <div className="bg-white shadow rounded-xl p-5">
      <p className="text-gray-500 text-sm">Estimated Goal Date</p>

      <p className="text-2xl font-bold mt-1">{goalDate || "-"}</p>
    </div>
  );
};

export default GoalProjection;
