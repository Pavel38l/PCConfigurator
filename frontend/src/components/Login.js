import React, { Component } from "react";
import axios from 'axios';
import { Form, Button, FormGroup, FormControl, ControlLabel, Col, Route } from "react-bootstrap";
import Home from "./Home"
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit = event => {
        event.preventDefault();

        const user = {
            email: this.state.email,
            password: this.state.password
        };

        axios.post(`http://localhost:8080/api/v1/security/login`, user)
            .then(res => {
                console.log(res);
                console.log(res.data);
                localStorage.setItem('token', res.data.token);

            })
        window.open("http://localhost:3000/");
    }

    render() {
        const {email, password} = this.state
        return (
            <div>
            <form onSubmit={this.handleSubmit} >
        <Form.Group as={Col} md="4" controlId="email">
            <Form.Label>Email: </Form.Label>
        <Form.Control
        type="email"
        placeholder="Enter email"
        required
        name="email"
        value={email}
        onChange={this.handleChange}
        />
        </Form.Group >


        <Form.Group as={Col} md="4" controlId="password">
            <Form.Label>Password: </Form.Label>
        <Form.Control
        type="password"
        placeholder="Enter password"
        required
        name="password"
        value={password}
        onChange={this.handleChange}
        />
        </Form.Group >

        <Form.Row>
        <button type="submit" className="mr-2" >submit</button>
        </Form.Row>
            </form>
            </div>
    );
    }
}

export default Login;