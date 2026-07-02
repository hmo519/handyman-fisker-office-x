import {
  getBusinessData,
  getBusinessHealth,
  getMainDecision,
  getDailyAdvice,
  getRevenueForecast,
} from "./aiCore";

export function getAiCeoMessage() {
  const data = getBusinessData();
  const forecast = getRevenueForecast();
  const advice = getDailyAdvice();

  if (data.todayPlanning.length === 0) {
    return {
      title: "Planning eerst aanpakken",
      message:
        "Christian, je hebt vandaag nog geen planning. Ik adviseer om eerst je belangrijkste projecten in te plannen zodat je dag direct productief start.",
      priority: "Hoog",
    };
  }

  if (data.emptyProjects.length > 0) {
    return {
      title: "Projecten liggen stil",
      message: `Er zijn ${data.emptyProjects.length} project(en) zonder taken. Werk deze bij, anders kan ik ze niet goed koppelen aan planning, facturen en AI-advies.`,
      priority: "Hoog",
    };
  }

  if (data.invoices.length === 0) {
    return {
      title: "Facturatie opstarten",
      message:
        "Er zijn nog geen facturen aangemaakt. Zodra projecten taken bevatten, kan AI CEO automatisch facturen klaarzetten.",
      priority: "Middel",
    };
  }

  return {
    title: "Bedrijf draait stabiel",
    message: `Je systeem draait goed. Huidige omzet is €${forecast.current.toFixed(
      2
    )}. Mijn advies: ${advice[0]}`,
    priority: "Normaal",
  };
}

export function getAiCeoSummary() {
  const data = getBusinessData();

  return [
    `Klanten: ${data.customers.length}`,
    `Projecten: ${data.projects.length}`,
    `Facturen: ${data.invoices.length}`,
    `Planning vandaag: ${data.todayPlanning.length}`,
    `Omzet: €${data.totalRevenue.toFixed(2)}`,
    `Status: ${getBusinessHealth()}`,
    `Actie: ${getMainDecision()}`,
  ];
}
