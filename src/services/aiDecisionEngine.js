import { getBusinessData } from "./aiCore";

export function getAiPriorities() {
  const data = getBusinessData();

  const priorities = [];

  if (data.todayPlanning.length === 0) {
    priorities.push({
      level: "Hoog",
      title: "Geen planning vandaag",
      message: "Plan vandaag minimaal één project in om productief te blijven.",
      impact: "Productiviteit",
    });
  }

  if (data.emptyProjects.length > 0) {
    priorities.push({
      level: "Hoog",
      title: "Projecten zonder taken",
      message: `${data.emptyProjects.length} project(en) hebben nog geen taken. Voeg taken toe zodat AI ze kan plannen en factureren.`,
      impact: "Projectflow",
    });
  }

  if (data.invoices.length === 0 && data.projects.length > 0) {
    priorities.push({
      level: "Middel",
      title: "Nog geen facturen",
      message: "Er zijn projecten aanwezig, maar nog geen facturen. Controleer of werk gefactureerd kan worden.",
      impact: "Cashflow",
    });
  }

  if (data.customers.length < 3) {
    priorities.push({
      level: "Middel",
      title: "Weinig klanten",
      message: "Je klantenbestand is nog klein. Nieuwe klanten toevoegen versterkt je groei.",
      impact: "Groei",
    });
  }

  if (priorities.length === 0) {
    priorities.push({
      level: "Laag",
      title: "Alles draait stabiel",
      message: "Er zijn geen urgente aandachtspunten. Focus op uitvoeren en optimaliseren.",
      impact: "Stabiliteit",
    });
  }

  return priorities;
}

export function getTopPriority() {
  const priorities = getAiPriorities();

  const high = priorities.find((item) => item.level === "Hoog");
  if (high) return high;

  const medium = priorities.find((item) => item.level === "Middel");
  if (medium) return medium;

  return priorities[0];
}
