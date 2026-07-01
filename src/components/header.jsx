function Header({ activePage }) {
  return (
    <header className="topbar">
      <div>
        <p className="eyebrow">Welkom terug, Christian 👋</p>
        <h1>{activePage}</h1>
      </div>

      <div className="topInfo">
        <span>🔔 3 meldingen</span>
        <span className="version">v0.8 Smart</span>
      </div>
    </header>
  );
}

export default Header;
