import logo from "../assets/logo.png";

const menuItems = [
  "Dashboard",

  "Klanten",
  "Planning",
  "Projecten",
  "Offertes",
  "Facturen",

  /* AI LAYER */
  "AI Assistent",
  "AI Auto Engine",
  "Autopilot",
  "Dag Advies",
  "System Brain",

  /* ADVANCED */
  "Action Center",
  "Business Autopilot",
  "Simulation",

  "Instellingen",
];

function Sidebar({ activePage, setActivePage }) {
  return (
    <aside className="sidebar">

      {/* LOGO */}
      <div className="hfLogo">
        <img src={logo} alt="HF Office X" className="logo" />
        <div className="hfText">Handyman Fisker</div>
        <div className="hfSub">Office X</div>
      </div>

      {/* MENU */}
      <nav className="menu">
        {menuItems.map((item) => (
          <button
            key={item}
            onClick={() => setActivePage(item)}
            className={activePage === item ? "active" : ""}
          >
            {item}
          </button>
        ))}
      </nav>

      {/* USER */}
      <div className="userBox">
        <div className="avatar">C</div>
        <div>
          <strong>Christian</strong>
          <span>Eigenaar</span>
        </div>
      </div>

    </aside>
  );
}

export default Sidebar;
