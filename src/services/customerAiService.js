import { getInvoices, getProjects } from "./storage";

export function getCustomerAiAnalysis(customer) {
  if (!customer) {
    return {
      label: "Geen klant geselecteerd",
      score: 0,
      advice: "Selecteer een klant om AI analyse te zien.",
      points: [],
    };
  }

  const projects = getProjects().filter(
    (project) => project.customerId === customer.id
  );

  const invoices = getInvoices().filter((invoice) =>
    projects.some((project) => project.id === invoice.projectId)
  );

  const revenue = invoices.reduce(
    (sum, invoice) => sum + (invoice.total || 0),
    0
  );

  let score = 50;

  if (projects.length > 0) score += 10;
  if (projects.length >= 3) score += 10;
  if (invoices.length > 0) score += 10;
  if (revenue > 1000) score += 10;
  if (revenue > 5000) score += 10;

  if (score > 100) score = 100;

  let label = "Nieuwe klant";
  if (score >= 80) label = "Premium klant";
  else if (score >= 65) label = "Waardevolle klant";
  else if (score >= 50) label = "Normale klant";

  const points = [
    `📂 Projecten: ${projects.length}`,
    `🧾 Facturen: ${invoices.length}`,
    `💰 Omzet: €${revenue.toFixed(2)}`,
    `⭐ Klantscore: ${score}/100`,
  ];

  let advice = "Bouw rustig verder aan deze klantrelatie.";

  if (score >= 80) {
    advice =
      "Deze klant is zeer waardevol. Plan actief opvolging en bied vervolgwerk aan.";
  } else if (projects.length === 0) {
    advice =
      "Deze klant heeft nog geen projecten. Maak een eerste project of offerte aan.";
  } else if (invoices.length === 0) {
    advice =
      "Er zijn projecten maar nog geen facturen. Controleer of er werk gefactureerd kan worden.";
  }

  return {
    label,
    score,
    advice,
    points,
  };
}
