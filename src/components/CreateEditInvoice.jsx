import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useInvoices } from "../hooks/useInvoices";
import InvoiceForm from "./InvoiceForm";

function CreateEditInvoice() {
    const { id } = useParams(); // This will be undefined for create mode
    const navigate = useNavigate();
    const { invoices, addInvoice, updateInvoice } = useInvoices();
    const [initialData, setInitialData] = useState({});
    const [loading, setLoading] = useState(!!id);
    console.log(invoices);
    useEffect(() => {
        if (id) {
            const invoice = invoices.find((inv) => inv.id === parseInt(id));
            if (invoice) {
                setInitialData(invoice);
                setLoading(false);
            } else {
                // Handle case where invoice is not found
                console.error("Invoice not found");
                navigate("/"); // Redirect to invoice list
            }
        }
    }, [id, invoices, navigate]);

    const handleSubmit = (invoiceData) => {
        if (id) {
            updateInvoice(invoiceData);
        } else {
            addInvoice(invoiceData);
        }
        navigate("/"); // Redirect to invoice list after submission
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{id ? "Edit Invoice" : "Create New Invoice"}</h1>
            <InvoiceForm onSubmit={handleSubmit} initialData={initialData} />
        </div>
    );
}

export default CreateEditInvoice;
