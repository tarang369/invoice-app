import Navigation from "../components/Navigation";

function Layout({ children }) {
    return (
        <div className="layout">
            <Navigation />
            <main className="main-content">
                <div className="container">{children}</div>
            </main>
        </div>
    );
}

export default Layout;
