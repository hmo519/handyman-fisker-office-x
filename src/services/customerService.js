import { getCustomers, saveCustomers } from "./storage";

export function getAllCustomers() {

  return getCustomers();

}

export function addCustomer(customerData) {

  const customers = getCustomers();

  const newCustomer = {

    id: `CUST-${Date.now()}`,

    name: customerData.name || "",

    city: customerData.city || "",

    address: customerData.address || "",

    phone: customerData.phone || "",

    email: customerData.email || "",

    status: customerData.status || "Lead",

    notes: [],

    contacts: [],

    documents: [],

    tasks: [],

    createdAt: new Date().toLocaleDateString("nl-NL"),

  };

  const updated = [...customers, newCustomer];

  saveCustomers(updated);

  return updated;

}

export function updateCustomer(customerId, updates) {

  const customers = getCustomers();

  const updated = customers.map((customer) =>

    customer.id === customerId ? { ...customer, ...updates } : customer

  );

  saveCustomers(updated);

  return updated;

}

export function deleteCustomer(customerId) {

  const customers = getCustomers();

  const updated = customers.filter((customer) => customer.id !== customerId);

  saveCustomers(updated);

  return updated;

}

export function addCustomerNote(customerId, text) {

  const customers = getCustomers();

  const newNote = {

    id: `NOTE-${Date.now()}`,

    text,

    date: new Date().toLocaleDateString("nl-NL"),

  };

  const updated = customers.map((customer) =>

    customer.id === customerId

      ? { ...customer, notes: [...(customer.notes || []), newNote] }

      : customer

  );

  saveCustomers(updated);

  return updated;

}

export function addCustomerTask(customerId, text) {

  const customers = getCustomers();

  const newTask = {

    id: `TASK-${Date.now()}`,

    text,

    completed: false,

    date: new Date().toLocaleDateString("nl-NL"),

  };

  const updated = customers.map((customer) =>

    customer.id === customerId

      ? { ...customer, tasks: [...(customer.tasks || []), newTask] }

      : customer

  );

  saveCustomers(updated);

  return updated;

}

export function toggleCustomerTask(customerId, taskId) {

  const customers = getCustomers();

  const updated = customers.map((customer) =>

    customer.id === customerId

      ? {

          ...customer,

          tasks: (customer.tasks || []).map((task) =>

            task.id === taskId

              ? { ...task, completed: !task.completed }

              : task

          ),

        }

      : customer

  );

  saveCustomers(updated);

  return updated;

}

export function addCustomerContact(customerId, contactData) {

  const customers = getCustomers();

  const newContact = {

    id: `CONTACT-${Date.now()}`,

    name: contactData.name || "",

    phone: contactData.phone || "",

    email: contactData.email || "",

  };

  const updated = customers.map((customer) =>

    customer.id === customerId

      ? { ...customer, contacts: [...(customer.contacts || []), newContact] }

      : customer

  );

  saveCustomers(updated);

  return updated;

}

export function getCustomerStats() {

  const customers = getCustomers();

  return {

    total: customers.length,

    leads: customers.filter((c) => c.status === "Lead").length,

    active: customers.filter((c) => c.status === "Actief").length,

    finished: customers.filter((c) => c.status === "Afgerond").length,

  };

}
