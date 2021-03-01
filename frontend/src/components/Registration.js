import React, { Component } from "react";
import axios from 'axios';
import { Form, Button, FormGroup, FormControl, ControlLabel, Col } from "react-bootstrap";
class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            sex: '',
            dateOfBrith: '',

        }
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
        console.log(event);
    }

    handleSubmit = event => {
        event.preventDefault();

        const user = {
            email: this.state.email,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            sex: this.state.sex,
            dateOfBrith: this.state.dateOfBrith
        };

        axios.post(`https://jsonplaceholder.typicode.com/users`, { user })
            .then(res => {
                console.log(res);
                console.log(res.data);
                console.log(user);
            })
    }
    render() {
        const {email, password, firstName, lastName, sex, dateOfBrith, from} = this.state
        return (
        <div>
            <Form onSubmit={this.handleSubmit}>

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

        <Form.Group as={Col} md="4" controlId="firstName">
            <Form.Label>firstName: </Form.Label>
                <Form.Control
                type="text"
                placeholder="Enter first name"
                required
                name="firstName"
                value={firstName}
                onChange={this.handleChange}
                />
        </Form.Group >


        <Form.Group as={Col} md="4" controlId="lastName">
            <Form.Label>LastName: </Form.Label>
                <Form.Control
                type="text"
                placeholder="Enter last name"
                required
                name="lastName"
                value={lastName}
                onChange={this.handleChange}
                />
        </Form.Group >

        <Form.Row className="align-items-center">
        <Form.Group as={Col} md="4">
        <Form.Label>sex</Form.Label>
        <Form.Control as="select" className="mr-sm-2" id="inlineFormCustomSelect" value={sex} onChange={this.handleChange} custom>
        <option value="male">male</option>
            <option value="female">female</option>
        </Form.Control>
        </Form.Group>

        <Form.Group as={Col} md="4">
            <Form.Label>Arrival time</Form.Label>
        <Form.Control
        required
        type="datetime-local"
        name="arrivalDate"
        value={dateOfBrith}
        onChange={this.handleChange}
        />
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>

        </Form.Row>

        <Button  type="submit">
            Submit
            </Button>


            </Form>
            </div>


    );
    }
}

export default Registration;