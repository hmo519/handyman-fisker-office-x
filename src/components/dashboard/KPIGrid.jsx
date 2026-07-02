import StatCard from "../ui/StatCard";

function KPIGrid({ data, forecast }) {
  return (
    <div className="stats">
      <StatCard
        icon="💰"
        title="Omzet"
        value={`€${data.totalRevenue.toFixed(2)}`}
        subtitle={`Groei: €${forecast.growth.toFixed(2)}`}
      />

      <StatCard
        icon="👥"
        title="Klanten"
        value={data.customers.length}
        subtitle="CRM Database"
      />

      <StatCard
        icon="📂"
        title="Projecten"
        value={data.projects.length}
        subtitle={`${data.emptyProjects.length} zonder taken`}
      />

      <StatCard
        icon="🧾"
        title="Facturen"
        value={data.invoices.length}
        subtitle="Automatisch gekoppeld"
      />
    </div>
  );
}

export default KPIGrid;
