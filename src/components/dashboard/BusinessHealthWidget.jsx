import Card from "../ui/Card";

function BusinessHealthWidget({ health, data }) {
  let score = 100;

  if (data.customers.length === 0) score -= 25;
  if (data.projects.length === 0) score -= 25;
  if (data.todayPlanning.length === 0) score -= 20;
  if (data.invoices.length === 0) score -= 15;
  if (data.emptyProjects.length > 0) score -= 10;

  if (score < 0) score = 0;

  return (
    <Card title="❤️ Business Health" subtitle="AI bedrijfsgezondheid">
      <h2>{score}/100</h2>

      <div className="healthBar">
        <div
          className="healthFill"
          style={{ width: `${score}%` }}
        ></div>
      </div>

      <p>{health}</p>
    </Card>
  );
}

export default BusinessHealthWidget;
