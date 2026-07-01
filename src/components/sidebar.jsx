const menuItems = [
  "Dashboard",
  "Klanten",
  "Planning",
  "Offertes",
  "Facturen",
  "Voorraad",
  "Projecten",
  "Boekhouding",
  "Rapportages",
  "AI Assistent",
  "Instellingen",
];

function Sidebar({ activePage, setActivePage }) {
  return (
    <aside className="sidebar">
      <div className="hfLogo">
        <div className="hfLetters">HF</div>
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
