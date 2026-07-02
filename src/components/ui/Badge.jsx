function Badge({ status }) {
  const colors = {
    Nieuw: "#3b82f6",
    Lead: "#8b5cf6",
    Gepland: "#f59e0b",
    "In uitvoering": "#10b981",
    Afgerond: "#22c55e",
    Betaald: "#16a34a",
    Open: "#ef4444",
    Concept: "#64748b",
  };

  return (
    <span
      className="hfBadge"
      style={{
        backgroundColor: colors[status] || "#334155",
      }}
    >
      {status}
    </span>
  );
}

export default Badge;
