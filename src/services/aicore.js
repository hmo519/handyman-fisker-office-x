import {
  getCustomers,
  getInvoices,
  getPlanning,
  getProjects,
} from "./storage";

export function getBusinessData() {
  const customers = getCustomers();
  const projects = getProjects();
  const invoices = getInvoices();
  const planning = getPlanning();

  const today = new Date().toISOString().split("T")[0];
  const todayPlanning = planning.filter((item) => item.date === today);

  const totalRevenue = invoices.reduce(
    (sum, invoice) => sum + (invoice.total || 0),
    0
  );

  const emptyProjects = projects.filter(
    (project) => !project.tasks || project.tasks.length === 0
  );

  return {
    customers,
    projects,
    invoices,
    planning,
    today,
    todayPlanning,
    totalRevenue,
    emptyProjects,
  };
}

export function getBusinessHealth() {
  const data = getBusinessData();

  if (data.customers.length === 0) {
    return "⚠️ Geen klanten gevonden. Voeg klanten toe om je bedrijf te laten draaien.";
  }

  if (data.projects.length === 0) {
    return "📂 Geen projecten actief. Maak projecten aan vanuit je klanten.";
  }

  if (data.todayPlanning.length === 0) {
    return "📅 Geen planning vandaag. Plan minimaal één project in.";
  }

  if (data.invoices.length === 0) {
    return "🧾 Nog geen facturen. Rond projecten af en maak facturen aan.";
  }

  return "🟢 Bedrijf draait stabiel. Blijf projecten afronden en factureren.";
}

export function getMainDecision() {
  const data = getBusinessData();

  if (data.todayPlanning.length === 0) {
    return "📅 Maak vandaag eerst een planning.";
  }

  if (data.emptyProjects.length > 0) {
    return "📂 Werk projecten zonder taken bij.";
  }

  if (data.invoices.length === 0) {
    return "🧾 Maak facturen voor afgeronde projecten.";
  }

  return "🚀 Werk volgens planning en optimaliseer je dag.";
}

export function getDailyAdvice() {
  const data = getBusinessData();
  const advice = [];

  if (data.todayPlanning.length === 0) {
    advice.push("Plan je belangrijkste projecten voor vandaag.");
  }

  if (data.emptyProjects.length > 0) {
    advice.push(`Werk ${data.emptyProjects.length} project(en) bij met taken.`);
  }

  if (data.totalRevenue < 1500) {
    advice.push("Focus op afronden en factureren om omzet te verhogen.");
  }

  if (advice.length === 0) {
    advice.push("Alles loopt goed. Blijf uitvoeren volgens planning.");
  }

  return advice;
}

export function getRevenueForecast() {
  const data = getBusinessData();

  const current = data.totalRevenue;
  const conservative = current * 1.1;
  const growth = current * 1.25;

  return {
    current,
    conservative,
    growth,
  };
}
