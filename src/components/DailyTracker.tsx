import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import type { Tracker } from "../types/tracker";

// interface Tracker {
//   id: number;
//   date: string;
//   weight: number;
//   calories_burn: number;
//   steps: number;
// }

const DailyTracker = () => {
  const [data, setData] = useState<Tracker[]>([]);
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    date: "",
    weight: "",
    calories_eaten: "",
    exercise_burn: "",
    steps: "",
  });

  // Fetch data from Supabase
  const loadData = async () => {
    const { data, error } = await supabase
      .from("daily_tracker")
      .select("*")
      .order("date", { ascending: false });

    if (!error && data) {
      setData(data);
    }
  };

  const getUserIdFromServer = async () => {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) {
      console.error("Error getting user:", error.message);
      return null;
    }

    if (user) {
      const userId = user.id;
      console.log("User ID:", userId);
      return userId;
    } else {
      console.log("No user signed in");
      return null;
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async () => {
    const user_id = await getUserIdFromServer();
    await supabase.from("daily_tracker").insert([
      {
        date: form.date,
        weight: Number(form.weight),
        calories_eaten: Number(form.calories_eaten),
        exercise_burn: Number(form.exercise_burn),
        steps: Number(form.steps),
        user_id: user_id,
      },
    ]);

    setShowModal(false);

    setForm({
      date: "",
      weight: "",
      calories_eaten: "",
      exercise_burn: "",
      steps: "",
    });

    loadData();
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold">Daily Tracker</h2>

        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          + Add Entry
        </button>
      </div>

      <table className="w-full">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2">Date</th>
            <th className="p-2">Weight</th>
            <th className="p-2">Calories Burned</th>
            <th className="p-2">Calories Eaten</th>
            <th className="p-2">Steps</th>
          </tr>
        </thead>

        <tbody>
          {data.map((d) => (
            <tr key={d.id} className="border-t text-center">
              <td className="p-2">{d.date}</td>
              <td className="p-2">{d.weight} kg</td>
              <td className="p-2">{d.exercise_burn}</td>
              <td className="p-2">{d.calories_eaten}</td>
              <td className="p-2">{d.steps}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-96">
            <h3 className="text-lg font-bold mb-4">Add Entry</h3>

            <input
              type="date"
              className="border w-full p-2 mb-2"
              onChange={(e) => setForm({ ...form, date: e.target.value })}
            />

            <input
              type="number"
              placeholder="Weight"
              className="border w-full p-2 mb-2"
              onChange={(e) => setForm({ ...form, weight: e.target.value })}
            />

            <input
              type="number"
              placeholder="Calories Eaten"
              className="border w-full p-2 mb-2"
              onChange={(e) =>
                setForm({ ...form, calories_eaten: e.target.value })
              }
            />

            <input
              type="number"
              placeholder="Calories Burned"
              className="border w-full p-2 mb-2"
              onChange={(e) =>
                setForm({ ...form, exercise_burn: e.target.value })
              }
            />

            <input
              type="number"
              placeholder="Steps"
              className="border w-full p-2 mb-4"
              onChange={(e) => setForm({ ...form, steps: e.target.value })}
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="border px-3 py-1 rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                className="bg-green-500 text-white px-3 py-1 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DailyTracker;
