import { useEffect, useState } from "react";
import { supabase } from "./lib/supabaseClient";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

function App() {
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  if (!session) return <Login />;

  return <Dashboard />;
}

export default App;
