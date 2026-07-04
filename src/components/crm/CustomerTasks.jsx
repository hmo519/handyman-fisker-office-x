import Card from "../ui/Card";
import Button from "../ui/Button";

function CustomerTasks({
  customer,
  onAddTask,
  onToggleTask,
}) {
  if (!customer) {
    return (
      <Card
        title="✅ Taken"
        subtitle="Selecteer eerst een klant"
      >
        <p>Geen klant geselecteerd.</p>
      </Card>
    );
  }

  function addTask() {
    const task = prompt("Nieuwe taak");

    if (!task) return;

    onAddTask(customer.id, task);
  }

  return (
    <Card
      title="✅ Acties & Taken"
      subtitle="Openstaande werkzaamheden"
      actions={
        <Button type="primary" onClick={addTask}>
          + Taak
        </Button>
      }
    >
      {(customer.tasks || []).length === 0 ? (
        <p className="empty">
          Geen openstaande taken.
        </p>
      ) : (
        customer.tasks.map((task) => (
          <div
            className="noteItem"
            key={task.id}
          >
            <strong>
              {task.completed ? "✅" : "⬜"} {task.text}
            </strong>

            <Button
              type="secondary"
              onClick={() =>
                onToggleTask(customer.id, task.id)
              }
            >
              {task.completed
                ? "Heropenen"
                : "Afronden"}
            </Button>
          </div>
        ))
      )}
    </Card>
  );
}

export default CustomerTasks;
