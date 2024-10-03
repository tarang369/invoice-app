import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";

const markLateInvoices = (state) => {
    const today = dayjs();
    state.invoices.forEach((invoice) => {
        if (
            invoice.dueDate &&
            dayjs(invoice.dueDate).isBefore(today) &&
            invoice.status !== "paid"
        ) {
            invoice.status = "late";
        }
    });
};

const invoiceSlice = createSlice({
    name: "invoices",
    initialState: {
        invoices: [],
    },
    reducers: {
        addInvoice: (state, action) => {
            state.invoices.push(action.payload);
        },
        setInvoices: (state, action) => {
            state.invoices = action.payload;
            markLateInvoices(state); // Check if any invoices are late after loading
        },
        updateInvoiceStatus: (state, action) => {
            const { id, status } = action.payload;
            const invoice = state.invoices.find((invoice) => invoice.id === id);
            if (invoice) {
                invoice.status = status;
            }
        },
        addLineItem: (state, action) => {
            const { id, lineItem } = action.payload;
            const invoice = state.invoices.find((invoice) => invoice.id === id);
            if (invoice) {
                invoice.lineItems.push(lineItem);
            }
        },
    },
});

export const { addInvoice, setInvoices, updateInvoiceStatus, addLineItem } =
    invoiceSlice.actions;
export default invoiceSlice.reducer;
