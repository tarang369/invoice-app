import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const LINE_ITEM_TYPES = {
    LABOR: "Labor",
    MATERIAL: "Material",
    EXPENSE: "Expense",
};

function InvoiceForm({ onSubmit, initialData = {} }) {
    const [formData, setFormData] = useState(initialData);
    const [lineItems, setLineItems] = useState(initialData.lineItems || []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const totalAmount = lineItems.reduce(
            (sum, item) => sum + item.amount,
            0
        );
        const newInvoice = {
            ...formData,
            id: formData.id || uuidv4(),
            number:
                formData.number || `INV-${Math.floor(Math.random() * 1000)}`,
            lineItems,
            total: totalAmount,
            status: "outstanding", // Default status for new invoices
        };
        console.log("New Invoice:", newInvoice);
        onSubmit(newInvoice);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLineItemChange = (index, field, value) => {
        const updatedLineItems = lineItems.map((item, i) => {
            if (i === index) {
                const updatedItem = { ...item, [field]: value };
                if (field === "quantity" || field === "rate") {
                    updatedItem.amount =
                        updatedItem.quantity * updatedItem.rate;
                }
                return updatedItem;
            }
            return item;
        });
        setLineItems(updatedLineItems);
    };

    const addLineItem = () => {
        setLineItems([
            ...lineItems,
            {
                type: LINE_ITEM_TYPES.LABOR,
                description: "",
                quantity: 0,
                rate: 0,
                amount: 0,
            },
        ]);
    };

    const removeLineItem = (index) => {
        setLineItems(lineItems.filter((_, i) => i !== index));
    };

    return (
        <form onSubmit={handleSubmit} className="invoice-form">
            <h2>{initialData.id ? "Edit Invoice" : "Create New Invoice"}</h2>
            <div className="form-group">
                <label htmlFor="client">Client</label>
                <input
                    type="text"
                    id="client"
                    name="client"
                    value={formData.client || ""}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="dueDate">Due Date</label>
                <input
                    type="date"
                    id="dueDate"
                    name="dueDate"
                    value={formData.dueDate || ""}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label>Line Items</label>
                {lineItems.map((item, index) => (
                    <div key={index} className="line-item">
                        <select
                            value={item.type}
                            onChange={(e) =>
                                handleLineItemChange(
                                    index,
                                    "type",
                                    e.target.value
                                )
                            }
                        >
                            {Object.values(LINE_ITEM_TYPES).map((type) => (
                                <option key={type} value={type}>
                                    {type}
                                </option>
                            ))}
                        </select>
                        <input
                            type="text"
                            placeholder="Description"
                            value={item.description}
                            onChange={(e) =>
                                handleLineItemChange(
                                    index,
                                    "description",
                                    e.target.value
                                )
                            }
                        />
                        {item.type === LINE_ITEM_TYPES.LABOR ? (
                            <>
                                <input
                                    type="number"
                                    placeholder="Hours"
                                    value={item.quantity}
                                    onChange={(e) =>
                                        handleLineItemChange(
                                            index,
                                            "quantity",
                                            parseFloat(e.target.value)
                                        )
                                    }
                                />
                                <input
                                    type="number"
                                    placeholder="Hourly Rate"
                                    value={item.rate}
                                    onChange={(e) =>
                                        handleLineItemChange(
                                            index,
                                            "rate",
                                            parseFloat(e.target.value)
                                        )
                                    }
                                />
                            </>
                        ) : (
                            <>
                                <input
                                    type="number"
                                    placeholder="Quantity"
                                    value={item.quantity}
                                    onChange={(e) =>
                                        handleLineItemChange(
                                            index,
                                            "quantity",
                                            parseFloat(e.target.value)
                                        )
                                    }
                                />
                                <input
                                    type="number"
                                    placeholder="Unit Price"
                                    value={item.rate}
                                    onChange={(e) =>
                                        handleLineItemChange(
                                            index,
                                            "rate",
                                            parseFloat(e.target.value)
                                        )
                                    }
                                />
                            </>
                        )}
                        <span>${item.amount.toFixed(2)}</span>
                        <button
                            type="button"
                            onClick={() => removeLineItem(index)}
                        >
                            Remove
                        </button>
                    </div>
                ))}
                <button type="button" onClick={addLineItem}>
                    Add Line Item
                </button>
            </div>
            <div className="form-group">
                <label htmlFor="notes">Notes</label>
                <textarea
                    id="notes"
                    name="notes"
                    value={formData.notes || ""}
                    onChange={handleChange}
                ></textarea>
            </div>
            <div className="form-group">
                <label htmlFor="paymentInstructions">
                    Payment Instructions
                </label>
                <textarea
                    id="paymentInstructions"
                    name="paymentInstructions"
                    value={formData.paymentInstructions || ""}
                    onChange={handleChange}
                ></textarea>
            </div>
            <button type="submit" className="btn">
                Save Invoice
            </button>
        </form>
    );
}

export default InvoiceForm;
