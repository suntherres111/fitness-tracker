// src/components/DailyTracker.tsx
import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { type Tracker } from "../types/tracker";

const DailyTracker: React.FC = () => {
  const [trackers, setTrackers] = useState<Tracker[]>([]);

  // Prefill 30 days if no data exists
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase
        .from("daily_tracker")
        .select("*")
        .order("date");

      if (!data || data.length === 0) {
        const today = new Date();
        const prefill: Tracker[] = Array.from({ length: 30 }, (_, i) => ({
          id: i + 1,
          date: new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate() + i,
          )
            .toISOString()
            .split("T")[0],
          calories_eaten: undefined,
          exercise_burn: undefined,
          steps: undefined,
          weight: undefined,
          notes: "",
        }));
        setTrackers(prefill);
      } else {
        const today = new Date();
        const prefill: Tracker[] = Array.from(
          { length: 30 - data.length },
          (_, i) => ({
            id: i + 1,
            date: new Date(
              today.getFullYear(),
              today.getMonth(),
              today.getDate() + i,
            )
              .toISOString()
              .split("T")[0],
            calories_eaten: undefined,
            exercise_burn: undefined,
            steps: undefined,
            weight: undefined,
            notes: "",
          }),
        );
        var newData = [...data, ...prefill];
        setTrackers(newData);
        console.log(newData);
      }
    };

    fetchData();
  }, []);

  // Handle input changes
  const handleChange = (
    id: number,
    field: keyof Tracker,
    value: string | number,
  ) => {
    setTrackers((prev) =>
      prev.map((t) => (t.id === id ? { ...t, [field]: value } : t)),
    );
  };

  // Save single tracker row to Supabase
  const handleSave = async (tracker: Tracker) => {
    try {
      const { error } = await supabase
        .from("daily_tracker")
        .upsert([tracker], { onConflict: "id" }); // ✅ array for onConflict
      if (error) throw error;
      alert("Saved!");
    } catch (err) {
      console.error(err);
      alert("Failed to save. Check console.");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h2 className="text-xl font-bold mb-4">Daily Tracker</h2>

      <div className="overflow-auto">
        <table className="min-w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2">Day</th>
              <th className="p-2">Calories Eaten</th>
              <th className="p-2">Exercise Burn</th>
              <th className="p-2">Steps</th>
              <th className="p-2">Weight</th>
              <th className="p-2">Notes</th>
              <th className="p-2">Save</th>
            </tr>
          </thead>
          <tbody>
            {trackers.map((t, i) => (
              <tr key={t.id} className="border-t">
                <td className="p-2">{i + 1}</td>
                <td className="p-2">
                  <input
                    type="number"
                    value={t.calories_eaten ?? ""}
                    onChange={(e) =>
                      handleChange(
                        t.id,
                        "calories_eaten",
                        Number(e.target.value),
                      )
                    }
                    className="border rounded px-2 py-1 w-full"
                  />
                </td>
                <td className="p-2">
                  <input
                    type="number"
                    value={t.exercise_burn ?? ""}
                    onChange={(e) =>
                      handleChange(
                        t.id,
                        "exercise_burn",
                        Number(e.target.value),
                      )
                    }
                    className="border rounded px-2 py-1 w-full"
                  />
                </td>
                <td className="p-2">
                  <input
                    type="number"
                    value={t.steps ?? ""}
                    onChange={(e) =>
                      handleChange(t.id, "steps", Number(e.target.value))
                    }
                    className="border rounded px-2 py-1 w-full"
                  />
                </td>
                <td className="p-2">
                  <input
                    type="number"
                    value={t.weight ?? ""}
                    onChange={(e) =>
                      handleChange(t.id, "weight", Number(e.target.value))
                    }
                    className="border rounded px-2 py-1 w-full"
                  />
                </td>
                <td className="p-2">
                  <input
                    type="text"
                    value={t.notes ?? ""}
                    onChange={(e) =>
                      handleChange(t.id, "notes", e.target.value)
                    }
                    className="border rounded px-2 py-1 w-full"
                  />
                </td>
                <td className="p-2">
                  <button
                    onClick={() => handleSave(t)}
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    Save
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DailyTracker;
