import ThemeSwitcher from "../components/ThemeSwitcher";

function Instellingen() {
  return (
    <section className="panel">
      <div className="pageHeader">
        <div>
          <h2>⚙️ Instellingen</h2>
          <p className="empty">Beheer de uitstraling en voorkeuren van HF Office X.</p>
        </div>
      </div>

      <ThemeSwitcher />
    </section>
  );
}

export default Instellingen;
