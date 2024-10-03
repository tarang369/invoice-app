export function sendInvoice(invoice) {
    // In a real application, this would send an API request to your backend
    // For now, we'll just simulate the process
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() > 0.1) {
                // 90% success rate
                console.log(
                    `Sending invoice ${invoice.number} to ${invoice.client}`
                );
                resolve(
                    `Invoice ${invoice.number} sent successfully to ${invoice.client}`
                );
            } else {
                reject(new Error("Failed to send invoice. Please try again."));
            }
        }, 1000); // Simulate network delay
    });
}
