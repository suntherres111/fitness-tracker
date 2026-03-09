import React from "react";
import DashboardCard from "./components/DashboardCard";
import ProgressChart from "./components/ProgressChart";
import DailyTracker from "./components/DailyTracker";
import CalorieCalculator from "./components/CalorieCalculator";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">30 Day Fat Loss Dashboard</h1>

        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <DashboardCard title="Start Weight" value="125 kg" />
          <DashboardCard title="Target Weight" value="110 kg" />
          <DashboardCard title="Daily Calories" value="1500–1700" />
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <ProgressChart />
          <CalorieCalculator />
        </div>

        <DailyTracker />
      </div>
    </div>
  );
}

export default App;
