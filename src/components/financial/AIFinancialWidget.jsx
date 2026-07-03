import Card from "../ui/Card";
import { getFinancialBriefing } from "../../services/aiFinancialAdvisor";

function AIFinancialWidget() {
  const briefing = getFinancialBriefing();

  return (
    <Card
      title="🤖 AI Financieel Adviseur"
      subtitle="Digitale CFO van HF Office X"
    >
      {briefing.map((line, index) => (
        <p key={index}>{line}</p>
      ))}
    </Card>
  );
}

export default AIFinancialWidget;
