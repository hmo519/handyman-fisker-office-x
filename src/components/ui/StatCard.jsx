function StatCard({ icon, title, value, subtitle }) {
  return (
    <div className="statCard">
      <div className="statCardIcon">{icon}</div>

      <div>
        <span>{title}</span>
        <h2>{value}</h2>
        <p>{subtitle}</p>
      </div>
    </div>
  );
}

export default StatCard;
