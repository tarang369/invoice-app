import { Link } from "react-router-dom";

import { useInvoices } from "../hooks/useInvoices";

function LateInvoices() {
    const { invoices, loading, error } = useInvoices();

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const lateInvoices = invoices.filter(
        (invoice) => invoice.status === "late"
    );

    return (
        <div className="late-invoices">
            <h2>Late Invoices</h2>
            {lateInvoices.length > 0 ? (
                <div className="alert alert-danger">
                    You have {lateInvoices.length} late invoice(s)!
                </div>
            ) : (
                <div className="alert alert-success">
                    No late invoices. Great job!
                </div>
            )}
            <table>
                <thead>
                    <tr>
                        <th>Invoice #</th>
                        <th>Client</th>
                        <th>Amount</th>
                        <th>Due Date</th>
                        <th>Days Overdue</th>
                    </tr>
                </thead>
                <tbody>
                    {lateInvoices.map((invoice) => {
                        const dueDate = new Date(invoice.dueDate);
                        const today = new Date();
                        const daysOverdue = Math.floor(
                            (today - dueDate) / (1000 * 60 * 60 * 24)
                        );

                        return (
                            <tr key={invoice.id}>
                                <td>
                                    <Link to={`/invoice/${invoice.id}`}>
                                        {invoice.number}
                                    </Link>
                                </td>
                                <td>{invoice.client}</td>
                                <td>${invoice.total.toFixed(2)}</td>
                                <td>{invoice.dueDate}</td>
                                <td>{daysOverdue}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default LateInvoices;
