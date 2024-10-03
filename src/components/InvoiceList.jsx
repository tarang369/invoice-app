import { Link } from "react-router-dom";

import { useInvoices } from "../hooks/useInvoices";
import { sendInvoice } from "../utils";

function InvoiceList() {
    const { invoices, loading, error } = useInvoices();

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const handleSendInvoice = async (invoiceId) => {
        const invoice = invoices.find((inv) => inv.id === invoiceId);
        if (!invoice) {
            alert("Invoice not found");
            return;
        }

        try {
            const result = await sendInvoice(invoice);
            alert(result);
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="invoice-list">
            <h2>Invoices</h2>
            <table>
                <thead>
                    <tr>
                        <th>Invoice #</th>
                        <th>Client</th>
                        <th>Amount</th>
                        <th>Due Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {invoices.map((invoice) => (
                        <tr key={invoice.id}>
                            <td>
                                <Link to={`/invoice/${invoice.id}`}>
                                    {invoice.number}
                                </Link>
                            </td>
                            <td>{invoice.client}</td>
                            <td>${invoice.total.toFixed(2)}</td>
                            <td>{invoice.dueDate}</td>
                            <td>
                                <span className={`status ${invoice.status}`}>
                                    {invoice.status}
                                </span>
                            </td>
                            <td>
                                <Link
                                    to={`/invoice/${invoice.id}`}
                                    className="btn btn-small"
                                >
                                    View
                                </Link>
                                <Link
                                    to={`/edit-invoice/${invoice.id}`}
                                    className="btn btn-small"
                                >
                                    Edit
                                </Link>
                                <button
                                    className="btn btn-small"
                                    onClick={() =>
                                        handleSendInvoice(invoice.id)
                                    }
                                >
                                    Send
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link to="/create-invoice" className="btn">
                Create New Invoice
            </Link>
        </div>
    );
}

export default InvoiceList;
