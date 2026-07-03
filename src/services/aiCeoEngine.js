import { getBusinessData } from "./aiCore";

export function getLiveBriefing() {
  const data = getBusinessData();

  const messages = [];

  messages.push(`👋 Goedemorgen Christian.`);

  messages.push(
    `📅 Vandaag staan er ${data.todayPlanning.length} planning(en) ingepland.`
  );

  messages.push(
    `👥 Je beheert momenteel ${data.customers.length} klanten.`
  );

  messages.push(
    `📂 Er lopen ${data.projects.length} projecten.`
  );

  messages.push(
    `🧾 Er zijn ${data.invoices.length} facturen beschikbaar.`
  );

  if (data.emptyProjects.length > 0) {
    messages.push(
      `⚠️ ${data.emptyProjects.length} project(en) hebben nog geen taken.`
    );
  }

  if (data.todayPlanning.length === 0) {
    messages.push(
      "📌 Mijn advies: plan vandaag eerst je belangrijkste werkzaamheden."
    );
  } else {
    messages.push(
      "✅ Je planning ziet er goed uit. Focus op het afronden van lopende projecten."
    );
  }

  return messages;
}
