import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

const maintenance = 2600;

const CalorieDeficit = () => {
  const [deficit, setDeficit] = useState(0);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("daily_tracker")
        .select("exercise_burn");

      if (!data) return;

      const totalBurn = data.reduce((sum, d) => sum + d.exercise_burn, 0);

      const dailyDeficit = maintenance - 1600 + totalBurn / data.length;

      setDeficit(dailyDeficit);
    };

    load();
  }, []);

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-2">Avg Daily Deficit</h2>

      <p className="text-2xl font-bold">{Math.round(deficit)} kcal</p>
    </div>
  );
};

export default CalorieDeficit;
