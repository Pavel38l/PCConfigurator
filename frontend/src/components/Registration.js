import React, { Component } from "react";
import axios from 'axios';
import { Form, Button, Col, Row } from "react-bootstrap";
import { Redirect } from 'react-router-dom';
class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            dateOfBirth: '',
            sex: 'male',


        }
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });

    }

    handleSubmit = event => {
        event.preventDefault();

        const user = {
            email: this.state.email,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            sex: this.state.sex,
            dateOfBirth: this.state.dateOfBirth,
            redirect: false
        };

        axios.post(`http://localhost:8080/api/v1/security/register`, user)
            .then(res => {
                console.log(res);
                console.log(res.data);
                if (res.data)
                    this.setState({ redirect: true });
                else
                    alert("Данная почта уже существует");
            })
    }
    render() {
        const { email, password, firstName, lastName, sex, dateOfBirth, from, redirect } = this.state
        if (redirect) return <Redirect to="/login" />;
        else return (
            <div>

                <Form onSubmit={this.handleSubmit}>

                    <Form.Group as={Row} md="6" controlId="email">
                        <Form.Label column sm={2}>Email: </Form.Label>
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

                    <Form.Group as={Row} md="6" controlId="firstName">
                        <Form.Label column sm={2}>First name: </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter first name"
                            name="firstName"
                            value={firstName}
                            onChange={this.handleChange}
                        />
                    </Form.Group >


                    <Form.Group as={Row} md="6" controlId="lastName">
                        <Form.Label column sm={2}>Last name: </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter last name"
                            name="lastName"
                            value={lastName}
                            onChange={this.handleChange}
                        />
                    </Form.Group>

                    <Form.Group as={Row} md="6">
                        <Form.Label column sm={2}>Sex</Form.Label>

                        <Form.Control as="select"
                            className="mr-sm-2"
                            name="sex"
                            id="inlineFormCustomSelect"
                            value={sex}
                            onChange={this.handleChange}
                        >
                            <option value="male">male</option>
                            <option value="female">female</option>
                        </Form.Control>
                    </Form.Group>


                    <Form.Group as={Row} md="6">
                        <Form.Label column sm={2}>Date of birth</Form.Label>

                        <Form.Control
                            required
                            type="date"
                            name="dateOfBirth"
                            value={dateOfBirth}
                            onChange={this.handleChange}
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>


                    <Form.Row>
                        <Col sm={{ span: 2 }}>
                            <Button type="submit">
                                Submit
            </Button>
                        </Col>
                    </Form.Row>


                </Form>

            </div>


        );
    }
}

export default Registration;