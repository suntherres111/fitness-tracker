import { useEffect } from "react";
// import { supabase } from "../lib/supabaseClient";
import type { Tracker } from "../types/tracker";

const maintenance = 2600;
interface Props {
  entriesData: Tracker[];
  refreshData: () => void;
}

const CalorieDeficit = ({ entriesData, refreshData }: Props) => {
  // const [deficit, setDeficit] = useState(0);
  const totalBurn = entriesData.reduce((sum, d) => sum + d.exercise_burn, 0);

  const deficit = maintenance - 1600 + totalBurn / entriesData.length;

  // setDeficit(dailyDeficit);
  useEffect(() => {
    refreshData();
  }, []);

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-2">Avg Daily Deficit</h2>

      <p className="text-yellow-500 text-2xl font-bold">
        {Math.round(deficit)} kcal
      </p>
    </div>
  );
};

export default CalorieDeficit;
