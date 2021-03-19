import React, { Component, PropTypes } from "react";
import axios from 'axios';
import { Form, Button, FormGroup, FormControl, ControlLabel, Col, Route, Row } from "react-bootstrap";
import Home from "./Home"
import { Link, Redirect } from 'react-router-dom';

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

        axios.post(`http://localhost:8080/api/v1/security/login`, user)
            .then(res => {
                console.log(res);
                console.log(res.data);
                localStorage.setItem('token', res.data.token);
                console.log(localStorage.getItem("token"));
                if(res.data.token) {
                    this.props.upTitle(res.data.token);
                    this.setState({redirect: true});
                }
                else
                    alert("Неверный логин или пароль");

                 //react router
            })




    }

    render() {
        const {email, password, redirect} = this.state
        if(redirect){
            //this.props.upTitle(localStorage.getItem("token"));
            return < Redirect to = "/" / >;
    }
        else return (
            <div>
            <form onSubmit={this.handleSubmit} >
        <Form.Group as={Row} md="6"  controlId="email">
            <Form.Label   >Email: </Form.Label>
        <Col sm="0">
        <Form.Control
        type="email"
        placeholder="Enter email"
        required
        name="email"
        value={email}
        onChange={this.handleChange}
        />
            </Col>
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
        <Col sm={{ span: 2}}>
         <button type="submit" className="mr-2" >submit</button>
            </Col>
        </Form.Row>

            </form>
            </div>
    );
    }
}

export default Login;