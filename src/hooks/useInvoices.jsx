import { useEffect, useState } from "react";

export function useInvoices() {
    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("/invoices.json")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch");
                }
                return response.json();
            })
            .then((data) => {
                setInvoices(data.invoices);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    const addInvoice = (newInvoice) => {
        setInvoices([...invoices, newInvoice]);
        // In a real app, you would also send this to your backend
    };

    const updateInvoice = (updatedInvoice) => {
        setInvoices(
            invoices.map((invoice) =>
                invoice.id === updatedInvoice.id ? updatedInvoice : invoice
            )
        );
        // In a real app, you would also send this to your backend
    };

    return { invoices, loading, error, addInvoice, updateInvoice };
}
