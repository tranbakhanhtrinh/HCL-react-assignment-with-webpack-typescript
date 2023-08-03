import "./Navbar.scss";
import logo from "../../logo.svg";
import { NavLink } from "react-router-dom";
import { routesForNavbar } from "constants/routes";

const Navbar: React.FC = () => {
    const navLink = routesForNavbar.map(route => <li key={route.label} aria-label={route.ariaLabel}>
        <NavLink to={route.to}>{route.label}</NavLink>
    </li>)
    return (
        <nav className="Navbar" data-testid="navbar">
            <figure className="Navbar__Logo">
                <img src={logo} alt="logo" />
            </figure>
            <ul className="Navbar__List">
                {navLink}
            </ul>
        </nav>
    );
};

export default Navbar;
