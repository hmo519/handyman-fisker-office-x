import logo from "../assets/logo.png";

const menuItems = [
  "Dashboard",
  "Meldingen",

  "Klanten",
  "Planning",
  "Projecten",
  "Offertes",
  "Facturen",

  "AI Assistent",
  "AI Auto Engine",
  "Autopilot",
  "Dag Advies",
  "System Brain",

  "Action Center",
  "Business Autopilot",
  "Simulation",

  "Instellingen",
];

function Sidebar({ activePage, setActivePage }) {
  return (
    <aside className="sidebar">
      <div className="hfLogo">
        <img src={logo} alt="HF Office X" className="logo" />
        <div className="hfText">Handyman Fisker</div>
        <div className="hfSub">Office X</div>
      </div>

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
