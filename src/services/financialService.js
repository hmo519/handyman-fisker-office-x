import { getInvoices } from "./storage";

function parseInvoiceDate(dateValue) {
  if (!dateValue) return new Date();

  if (dateValue.includes("-")) {
    const parts = dateValue.split("-");

    if (parts[0].length === 4) {
      return new Date(dateValue);
    }

    if (parts[2]?.length === 4) {
      return new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
    }
  }

  if (dateValue.includes("/")) {
    const parts = dateValue.split("/");

    if (parts[2]?.length === 4) {
      return new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
    }
  }

  return new Date(dateValue);
}

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

export function getCurrentQuarterVat() {
  const invoices = getInvoices();

  const now = new Date();
  const quarter = Math.floor(now.getMonth() / 3) + 1;
  const year = now.getFullYear();

  const quarterInvoices = invoices.filter((invoice) => {
    const invoiceDate = parseInvoiceDate(invoice.date);

    if (Number.isNaN(invoiceDate.getTime())) return false;

    const invoiceQuarter = Math.floor(invoiceDate.getMonth() / 3) + 1;

    return (
      invoiceDate.getFullYear() === year &&
      invoiceQuarter === quarter
    );
  });

  const revenue = quarterInvoices.reduce(
    (sum, invoice) => sum + (invoice.total || 0),
    0
  );

  const subtotal = quarterInvoices.reduce(
    (sum, invoice) => sum + (invoice.subtotal || 0),
    0
  );

  const vat = quarterInvoices.reduce(
    (sum, invoice) => sum + (invoice.tax || 0),
    0
  );

  return {
    quarter,
    year,
    invoices: quarterInvoices,
    revenue,
    subtotal,
    vat,
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
