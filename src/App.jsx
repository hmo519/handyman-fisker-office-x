import { useState } from "react";
import Sidebar from "./components/sidebar";
import Header from "./components/header";
import Dashboard from "./pages/dashboard";
import Klanten from "./pages/klanten";
import Planning from "./pages/planning";
import Offertes from "./pages/offertes";
import Facturen from "./pages/facturen";
import Projecten from "./pages/projecten";
import "./App.css";

function App() {
  const [activePage, setActivePage] = useState("Dashboard");

  function renderPage() {
    if (activePage === "Dashboard") return <Dashboard />;
    if (activePage === "Klanten") return <Klanten />;
    if (activePage === "Planning") return <Planning />;
    if (activePage === "Offertes") return <Offertes />;
    if (activePage === "Facturen") return <Facturen />;
    if (activePage === "Projecten") return <Projecten />;

    return (
      <section className="panel">
        <h2>{activePage}</h2>
        <p className="empty">Deze module bouwen we straks verder uit.</p>
      </section>
    );
  }

  return (
    <div className="dashboard">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />

      <main className="content">
        <Header activePage={activePage} />
        {renderPage()}
      </main>
    </div>
  );
}

export default App;
