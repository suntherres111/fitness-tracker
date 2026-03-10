import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

const WeeklyAnalytics = () => {
  const [loss, setLoss] = useState(0);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("daily_tracker")
        .select("weight,date")
        .order("date");

      if (!data || data.length < 2) return;

      const first = data[0].weight;
      const last = data[data.length - 1].weight;

      setLoss(first - last);
    };

    load();
  }, []);

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-2">Weekly Fat Loss</h2>

      <p className="text-2xl font-bold text-green-600">
        {loss.toFixed(2)} kg lost
      </p>
    </div>
  );
};

export default WeeklyAnalytics;
