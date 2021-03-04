import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";

class Header extends React.Component {
    render() {
        return (
            <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
                <Navbar.Brand href="/">Peredachka</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/journeys">Search trips</Nav.Link>
                        <Nav.Link href="/orders">Search for orders</Nav.Link>

                    </Nav>
                    { this.renderUserState(true)}
                </Navbar.Collapse>
            </Navbar>
        )
    }

    renderUserState(authorized) {
        if (authorized) {
            return (
                <Nav>
                    <NavDropdown title="UserName" id="collasible-nav-dropdown" className="mr-5">
                        <NavDropdown.Item href="/edit_trip/">Create trip</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="/user/">Profile</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Sign out</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            )
        } else {
            return (
                <Nav>
                    <Button variant="outline-primary" className="mr-2" href="/sigIn">Sign in</Button>
                    <Nav.Link href="/register">Register</Nav.Link>
                </Nav>
            )
        }

    }
}

export default Header