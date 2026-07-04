import CustomerProfile from "./CustomerProfile";
import CustomerAiAnalysis from "./CustomerAiAnalysis";
import CustomerFinance from "./CustomerFinance";
import CustomerContacts from "./CustomerContacts";
import CustomerTimeline from "./CustomerTimeline";
import CustomerNotes from "./CustomerNotes";
import CustomerTasks from "./CustomerTasks";

function CustomerDetail({
  customer,
  onUpdateCustomer,
  onDeleteCustomer,
  onAddNote,
  onAddTask,
  onToggleTask,
  onAddContact,
}) {
  return (
    <div className="customerDetail">
      <CustomerProfile
        customer={customer}
        onUpdateCustomer={onUpdateCustomer}
        onDeleteCustomer={onDeleteCustomer}
      />

      <CustomerAiAnalysis customer={customer} />

      <CustomerFinance customer={customer} />

      <CustomerContacts
        customer={customer}
        onAddContact={onAddContact}
      />

      <CustomerTimeline customer={customer} />

      <CustomerNotes
        customer={customer}
        onAddNote={onAddNote}
      />

      <CustomerTasks
        customer={customer}
        onAddTask={onAddTask}
        onToggleTask={onToggleTask}
      />
    </div>
  );
}

export default CustomerDetail;
