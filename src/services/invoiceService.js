import { getInvoices, saveInvoices } from "./storage";

export function createInvoiceFromProject(project, pricePerTask = 50) {
  const invoices = getInvoices();

  const alreadyExists = invoices.some(
    (invoice) => invoice.projectId === project.id
  );

  if (alreadyExists) {
    return invoices;
  }

  const taskCount = project.tasks ? project.tasks.length : 0;

  if (taskCount === 0) {
    return invoices;
  }

  const subtotal = taskCount * pricePerTask;
  const tax = subtotal * 0.21;
  const total = subtotal + tax;

  const invoice = {
    id: `INV-${Date.now()}-${project.id}`,
    projectId: project.id,
    projectName: project.title,
    tasks: taskCount,
    pricePerTask,
    subtotal,
    tax,
    total,
    date: new Date().toLocaleDateString("nl-NL"),
    status: "Aangemaakt",
  };

  const updated = [...invoices, invoice];

  saveInvoices(updated);

  return updated;
}

export function createInvoicesFromProjects(projects) {
  let updatedInvoices = getInvoices();

  projects.forEach((project) => {
    updatedInvoices = createInvoiceFromProject(project);
  });

  return updatedInvoices;
}

export function clearInvoices() {
  saveInvoices([]);
  return [];
}
