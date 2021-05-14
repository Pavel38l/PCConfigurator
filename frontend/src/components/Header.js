import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import jwtdecoder from "jwt-decode";
import {PROFILE_URL} from "../constants";

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        return (
            <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
                <Navbar.Brand href="/">Peredachka</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/">Search trips</Nav.Link>
                    </Nav>
                    { this.renderUserState(false)}
                </Navbar.Collapse>
            </Navbar>
        )
    }


    signOut = event => {
        this.setState({title: "username"});
        localStorage.setItem("token", "");

    }
    renderUserState() {
        if (localStorage.getItem("token")) {
        //  this.state.title = jwtdecoder(localStorage.getItem("token")).sub;
            // this.setState({title: jwtdecoder(localStorage.getItem("token")).sub});
            return (
                <Nav>
                    <NavDropdown title={this.props.title} id="collasible-nav-dropdown" className="mr-5">
                        <NavDropdown.Item href={PROFILE_URL}>Profile</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="/" onClick={this.signOut}>Sign out</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            )
        } else {
            return (
                <Nav>
                    <Button variant="outline-primary" className="mr-2" href="/login">Sign in</Button>
                    <Nav.Link href="/registration">Register</Nav.Link>
                </Nav>
            )
        }

    }
}

export default Header