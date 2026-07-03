import { getInvoices } from "./storage";

function parseDate(dateValue) {
  if (!dateValue) return new Date();

  if (dateValue.includes("-")) {
    const parts = dateValue.split("-");

    if (parts[0].length === 4) return new Date(dateValue);
    if (parts[2]?.length === 4) return new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
  }

  if (dateValue.includes("/")) {
    const parts = dateValue.split("/");
    if (parts[2]?.length === 4) return new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
  }

  return new Date(dateValue);
}

export function getVatByQuarter(year = new Date().getFullYear()) {
  const invoices = getInvoices();

  return [1, 2, 3, 4].map((quarter) => {
    const quarterInvoices = invoices.filter((invoice) => {
      const date = parseDate(invoice.date);
      if (Number.isNaN(date.getTime())) return false;

      const invoiceQuarter = Math.floor(date.getMonth() / 3) + 1;
      return date.getFullYear() === year && invoiceQuarter === quarter;
    });

    const subtotal = quarterInvoices.reduce((sum, invoice) => sum + (invoice.subtotal || 0), 0);
    const vat = quarterInvoices.reduce((sum, invoice) => sum + (invoice.tax || 0), 0);
    const total = quarterInvoices.reduce((sum, invoice) => sum + (invoice.total || 0), 0);

    return {
      quarter,
      year,
      invoices: quarterInvoices,
      subtotal,
      vat,
      total,
      status: vat > 0 ? "Klaar voor controle" : "Geen data",
    };
  });
}

export function getCurrentVatQuarter() {
  const year = new Date().getFullYear();
  const quarter = Math.floor(new Date().getMonth() / 3) + 1;

  return getVatByQuarter(year).find((item) => item.quarter === quarter);
}
