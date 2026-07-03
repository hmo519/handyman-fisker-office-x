import { useState } from "react";
import logo from "../assets/logo.png";
import SidebarItem from "./ui/SidebarItem";

const menu = [
  { icon: "🏠", label: "Dashboard" },
  { icon: "🔔", label: "Meldingen" },

  { icon: "👥", label: "Klanten" },
  { icon: "📅", label: "Planning" },
  { icon: "📂", label: "Projecten" },
  { icon: "📄", label: "Offertes" },

  { icon: "💰", label: "Financieel Centrum" },
  { icon: "🧾", label: "Facturen" },

  { icon: "🤖", label: "AI Assistent" },
  { icon: "🧠", label: "System Brain" },
  { icon: "⚡", label: "AI Auto Engine" },
  { icon: "🚀", label: "Autopilot" },
  { icon: "📋", label: "Dag Advies" },

  { icon: "🎯", label: "Action Center" },
  { icon: "🏢", label: "Business Autopilot" },
  { icon: "📊", label: "Simulation" },

  { icon: "⚙️", label: "Instellingen" },
];

function Sidebar({ activePage, setActivePage }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="hfLogo">
        <img src={logo} alt="HF Office X" className="logo" />

        {!collapsed && (
          <>
            <div className="hfText">Handyman Fisker</div>
            <div className="hfSub">Office X</div>
          </>
        )}
      </div>

      <button
        className="collapseButton"
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? "➡️" : "⬅️"}
      </button>

      <nav className="menu">
        {menu.map((item) => (
          <SidebarItem
            key={item.label}
            icon={item.icon}
            label={item.label}
            collapsed={collapsed}
            active={activePage === item.label}
            onClick={() => setActivePage(item.label)}
          />
        ))}
      </nav>

      {!collapsed && (
        <div className="userBox">
          <div className="avatar">C</div>

          <div>
            <strong>Christian</strong>
            <span>Eigenaar</span>
            <br />
            <small style={{ color: "#22c55e" }}>● HF Core Online</small>
          </div>
        </div>
      )}
    </aside>
  );
}

export default Sidebar;
