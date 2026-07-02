import { createContext, useContext, useEffect, useState } from "react";

import { getHFDashboard, runMorningRoutine } from "../services/hfCore";
import { getNotifications } from "../services/notificationService";

const AppStateContext = createContext();

export function AppStateProvider({ children }) {
  const [dashboard, setDashboard] = useState(() => getHFDashboard());
  const [notifications, setNotifications] = useState(() => getNotifications());
  const [lastAction, setLastAction] = useState("");

  function refresh() {
    setDashboard(getHFDashboard());
    setNotifications(getNotifications());
  }

  function runAI() {
    const result = runMorningRoutine();

    refresh();

    setLastAction(result.message);

    alert(`🤖 ${result.message}`);
  }

  useEffect(() => {
    refresh();
  }, []);

  return (
    <AppStateContext.Provider
      value={{
        dashboard,
        notifications,
        lastAction,
        refresh,
        runAI,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  return useContext(AppStateContext);
}
