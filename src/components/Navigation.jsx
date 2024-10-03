import { Link } from "react-router-dom";

function Navigation() {
    return (
        <nav className="navigation">
            <ul>
                <li>
                    <Link to="/">Invoices</Link>
                </li>
                <li>
                    <Link to="/late-invoices">Late Invoices</Link>
                </li>
                <li>
                    <Link to="/create-invoice">Create Invoice</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navigation;
