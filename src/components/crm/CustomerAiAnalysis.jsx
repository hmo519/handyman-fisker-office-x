import Card from "../ui/Card";
import { getCustomerAiAnalysis } from "../../services/customerAiService";

function CustomerAiAnalysis({ customer }) {
  const analysis = getCustomerAiAnalysis(customer);

  return (
    <Card title="🤖 AI Klantanalyse" subtitle={analysis.label}>
      <h2>{analysis.score}/100</h2>

      <div className="healthBar">
        <div
          className="healthFill"
          style={{ width: `${analysis.score}%` }}
        ></div>
      </div>

      {analysis.points.map((point, index) => (
        <p key={index}>{point}</p>
      ))}

      <div className="aiCustomerNote">
        <h4>💡 AI Advies</h4>
        <p>{analysis.advice}</p>
      </div>
    </Card>
  );
}

export default CustomerAiAnalysis;
