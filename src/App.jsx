import "./App.css";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import CreateEditInvoice from "./components/CreateEditInvoice";
import InvoiceDetail from "./components/InvoiceDetail";
import InvoiceList from "./components/InvoiceList";
import LateInvoices from "./components/LateInvoices";
import Layout from "./components/Layout";

function App() {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<InvoiceList />} />
                    <Route path="/invoice/:id" element={<InvoiceDetail />} />
                    <Route
                        path="/create-invoice"
                        element={<CreateEditInvoice />}
                    />
                    <Route
                        path="/edit-invoice/:id"
                        element={<CreateEditInvoice />}
                    />
                    <Route path="/late-invoices" element={<LateInvoices />} />
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;
