import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import StatCard from "./StatCard";
import ProgressCard from "./ProgressBarCard";

const targetWeight = 110;

const WeightStats = () => {
  const [startWeight, setStartWeight] = useState<number | null>(null);
  const [currentWeight, setCurrentWeight] = useState<number | null>(null);
  const [personalBestWeight, setPersonalBestWeight] = useState<number | null>(
    null,
  );

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("daily_tracker")
        .select("weight,date")
        .order("date", { ascending: true });

      if (!data || data.length === 0) return;

      const first = data[0].weight;
      const last = data[data.length - 1].weight;
      const weights: number[] = data.map((m) => m.weight);
      const personalBest = Math.min(...weights);

      setStartWeight(first);
      setCurrentWeight(last);
      setPersonalBestWeight(personalBest);
    };

    load();
  }, []);
  // Safe values fallback
  const safeStartWeight = startWeight ?? targetWeight; // fallback if null
  const safeCurrentWeight = currentWeight ?? safeStartWeight;

  const totalLost =
    startWeight && currentWeight ? (startWeight - currentWeight).toFixed(1) : 0;

  return (
    <div>
      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <StatCard title="Start Weight" value={`${startWeight ?? "-"} kg`} />
        <StatCard title="Current Weight" value={`${currentWeight ?? "-"} kg`} />
        <StatCard title="Total Lost" value={`${totalLost} kg`} />
        <StatCard title="Target Weight" value={`${targetWeight} kg`} />
      </div>
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <StatCard title="Personal Best" value={`${personalBestWeight} kg`} />
        <ProgressCard
          startWeight={safeStartWeight}
          currentWeight={safeCurrentWeight}
          targetWeight={targetWeight}
        />
      </div>
    </div>
  );
};

export default WeightStats;
