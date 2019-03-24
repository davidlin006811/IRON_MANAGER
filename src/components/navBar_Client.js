import React from "react";
import { Link } from "react-router-dom";
import Logo from "../images/IronRatsLogo.svg";
import { CLIENT_URL } from "../../settings";
const NavBarClient = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-primary bg-dark">
      <a className="navbar-brand" href={CLIENT_URL}>
        <p className="h3 mt-1 mb-6">
          <img
            src={Logo}
            width="100"
            height="70"
            alt="Iron Rats Powder Coating logo"
          />
          I R C
        </p>
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="btn btn-primary">MENU</span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item mr-4">
            <p className="h6 mt-6 mb-3">
              <a href={CLIENT_URL}>Home </a>
            </p>
          </li>
          <li className="nav-item mr-4">
            <p className="h6 mt-6 mb-3">
              <a href={CLIENT_URL + "reviews"}>Reviews </a>
            </p>
          </li>
          <li className="nav-item mr-4">
            <p className="h6 mt-6 mb-3">
              <a href={CLIENT_URL + "products"}>Products</a>
            </p>
          </li>
          <li className="nav-item mr-4">
            <p className="h6 mt-6 mb-3">
              <a href={CLIENT_URL + "about"}>About us </a>
            </p>
          </li>
          <li className="nav-item mr-4">
            <p className="h6 mt-6 mb-3">
              <a href={CLIENT_URL + "contact"}>Contact us </a>
            </p>
          </li>
          <li className="nav-item mr-4">
            <p className="h6 mt-6 mb-3">
              <a href={CLIENT_URL + "careers"}>Careers </a>
            </p>
          </li>
          <li className="nav-item mr-4">
            <p className="h6 mt-6 mb-3">
              <a href={CLIENT_URL + "appointment"}>Make an appointment </a>
            </p>
          </li>
        </ul>
        <p className="navbar-text mr-4 mt-6 mb-3 h6">
          <Link to="/">Log in </Link>
        </p>
      </div>
    </nav>
  );
};
export default NavBarClient;
