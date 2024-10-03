import { useState } from "react";
import { Link, useParams } from "react-router-dom";

import { useInvoice } from "../hooks/useInvoice";
import { sendInvoice } from "../utils";

function InvoiceDetail() {
    const { id } = useParams();
    const { invoice, loading, error } = useInvoice(id);
    const [sendingStatus, setSendingStatus] = useState(null);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!invoice) return <div>Invoice not found</div>;

    const handleSendInvoice = async () => {
        setSendingStatus("sending");
        try {
            const result = await sendInvoice(invoice);
            setSendingStatus("success");
            alert(result);
        } catch (error) {
            setSendingStatus("error");
            alert(error.message);
        }
    };

    return (
        <div className="invoice-detail">
            <h2>Invoice #{invoice.number}</h2>
            <div className="invoice-info">
                <p>
                    <strong>Client:</strong> {invoice.client}
                </p>
                <p>
                    <strong>Due Date:</strong> {invoice.dueDate}
                </p>
                <p>
                    <strong>Status:</strong>{" "}
                    <span className={`status ${invoice.status}`}>
                        {invoice.status}
                    </span>
                </p>
            </div>
            <table className="line-items">
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Description</th>
                        <th>Quantity/Hours</th>
                        <th>Rate/Unit Price</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {invoice.lineItems.map((item, index) => (
                        <tr key={index}>
                            <td>{item.type}</td>
                            <td>{item.description}</td>
                            <td>
                                {item.quantity}{" "}
                                {item.type === "Labor" ? "hours" : ""}
                            </td>
                            <td>
                                ${item.rate.toFixed(2)}{" "}
                                {item.type === "Labor" ? "/hour" : "/unit"}
                            </td>
                            <td>${item.amount.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="invoice-total">
                <p>
                    <strong>Total:</strong> ${invoice.total.toFixed(2)}
                </p>
            </div>
            <div className="invoice-notes">
                <h3>Notes</h3>
                <p>{invoice.notes}</p>
            </div>
            <div className="payment-instructions">
                <h3>Payment Instructions</h3>
                <p>{invoice.paymentInstructions}</p>
            </div>
            <button
                className="btn"
                onClick={handleSendInvoice}
                disabled={sendingStatus === "sending"}
            >
                {sendingStatus === "sending" ? "Sending..." : "Send Invoice"}
            </button>
            {sendingStatus === "success" && (
                <p className="success-message">Invoice sent successfully!</p>
            )}
            {sendingStatus === "error" && (
                <p className="error-message">
                    Failed to send invoice. Please try again.
                </p>
            )}
            <Link to="/" className="btn btn-secondary">
                Back to List
            </Link>
        </div>
    );
}

export default InvoiceDetail;
