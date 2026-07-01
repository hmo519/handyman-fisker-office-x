import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function Facturen() {
  const [projects] = useState(() => {
    const saved = localStorage.getItem("hf-projects");
    return saved ? JSON.parse(saved) : [];
  });

  const [customers] = useState(() => {
    const saved = localStorage.getItem("hf-customers");
    return saved ? JSON.parse(saved) : [];
  });

  const [invoices, setInvoices] = useState(() => {
    const saved = localStorage.getItem("hf-invoices");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("hf-invoices", JSON.stringify(invoices));
  }, [invoices]);

  function getCustomer(id) {
    return customers.find((c) => c.id === id);
  }

  function generateInvoice(project) {
    const taskCount = project.tasks ? project.tasks.length : 0;

    const pricePerTask = 45;
    const subtotal = taskCount * pricePerTask;
    const tax = subtotal * 0.21;
    const total = subtotal + tax;

    const invoiceNumber = `INV-${String(invoices.length + 1).padStart(4, "0")}`;

    const customer = getCustomer(project.customerId);

    const invoice = {
      id: `inv_${Date.now()}`,
      number: invoiceNumber,
      projectName: project.title,
      customerName: customer?.name || "",
      address: customer?.city || "",
      tasks: taskCount,
      pricePerTask,
      subtotal,
      tax,
      total,
      date: new Date().toLocaleDateString("nl-NL"),
    };

    setInvoices([...invoices, invoice]);
  }

  function downloadPDF(inv) {
    const input = document.getElementById(inv.id);

    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save(`${inv.number}.pdf`);
    });
  }

  return (
    <section className="panel">
      <div className="pageHeader">
        <h2>🏢 Professionele Facturen</h2>
        <p className="empty">Bedrijfswaardige PDF facturen met branding</p>
      </div>

      {/* PROJECTS */}
      <div className="customerList">
        <h3>📂 Projecten</h3>

        {projects.map((project) => (
          <div className="customerCard" key={project.id}>
            <div>
              <strong>{project.title}</strong>
              <p>{project.tasks ? project.tasks.length : 0} taken</p>
            </div>

            <button onClick={() => generateInvoice(project)}>
              💰 Factuur maken
            </button>
          </div>
        ))}
      </div>

      {/* INVOICES */}
      <div className="customerDetail">
        <h3>🧾 Facturen overzicht</h3>

        {invoices.map((inv) => (
          <div key={inv.id}>
            {/* FACTUUR LAYOUT */}
            <div
              id={inv.id}
              style={{
                background: "white",
                color: "black",
                padding: "30px",
                marginBottom: "20px",
                borderRadius: "10px",
                fontFamily: "Arial",
              }}
            >
              {/* HEADER */}
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <h2 style={{ margin: 0 }}>Handyman Fisker</h2>
                  <p style={{ margin: 0 }}>Office X</p>
                  <p style={{ margin: 0 }}>Nederland</p>
                </div>

                <div style={{ textAlign: "right" }}>
                  <h3>FACTUUR</h3>
                  <p>{inv.number}</p>
                  <p>{inv.date}</p>
                </div>
              </div>

              <hr />

              {/* CUSTOMER */}
              <div style={{ marginBottom: "20px" }}>
                <h4>Klant:</h4>
                <p>{inv.customerName}</p>
                <p>{inv.address}</p>
              </div>

              {/* PROJECT */}
              <div>
                <h4>Project:</h4>
                <p>{inv.projectName}</p>
              </div>

              <hr />

              {/* LINES */}
              <div>
                <p>
                  {inv.tasks} werkzaamheden × €{inv.pricePerTask}
                </p>
              </div>

              {/* TOTALS */}
              <div style={{ marginTop: "20px" }}>
                <p>Subtotaal: €{inv.subtotal.toFixed(2)}</p>
                <p>BTW (21%): €{inv.tax.toFixed(2)}</p>

                <h2>TOTAAL: €{inv.total.toFixed(2)}</h2>
              </div>

              <hr />

              <p style={{ fontSize: "12px" }}>
                Dank voor uw vertrouwen in Handyman Fisker Office X
              </p>
            </div>

            <button onClick={() => downloadPDF(inv)}>
              📥 Download PDF
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Facturen;
