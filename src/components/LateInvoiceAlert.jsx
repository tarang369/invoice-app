function LateInvoiceAlert({ lateInvoices }) {
    if (lateInvoices.length === 0) return null;

    return (
        <div className="alert">
            <strong>Warning:</strong> You have {lateInvoices.length} late
            invoice(s).
        </div>
    );
}

export default LateInvoiceAlert;
