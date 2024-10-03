import { useEffect, useState } from "react";

export function useInvoice(id) {
    const [invoice, setInvoice] = useState(null);
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
                const foundInvoice = data.invoices.find(
                    (inv) => inv.id === parseInt(id)
                );
                if (foundInvoice) {
                    setInvoice(foundInvoice);
                } else {
                    setError("Invoice not found");
                }
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }, [id]);

    return { invoice, loading, error };
}
