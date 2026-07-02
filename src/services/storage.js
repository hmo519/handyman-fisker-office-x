const KEYS = {
  customers: "hf-customers",
  projects: "hf-projects",
  planning: "hf-planning",
  invoices: "hf-invoices",
};

function read(key, fallback = []) {
  const saved = localStorage.getItem(key);
  return saved ? JSON.parse(saved) : fallback;
}

function write(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function getCustomers() {
  return read(KEYS.customers);
}

export function saveCustomers(customers) {
  write(KEYS.customers, customers);
}

export function getProjects() {
  return read(KEYS.projects);
}

export function saveProjects(projects) {
  write(KEYS.projects, projects);
}

export function getPlanning() {
  return read(KEYS.planning);
}

export function savePlanning(planning) {
  write(KEYS.planning, planning);
}

export function getInvoices() {
  return read(KEYS.invoices);
}

export function saveInvoices(invoices) {
  write(KEYS.invoices, invoices);
}
