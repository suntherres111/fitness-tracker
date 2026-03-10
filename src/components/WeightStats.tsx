import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import StatCard from "./StatCard";

const targetWeight = 110;

const WeightStats = () => {
  const [startWeight, setStartWeight] = useState<number | null>(null);
  const [currentWeight, setCurrentWeight] = useState<number | null>(null);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("daily_tracker")
        .select("weight,date")
        .order("date", { ascending: true });

      if (!data || data.length === 0) return;

      const first = data[0].weight;
      const last = data[data.length - 1].weight;

      setStartWeight(first);
      setCurrentWeight(last);
    };

    load();
  }, []);
  // Safe values fallback
  const safeStartWeight = startWeight ?? targetWeight; // fallback if null
  const safeCurrentWeight = currentWeight ?? safeStartWeight;

  const totalLost =
    startWeight && currentWeight ? (startWeight - currentWeight).toFixed(1) : 0;

  const progressPercent =
    safeStartWeight - safeCurrentWeight < 0
      ? 0
      : Math.min(
          100,
          ((safeStartWeight - safeCurrentWeight) /
            (safeStartWeight - targetWeight)) *
            100,
        );

  return (
    <div>
      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <StatCard title="Start Weight" value={`${startWeight ?? "-"} kg`} />

        <StatCard title="Current Weight" value={`${currentWeight ?? "-"} kg`} />

        <StatCard title="Total Lost" value={`${totalLost} kg`} />

        <StatCard title="Target Weight" value={`${targetWeight} kg`} />
      </div>

      <div className="mb-4">
        <div className="w-full bg-gray-200 h-6 rounded-full">
          <div
            className="bg-green-500 h-6 rounded-full text-white text-center"
            style={{ width: `${progressPercent}%` }}
          >
            {progressPercent.toFixed(1)}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeightStats;
