import { Auth } from "@supabase/auth-ui-react";
import { supabase } from "../lib/supabaseClient";

const Login = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow w-96">
        <h1 className="text-xl font-bold mb-4 text-center">
          Fat Loss Tracker Login
        </h1>

        <Auth supabaseClient={supabase} providers={[]} />
      </div>
    </div>
  );
};

export default Login;
