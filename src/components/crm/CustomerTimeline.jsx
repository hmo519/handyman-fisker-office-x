import Card from "../ui/Card";
import { getCustomerTimeline } from "../../services/customerTimelineService";

function CustomerTimeline({ customer }) {
  const timeline = getCustomerTimeline(customer);

  return (
    <Card title="📜 Tijdlijn" subtitle="Volledige klantgeschiedenis">
      {timeline.length === 0 ? (
        <p className="empty">Geen gebeurtenissen gevonden.</p>
      ) : (
        timeline.map((item, index) => (
          <div className="noteItem" key={index}>
            <strong>
              {item.icon} {item.title}
            </strong>

            <p>{item.description}</p>
            <small>{item.date}</small>
          </div>
        ))
      )}
    </Card>
  );
}

export default CustomerTimeline;
