import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import { signOut } from "firebase/auth";
import firebaseAuth from "../config/firebaeAuth";
import AuthContext from "../contexts/AuthContext";

function MyNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const userAuthenticated = useContext(AuthContext);

  const toggle = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const onLogoutClick = async () => {
    await signOut(firebaseAuth);
  };

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">reactstrap</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink tag={Link} to="/">
                Home
              </NavLink>
            </NavItem>
            {!userAuthenticated ? (
              <>
                <NavItem>
                  <NavLink tag={Link} to="/register">
                    Register
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} to="/login">
                    Login
                  </NavLink>
                </NavItem>
              </>
            ) : (
              <NavItem>
                <NavLink onClick={onLogoutClick}>Logout</NavLink>
              </NavItem>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default MyNavbar;
