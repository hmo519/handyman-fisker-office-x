import Card from "../components/ui/Card";
import StatCard from "../components/ui/StatCard";
import AIFinancialWidget from "../components/financial/AIFinancialWidget";
import {
  getFinancialData,
  getFinancialHealth,
  getVatAdvice,
  getCurrentQuarterVat,
} from "../services/financialService";

function FinancieelCentrum() {
  const finance = getFinancialData();
  const quarterVat = getCurrentQuarterVat();

  function showQuarterVat() {
    alert(
      `BTW aangifte Q${quarterVat.quarter} ${quarterVat.year}\n\n` +
        `Omzet incl. BTW: €${quarterVat.revenue.toFixed(2)}\n` +
        `Omzet excl. BTW: €${quarterVat.subtotal.toFixed(2)}\n` +
        `BTW af te dragen: €${quarterVat.vat.toFixed(2)}\n` +
        `Aantal facturen: ${quarterVat.invoices.length}`
    );
  }

  return (
    <section className="panel">
      <div className="pageHeader">
        <div>
          <h2>💰 Financieel Centrum</h2>
          <p className="empty">
            Omzet, BTW, openstaande facturen en winst in één overzicht.
          </p>
        </div>
      </div>

      <AIFinancialWidget />

      <div className="stats">
        <StatCard
          icon="💰"
          title="Totale omzet"
          value={`€${finance.totalRevenue.toFixed(2)}`}
          subtitle="Inclusief BTW"
        />

        <StatCard
          icon="🧾"
          title="BTW ontvangen"
          value={`€${finance.totalVat.toFixed(2)}`}
          subtitle="Te reserveren"
        />

        <StatCard
          icon="📬"
          title="Openstaand"
          value={`€${finance.openAmount.toFixed(2)}`}
          subtitle={`${finance.openInvoices.length} facturen`}
        />

        <StatCard
          icon="📈"
          title="Geschatte winst"
          value={`€${finance.estimatedProfit.toFixed(2)}`}
          subtitle="Na geschatte kosten"
        />
      </div>

      <div className="crmLayout">
        <div className="customerList">
          <Card title="🏦 BTW Advies" subtitle="AI financieel advies">
            <p>{getVatAdvice()}</p>

            <button onClick={showQuarterVat}>
              🧾 BTW aangifte kwartaal bekijken
            </button>
          </Card>

          <Card title="❤️ Financiële gezondheid" subtitle="Cashflow status">
            <p>{getFinancialHealth()}</p>
          </Card>
        </div>

        <div className="customerDetail">
          <Card title="🧾 Openstaande facturen" subtitle="Nog te ontvangen">
            {finance.openInvoices.length === 0 ? (
              <p className="empty">Geen openstaande facturen.</p>
            ) : (
              finance.openInvoices.map((invoice) => (
                <div className="noteItem" key={invoice.id}>
                  <strong>{invoice.projectName || invoice.id}</strong>
                  <p>Bedrag: €{(invoice.total || 0).toFixed(2)}</p>
                  <p>Status: {invoice.status || "Open"}</p>
                </div>
              ))
            )}
          </Card>

          <Card title="📊 Winst & verlies" subtitle="Eerste berekening">
            <p>Omzet excl. BTW: €{finance.subtotal.toFixed(2)}</p>
            <p>Geschatte kosten: €{finance.estimatedCosts.toFixed(2)}</p>
            <p>
              <strong>
                Geschatte winst: €{finance.estimatedProfit.toFixed(2)}
              </strong>
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}

export default FinancieelCentrum;
