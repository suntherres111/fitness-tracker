import { useState } from "react";

const CalorieCalculator = () => {
  const [calories, setCalories] = useState(1600);

  const maintenance = 2600;
  const deficit = maintenance - calories;
  const weeklyLoss = ((deficit * 7) / 7700).toFixed(2);

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h2 className="text-xl font-bold mb-4">Calorie Deficit Calculator</h2>

      <input
        type="number"
        value={calories}
        onChange={(e) => setCalories(Number(e.target.value))}
        className="border rounded px-3 py-2 w-full mb-4"
      />

      <p>
        Daily Deficit: <b>{deficit} kcal</b>
      </p>
      <p>
        Estimated Weekly Fat Loss: <b>{weeklyLoss} kg</b>
      </p>
    </div>
  );
};

export default CalorieCalculator;
