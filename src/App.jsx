import { useState } from "react";

import Sidebar from "./components/sidebar";
import Header from "./components/header";

/* CORE */
import Dashboard from "./pages/dashboard";
import Klanten from "./pages/klanten";
import Planning from "./pages/planning";
import Projecten from "./pages/projecten";
import Offertes from "./pages/offertes";
import Facturen from "./pages/facturen";

/* AI LAYER */
import AiAssistant from "./pages/aiassistant";
import AiActions from "./pages/aiactions";
import Autopilot from "./pages/autopilot";
import DagAdvies from "./pages/dagadvies";
import SystemBrain from "./pages/systembrain";

/* ADVANCED SYSTEMS */
import BusinessAutopilot from "./pages/businessautopilot";
import ActionCenter from "./pages/actioncenter";
import Simulation from "./pages/simulation";

import "./App.css";

function App() {
  const [activePage, setActivePage] = useState("Dashboard");

  function renderPage() {
    switch (activePage) {
      /* CORE */
      case "Dashboard":
        return <Dashboard />;

      case "Klanten":
        return <Klanten />;

      case "Planning":
        return <Planning />;

      case "Projecten":
        return <Projecten />;

      case "Offertes":
        return <Offertes />;

      case "Facturen":
        return <Facturen />;

      /* AI */
      case "AI Assistent":
        return <AiAssistant />;

      case "AI Auto Engine":
        return <AiActions />;

      case "Autopilot":
        return <Autopilot />;

      case "Dag Advies":
        return <DagAdvies />;

      case "System Brain":
        return <SystemBrain />;

      /* ADVANCED */
      case "Business Autopilot":
        return <BusinessAutopilot />;

      case "Action Center":
        return <ActionCenter />;

      case "Simulation":
        return <Simulation />;

      default:
        return (
          <section className="panel">
            <h2>{activePage}</h2>
            <p className="empty">
              Module wordt nog gebouwd 🚀
            </p>
          </section>
        );
    }
  }

  return (
    <div className="dashboard">
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
      />

      <main className="content">
        <Header activePage={activePage} />
        {renderPage()}
      </main>
    </div>
  );
}

export default App;
