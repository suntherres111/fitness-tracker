import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";
import type { TrackerForm } from "../types/trackerForm";
import type { Tracker } from "../types/tracker";
import {
  FaCalendarDay,
  FaDrumstickBite,
  FaFire,
  FaNoteSticky,
  FaPersonWalking,
  FaWeightScale,
} from "react-icons/fa6";

// interface TrackerForm {
//   date: string;
//   calories_eaten: number;
//   exercise_burn: number;
//   steps: number;
//   weight: number;
//   notes: string;
// }

const emptyForm: TrackerForm = {
  date: "",
  calories_eaten: 0,
  exercise_burn: 0,
  steps: 0,
  weight: 0,
  notes: "",
};

const DailyTracker = () => {
  const [entries, setEntries] = useState<Tracker[]>([]);
  const [form, setForm] = useState<TrackerForm>(emptyForm);

  const [showModal, setShowModal] = useState(false);
  const [editingEntry, setEditingEntry] = useState<Tracker | null>(null);

  const [userId, setUserId] = useState<string>("");

  const loadEntries = async (uid?: string) => {
    const id = uid || userId;

    const { data } = await supabase
      .from("daily_tracker")
      .select("*")
      .eq("user_id", id)
      .order("date", { ascending: false });

    if (data) setEntries(data as Tracker[]);
  };

  const init = async () => {
    const { data } = await supabase.auth.getUser();

    const user = data?.user;

    if (!user) return;

    setUserId(user.id);

    loadEntries(user.id);
  };

  useEffect(() => {
    init();
  }, []);

  const openAddModal = () => {
    setEditingEntry(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEditModal = (entry: Tracker) => {
    setEditingEntry(entry);

    const { date, calories_eaten, exercise_burn, steps, weight, notes } = entry;

    setForm({
      date,
      calories_eaten,
      exercise_burn,
      steps,
      weight,
      notes,
    });

    setShowModal(true);
  };

  const saveEntry = async () => {
    if (editingEntry) {
      await supabase
        .from("daily_tracker")
        .update({
          ...form,
          user_id: userId,
        })
        .eq("id", editingEntry.id);
    } else {
      await supabase.from("daily_tracker").insert([
        {
          ...form,
          user_id: userId,
        },
      ]);
    }

    setShowModal(false);
    setEditingEntry(null);

    loadEntries();
  };

  const deleteEntry = async (id: number) => {
    const confirmDelete = window.confirm("Delete this entry?");

    if (!confirmDelete) return;

    await supabase
      .from("daily_tracker")
      .delete()
      .eq("id", id)
      .eq("user_id", userId);

    loadEntries();
  };

  const updateField = <K extends keyof TrackerForm>(
    field: K,
    value: TrackerForm[K],
  ) => {
    setForm({ ...form, [field]: value });
  };

  return (
    <div className="mt-6">
      {/* HEADER */}

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Daily Tracker</h2>

        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded"
        >
          <FiPlus />
          Add Entry
        </button>
      </div>

      {/* TABLE */}

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Calories</th>
              <th className="px-6 py-3">Burn</th>
              <th className="px-6 py-3">Steps</th>
              <th className="px-6 py-3">Weight</th>
              <th className="px-6 py-3">Notes</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {entries.map((entry) => (
              <tr key={entry.id} className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4">{entry.date}</td>
                <td className="px-6 py-4">{entry.calories_eaten}</td>
                <td className="px-6 py-4">{entry.exercise_burn}</td>
                <td className="px-6 py-4">{entry.steps}</td>
                <td className="px-6 py-4">{entry.weight}</td>
                <td className="px-6 py-4">{entry.notes}</td>

                <td className="px-6 py-4 flex gap-3">
                  <button
                    onClick={() => openEditModal(entry)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <FiEdit size={18} />
                  </button>

                  <button
                    onClick={() => deleteEntry(entry.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">
              {editingEntry ? "Edit Entry" : "Add Entry"}
            </h3>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="flex items-center text-sm font-medium text-gray-600">
                  Date <FaCalendarDay size={20} className="pl-1" />
                </label>
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => updateField("date", e.target.value)}
                  className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-1">
                <label className="flex items-center text-sm font-medium text-gray-600">
                  Calories Eaten <FaDrumstickBite size={20} className="pl-1" />
                </label>
                <input
                  type="number"
                  value={form.calories_eaten}
                  onChange={(e) =>
                    updateField("calories_eaten", Number(e.target.value))
                  }
                  className="w-full border rounded-lg p-3"
                />
              </div>

              <div className="space-y-1">
                <label className="flex items-center text-sm font-medium text-gray-600">
                  Calories Burn <FaFire size={20} className="pl-1" />
                </label>
                <input
                  type="number"
                  value={form.exercise_burn}
                  onChange={(e) =>
                    updateField("exercise_burn", Number(e.target.value))
                  }
                  className="w-full border rounded-lg p-3"
                />
              </div>

              <div className="space-y-1">
                <label className="flex items-center text-sm font-medium text-gray-600">
                  Steps <FaPersonWalking size={20} className="pl-1" />
                </label>
                <input
                  type="number"
                  value={form.steps}
                  onChange={(e) => updateField("steps", Number(e.target.value))}
                  className="w-full border rounded-lg p-3"
                />
              </div>

              <div className="space-y-1">
                <label className="flex items-center text-sm font-medium text-gray-600">
                  Weight (kg) <FaWeightScale size={20} className="pl-1" />
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={form.weight}
                  onChange={(e) =>
                    updateField("weight", Number(e.target.value))
                  }
                  className="w-full border rounded-lg p-3"
                />
              </div>

              <div className="space-y-1">
                <label className="flex items-center text-sm font-medium text-gray-600">
                  Notes <FaNoteSticky size={20} className="pl-1" />
                </label>
                <textarea
                  value={form.notes}
                  onChange={(e) => updateField("notes", e.target.value)}
                  className="w-full border rounded-lg p-3"
                  rows={3}
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>

              <button
                onClick={saveEntry}
                className="bg-blue-600 text-white px-4 py-2 rounded"
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
