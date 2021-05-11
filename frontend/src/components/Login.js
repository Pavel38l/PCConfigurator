import React, { Component } from "react";
import axios from 'axios';
import { Form, Button, Col, Row } from "react-bootstrap";
import { Redirect } from 'react-router-dom';
import {BACKEND_URL} from "../constants";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            redirect: false
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

        axios.post(`${BACKEND_URL}/api/v1/security/login`, user)
            .then(res => {
                console.log(res);
                console.log(res.data);
                localStorage.setItem('token', res.data.token);
                console.log(localStorage.getItem("token"));
                if (res.data.token) {
                    this.props.upTitle(res.data.token);
                    this.setState({ redirect: true });
                }
                else
                    alert("wrong login or password");

            })




    }

    render() {
        const { email, password, redirect } = this.state
        if (redirect) {
            //this.props.upTitle(localStorage.getItem("token"));
            return < Redirect to="/" />;
        }
        else return (
            <div>
                <form onSubmit={this.handleSubmit} >
                    <Form.Group as={Row} md="6" controlId="email">
                        <Form.Label column sm={2}  >Email: </Form.Label>
                        
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                required
                                name="email"
                                value={email}
                                onChange={this.handleChange}
                            />
                        
                    </Form.Group >


                    <Form.Group as={Row} md="6" controlId="password">
                        <Form.Label column sm={2}>Password: </Form.Label>
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
                        <Col sm={{ span: 2 }}>
                            <Button type="submit" className="mr-2" >Submit</Button>
                        </Col>
                    </Form.Row>

                </form>
            </div>
        );
    }
}

export default Login;