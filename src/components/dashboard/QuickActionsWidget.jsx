import Card from "../ui/Card";
import Button from "../ui/Button";

function QuickActionsWidget({ onNavigate }) {
  return (
    <Card
      title="⚡ Snelle Acties"
      subtitle="Start direct een veelgebruikte actie"
    >
      <div className="quickActionsGrid">
        <Button type="primary" onClick={() => onNavigate("Klanten")}>
          👥 Nieuwe Klant
        </Button>

        <Button type="primary" onClick={() => onNavigate("Projecten")}>
          📂 Nieuw Project
        </Button>

        <Button type="success" onClick={() => onNavigate("Facturen")}>
          🧾 Nieuwe Factuur
        </Button>

        <Button type="secondary" onClick={() => onNavigate("Offertes")}>
          📄 Nieuwe Offerte
        </Button>
      </div>
    </Card>
  );
}

export default QuickActionsWidget;
