import Card from "../ui/Card";
import { getLiveBriefing } from "../../services/aiCeoEngine";

function AICeoLiveWidget() {
  const briefing = getLiveBriefing();

  return (
    <Card
      title="🤖 AI CEO Live Briefing"
      subtitle="Dagelijkse bedrijfsbriefing van HF Office X"
    >
      {briefing.map((line, index) => (
        <p key={index}>{line}</p>
      ))}
    </Card>
  );
}

export default AICeoLiveWidget;
