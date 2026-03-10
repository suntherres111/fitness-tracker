import { supabase } from "../lib/supabaseClient";

import DailyTracker from "./DailyTracker";
import ProgressChart from "./ProgressChart";
import WeeklyAnalytics from "./WeeklyAnalytics";
import CalorieDeficit from "./CalorieDeficit";
import WeightStats from "./WeightStats";

const Dashboard = () => {
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Fat Loss Dashboard</h1>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>

        {/* Summary Cards */}
        <WeightStats />
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <WeeklyAnalytics />
          <CalorieDeficit />
        </div>

        {/* Weight Chart */}

        <div className="mb-6">
          <ProgressChart />
        </div>

        {/* Daily Tracker */}

        <DailyTracker />
      </div>
    </div>
  );
};

export default Dashboard;
