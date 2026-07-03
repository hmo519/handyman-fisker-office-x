import Card from "../ui/Card";
import { getAiPriorities } from "../../services/aiDecisionEngine";

function AIPrioritiesWidget() {
  const priorities = getAiPriorities();

  return (
    <Card title="🎯 AI Prioriteiten" subtitle="Wat heeft nu aandacht nodig?">
      {priorities.map((priority, index) => (
        <div key={index} className="noteItem">
          <strong>
            {priority.level === "Hoog" && "🔴 "}
            {priority.level === "Middel" && "🟡 "}
            {priority.level === "Laag" && "🟢 "}
            {priority.title}
          </strong>

          <p>{priority.message}</p>

          <small>Impact: {priority.impact}</small>
        </div>
      ))}
    </Card>
  );
}

export default AIPrioritiesWidget;
