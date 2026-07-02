import Card from "../ui/Card";
import Button from "../ui/Button";

function QuickActionsWidget() {
  return (
    <Card
      title="⚡ Snelle Acties"
      subtitle="Start direct een veelgebruikte actie"
    >
      <div className="quickActionsGrid">
        <Button type="primary">👥 Nieuwe Klant</Button>
        <Button type="primary">📂 Nieuw Project</Button>
        <Button type="success">🧾 Nieuwe Factuur</Button>
        <Button type="secondary">📄 Nieuwe Offerte</Button>
      </div>
    </Card>
  );
}

export default QuickActionsWidget;
