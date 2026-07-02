import Card from "../ui/Card";
import Button from "../ui/Button";

function AICeoWidget({
  title,
  message,
  priority,
  onRefresh,
  onRunAI,
}) {
  return (
    <Card
      title="🤖 HF AI CEO"
      subtitle="Jouw digitale bedrijfsmanager"
      actions={
        <>
          <Button type="secondary" onClick={onRefresh}>
            🔄 Vernieuwen
          </Button>

          <Button type="success" onClick={onRunAI}>
            ⚡ AI Uitvoeren
          </Button>
        </>
      }
    >
      <h3>{title}</h3>

      <p>{message}</p>

      <strong>Prioriteit:</strong> {priority}
    </Card>
  );
}

export default AICeoWidget;
