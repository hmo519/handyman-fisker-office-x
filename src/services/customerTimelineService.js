import { getProjects, getInvoices } from "./storage";

export function getCustomerTimeline(customer) {
  if (!customer) return [];

  const timeline = [];

  timeline.push({
    date: customer.createdAt || "-",
    icon: "👤",
    title: "Klant aangemaakt",
    description: customer.name,
  });

  const projects = getProjects().filter(
    (project) => project.customerId === customer.id
  );

  projects.forEach((project) => {
    timeline.push({
      date: project.createdAt || "-",
      icon: "📂",
      title: "Project",
      description: project.title,
    });
  });

  const invoices = getInvoices().filter((invoice) =>
    projects.some((project) => project.id === invoice.projectId)
  );

  invoices.forEach((invoice) => {
    timeline.push({
      date: invoice.date || "-",
      icon: "🧾",
      title: "Factuur",
      description: `€${(invoice.total || 0).toFixed(2)}`,
    });
  });

  return timeline.sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  });
}
