import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import useCurrentUserProfileUrl from "./utils/useCurrentUserProfileUrl";

const Header = ({ title }) => {
  const [userName, setUserName] = useState(null);
  const currentUserProfileUrl = useCurrentUserProfileUrl();

  const signOut = (event) => {
    //this.setState({ title: "username" });
      setUserName("userName");
    localStorage.setItem("token", "");
  };
  const renderUserState = () => {
    if (localStorage.getItem("token")) {
      return (
        <Nav>
          <NavDropdown
            title={title}
            id="collasible-nav-dropdown"
            className="mr-5"
          >
            <NavDropdown.Item href={currentUserProfileUrl}>
              Profile
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/" onClick={signOut}>
              Sign out
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      );
    } else {
      return (
        <Nav>
          <Button variant="outline-primary" className="mr-2" href="/login">
            Sign in
          </Button>
          <Nav.Link href="/registration">Register</Nav.Link>
        </Nav>
      );
    }
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
      <Navbar.Brand href="/">Peredachka</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Search trips</Nav.Link>
        </Nav>
        {renderUserState()}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
