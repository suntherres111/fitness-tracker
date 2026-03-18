import { supabase } from "../lib/supabaseClient";

import DailyTracker from "./DailyTracker";
import ProgressChart from "./ProgressChart";
import WeeklyAnalytics from "./WeeklyAnalytics";
import CalorieDeficit from "./CalorieDeficit";
import WeightStats from "./WeightStats";
import GoalProjection from "./GoalProjection";
import CalorieEatenChart from "./CalorieEatenChart";
import { useEffect, useState } from "react";
import type { Tracker } from "../types/tracker";

const Dashboard = () => {
  const [dailyTrackers, setDailyTrackers] = useState<Tracker[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string>("");

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };
  const fetchEntries = async () => {
    try {
      if (userId) {
        const { data, error } = await supabase
          .from("daily_tracker")
          .select("*")
          .eq("user_id", userId)
          .order("date", { ascending: true });

        if (!error && data) {
          setDailyTrackers(data);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const init = async () => {
    const { data } = await supabase.auth.getSession();
    const user = data?.session?.user;
    if (user) {
      setUserId(user.id);
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    if (!userId) return;
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        const { data, error } = await supabase
          .from("daily_tracker")
          .select("*")
          .eq("user_id", userId)
          .order("date", { ascending: true });

        if (!error && data) {
          setDailyTrackers(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [userId]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <img
            src="/assets/images/fitness_tracker Logo.jpg"
            className="w-16 animate-pulse"
          />

          <p className="text-gray-500 text-sm">Loading dashboard...</p>
        </div>
      </div>
    );
  } else {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}

          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center">
              <img
                src="assets/images/fitness_tracker Logo_v2.jpg" // or {logo} if imported
                alt="Fitness Tracker Logo"
                className="h-12 w-12 mr-3"
              />
              <h1 className="text-3xl font-bold">Fitness Tracker Dashboard</h1>
            </div>

            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Logout
            </button>
          </div>

          {/* Summary Cards */}

          <WeightStats entriesData={dailyTrackers} refreshData={fetchEntries} />

          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <WeeklyAnalytics
              entriesData={dailyTrackers}
              refreshData={fetchEntries}
            />
            <CalorieDeficit
              entriesData={dailyTrackers}
              refreshData={fetchEntries}
            />
            <GoalProjection
              entriesData={dailyTrackers}
              refreshData={fetchEntries}
            />
          </div>

          {/* Weight Chart */}

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <ProgressChart
              entriesData={dailyTrackers}
              refreshData={fetchEntries}
            />
            <CalorieEatenChart
              entriesData={dailyTrackers}
              refreshData={fetchEntries}
            />
          </div>

          {/* Daily Tracker */}

          <DailyTracker
            entriesData={dailyTrackers}
            user_id={userId}
            refreshData={fetchEntries}
            loading={loading}
          />
        </div>
      </div>
    );
  }
};

export default Dashboard;
