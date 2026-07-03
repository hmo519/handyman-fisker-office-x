import {
  getFinancialData,
  getFinancialHealth,
  getVatAdvice,
} from "./financialService";

export function getFinancialBriefing() {
  const finance = getFinancialData();

  const briefing = [];

  briefing.push(
    `💰 Totale omzet: €${finance.totalRevenue.toFixed(2)}`
  );

  briefing.push(
    `🧾 BTW reservering: €${finance.totalVat.toFixed(2)}`
  );

  briefing.push(
    `📬 Openstaande facturen: ${finance.openInvoices.length}`
  );

  briefing.push(
    `💵 Nog te ontvangen: €${finance.openAmount.toFixed(2)}`
  );

  briefing.push(
    `📈 Geschatte winst: €${finance.estimatedProfit.toFixed(2)}`
  );

  briefing.push(getFinancialHealth());

  briefing.push(getVatAdvice());

  if (finance.openInvoices.length > 5) {
    briefing.push(
      "⚠️ Advies: neem contact op met klanten die nog niet betaald hebben."
    );
  }

  if (finance.estimatedProfit > 10000) {
    briefing.push(
      "🎉 Geweldig! Je onderneming draait momenteel erg goed."
    );
  }

  if (finance.totalRevenue === 0) {
    briefing.push(
      "🚀 Begin met het versturen van offertes om omzet op te bouwen."
    );
  }

  return briefing;
}
