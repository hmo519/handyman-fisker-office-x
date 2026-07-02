import Card from "../ui/Card";

function RevenueChartWidget() {
  const months = [
    { month: "Jan", value: 35 },
    { month: "Feb", value: 52 },
    { month: "Mrt", value: 64 },
    { month: "Apr", value: 48 },
    { month: "Mei", value: 82 },
    { month: "Jun", value: 95 },
  ];

  return (
    <Card
      title="📈 Omzetontwikkeling"
      subtitle="Demo - straks gekoppeld aan echte facturen"
    >
      <div className="revenueChart">
        {months.map((item) => (
          <div className="chartColumn" key={item.month}>
            <div
              className="chartBar"
              style={{ height: `${item.value}%` }}
            ></div>

            <span>{item.month}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default RevenueChartWidget;
