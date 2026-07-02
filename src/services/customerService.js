import { getCustomers, saveCustomers } from "./storage";

export function getAllCustomers() {
  return getCustomers();
}

export function addCustomer(customerData) {
  const customers = getCustomers();

  const newCustomer = {
    id: `CUST-${Date.now()}`,
    status: "Lead",
    notes: [],
    ...customerData,
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
      ? {
          ...customer,
          notes: [...(customer.notes || []), newNote],
        }
      : customer
  );

  saveCustomers(updated);

  return updated;
}
