import { useEffect, useState } from "react";
import StatCard from "./StatCard";
import ProgressCard from "./ProgressBarCard";
import type { Tracker } from "../types/tracker";

const targetWeight = 110;
interface Props {
  entriesData: Tracker[];
  refreshData: () => void;
}

const WeightStats = ({ entriesData, refreshData }: Props) => {
  const [startWeight, setStartWeight] = useState<number | null>(null);
  const [currentWeight, setCurrentWeight] = useState<number | null>(null);
  const [personalBestWeight, setPersonalBestWeight] = useState<number | null>(
    null,
  );
  // const startWeight = entriesData[0].weight;
  // const currentWeight = entriesData[entriesData.length - 1].weight;
  // const weights: number[] = entriesData.map((m) => m.weight);
  // const personalBestWeight =Math.min(...weights);

  useEffect(() => {
    const load = async () => {
      const first = entriesData[0].weight;
      const last = entriesData[entriesData.length - 1].weight;
      const weights: number[] = entriesData.map((m) => m.weight);
      const personalBest = Math.min(...weights);

      setStartWeight(first);
      setCurrentWeight(last);
      setPersonalBestWeight(personalBest);
    };

    load();
    refreshData();
  }, []);
  // Safe values fallback
  const safeStartWeight = startWeight ?? targetWeight; // fallback if null
  const safeCurrentWeight = currentWeight ?? safeStartWeight;

  const totalLost =
    startWeight && currentWeight ? (startWeight - currentWeight).toFixed(1) : 0;

  return (
    <div>
      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Start Weight"
          value={`${startWeight ?? "-"} kg`}
          valueTextColor="slate"
        />
        <StatCard
          title="Current Weight"
          value={`${currentWeight ?? "-"} kg`}
          valueTextColor="amber"
        />
        <StatCard
          title="Total Lost"
          value={`${totalLost} kg`}
          valueTextColor="emerald"
        />
        <StatCard
          title="Target Weight"
          value={`${targetWeight} kg`}
          valueTextColor="blue"
        />
      </div>
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <StatCard
          title="Personal Best"
          value={`${personalBestWeight} kg`}
          valueTextColor="teal"
        />
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
