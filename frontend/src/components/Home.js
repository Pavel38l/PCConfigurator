import Header from "./Header";
import React, {useContext} from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {AccordionContext, Form, InputGroup, useAccordionToggle} from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import JourneyService from "../services/JourneyService";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            journeys: [],
            dispatchDate: '',
            arrivalDate: '',
            orderCount: '',
            rating: '',
            to: '',
            from: ''
        }
    }

    componentDidMount() {
        JourneyService.getJourneys().then((response) => {
            this.setState({
                journeys: response.data
            })
        })
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    submitHandler = event => {
        event.preventDefault();
        //this.state = JSON.parse(localStorage.getItem('formData'));
        const filterDto = {
            startTravelPoint: {
                x: 51.66240415823041,
                y: 39.18431486185959
            },
            endTravelPoint: {
                x: 51.67078714524324,
                y: 39.18284815419145
            },
            dispatchDate: this.state.dispatchDate,
            arrivalDate: this.state.arrivalDate,
            maxOrderCount: this.state.orderCount,
            rating: this.state.rating
        };
        JourneyService.filterJourneys(filterDto).then((res => {
            this.setState({
                journeys: res.data,
            })
        }))
    }

    cancelHandler = event => {
        event.preventDefault();
        JourneyService.getJourneys().then((res => {
            this.setState({
                journeys: res.data,
                dispatchDate: '',
                arrivalDate: '',
                orderCount: '',
                rating: '',
                to: '',
                from: ''
            })
        }))
    }

    render() {
        const journeys = this.state.journeys;
        const journeyTable = journeys.map(
            journey => {
                const journeyCosts = journey.journeyCosts.slice();
                return (
                    <tr key={journey.id}>
                    <td>{'x:' + journey.startTravelPoint.x + ' y:' + journey.startTravelPoint.y}</td>

                    <td>{'x:' + journey.endTravelPoint.x + ' y:' + journey.endTravelPoint.y}</td>

                    <td>{journey.startTravelPoint.dispatchDate}</td>
                    <td>{journey.startTravelPoint.dispatchDate}</td>
                    <td>{journey.maxOrderCount}</td>
                {
                    journey.journeyCosts.map(
                        cost =>
                    <td>{cost.cost}</td>
                )
                }
            <td>
                <Button variant="outline-success" className="float-right"
                href={"journey/" + journey.id}>
                    Details
                    </Button>
                    </td>
                    </tr>
            )
            }
        )

        const {dispatchDate, arrivalDate, orderCount, rating, to, from} = this.state
        return (
            <div>

        <Container className="mt-5">
            <h1 className="mt-5">Service for finding and sending passing links</h1>
            <Form onSubmit={this.submitHandler} className="mt-5">
                <Form.Row>
                <Form.Group as={Col} md="4">
                    <Form.Label>Dispatch time</Form.Label>
                <Form.Control
                required
                type="datetime-local"
                name="dispatchDate"
                value={dispatchDate}
                onChange={this.handleChange}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4">
                    <Form.Label>Arrival time</Form.Label>
                <Form.Control
                required
                type="datetime-local"
                name="arrivalDate"
                value={arrivalDate}
                onChange={this.handleChange}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="2">
                    <Form.Label>Order count</Form.Label>
                <Form.Control
                required
                type="number"
                min="1"
                name="orderCount"
                value={orderCount}
                onChange={this.handleChange}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="2">
                    <Form.Label>User rating</Form.Label>
                <Form.Control
                required
                type="number"
                min="0"
                name="rating"
                value={rating}
                onChange={this.handleChange}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                </Form.Row>
                <Form.Row>
                <Form.Group as={Col} md="6" controlId="validationCustom03">
                    <Form.Label>From: </Form.Label>
                <Form.Control
                type="text"
                placeholder="Country, City, Address"
                required
                name="from"
                value={from}
                onChange={this.handleChange}
                />
                <Form.Control.Feedback type="invalid">
                    Please provide a valid address.
                </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="validationCustom03">
                    <Form.Label>To: </Form.Label>
                <Form.Control
                type="text"
                placeholder="Country, City, Address"
                required
                name="to"
                value={to}
                onChange={this.handleChange}
                />
                <Form.Control.Feedback type="invalid">
                    Please provide a valid address.
                </Form.Control.Feedback>
                </Form.Group>
                </Form.Row>
                <Form.Row>
                <Button type="submit" className="mr-2">Filter</Button>
                    <Button variant="secondary" onClick={this.cancelHandler}>Cancel</Button>
                    </Form.Row>
                </Form>
            </Container>
            <Container className="mt-5">
                <div>
                    <table className = "table table-striped">
                        <thead>
                            <tr>
                            <td> From </td>
                            <td> To </td>
                            <td> First point dispatch date </td>
                            <td> Last point arrival Date </td>
                            <td> Max order count</td>
                            <td> Small order cost </td>
                            <td> Avg order cost </td>
                            <td> Max order cost </td>
                            </tr>
                        </thead>
                        <tbody>
                        {journeyTable}
                        </tbody>
                    </table>
                </div>
        </Container>
        </div>
    );
    }
}




function ContextAwareToggle({ children, eventKey, callback }) {
    const currentEventKey = useContext(AccordionContext);

    const decoratedOnClick = useAccordionToggle(
        eventKey,
        () => callback && callback(eventKey),
    );

    const isCurrentEventKey = currentEventKey === eventKey;

    return (
        <Button
    className="float-right"
    variant={isCurrentEventKey ? 'primary' : 'outline-primary'}
    onClick={decoratedOnClick}
        >
        {children}
        </Button>
);
}

export default Home;