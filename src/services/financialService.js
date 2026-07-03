import { getInvoices } from "./storage";

export function getFinancialData() {
  const invoices = getInvoices();

  const totalRevenue = invoices.reduce(
    (sum, invoice) => sum + (invoice.total || 0),
    0
  );

  const totalVat = invoices.reduce(
    (sum, invoice) => sum + (invoice.tax || 0),
    0
  );

  const subtotal = invoices.reduce(
    (sum, invoice) => sum + (invoice.subtotal || 0),
    0
  );

  const openInvoices = invoices.filter(
    (invoice) => invoice.status !== "Betaald"
  );

  const openAmount = openInvoices.reduce(
    (sum, invoice) => sum + (invoice.total || 0),
    0
  );

  const estimatedCosts = totalRevenue * 0.35;
  const estimatedProfit = totalRevenue - estimatedCosts;

  return {
    invoices,
    totalRevenue,
    subtotal,
    totalVat,
    openInvoices,
    openAmount,
    estimatedCosts,
    estimatedProfit,
  };
}

export function getVatAdvice() {
  const data = getFinancialData();

  if (data.totalVat === 0) {
    return "Er is nog geen BTW berekend. Maak eerst facturen aan.";
  }

  return `Reserveer ongeveer €${data.totalVat.toFixed(
    2
  )} voor je BTW-afdracht.`;
}

export function getFinancialHealth() {
  const data = getFinancialData();

  if (data.totalRevenue === 0) {
    return "⚠️ Nog geen omzet geregistreerd.";
  }

  if (data.openAmount > data.totalRevenue * 0.5) {
    return "🟡 Veel geld staat nog open in facturen.";
  }

  return "🟢 Financieel overzicht ziet er gezond uit.";
}
