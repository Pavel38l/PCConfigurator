import Header from "./Header";
import React, {useContext} from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {AccordionContext, Container, useAccordionToggle} from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import JourneyService from "../services/JourneyService";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            journeys: []
        }
    }

    componentDidMount() {
        JourneyService.getJourneys().then((response) => {
            this.setState({journeys: response.data})
        })
    }

    render() {
        return (
            <html>
            <h1 className="mt-5">Service for finding and sending passing links</h1>
            <h2 className="mt-5">Trips:</h2>
            <Container className>
                <Accordion className="mt-5">
                    {
                        this.state.journeys.map(
                            journey =>
                                <Card key = {journey.id}>
                                    <Card.Header>
                                        <text className="float-left mr-5">
                                            <span className="font-italic font-weight-bold">From:</span>
                                        </text>
                                        <text className="float-left mr-5">
                                            <span className="font-italic font-weight-bold">To:</span>
                                        </text>
                                        <text className="float-left mr-5">
                                            <span className="font-italic font-weight-bold">Dispatch date: </span>
                                            {journey.dispatchDate}
                                        </text>
                                        <text className="float-left mr-5">
                                            <span className="font-italic font-weight-bold">Last point arrival Date: </span>
                                            {journey.arrivalDate}
                                        </text>
                                        <text className="float-left mr-5 ">
                                            <span className="font-italic font-weight-bold">Cost: </span>
                                            {journey.cost}
                                        </text>
                                        <ContextAwareToggle eventKey={journey.id}>Owner</ContextAwareToggle>
                                    </Card.Header>
                                    <Accordion.Collapse eventKey={journey.id}>
                                        <Card.Body>
                                            <span className="font-italic font-weight-bold">Email: </span>
                                            <span className="mr-5">{journey.owner.email}</span>
                                            <span className="font-italic font-weight-bold">First name: </span>
                                            <span className="mr-5">{journey.owner.firstName}</span>
                                            <span className="font-italic font-weight-bold">Last name: </span>
                                            <span className="mr-5">{journey.owner.lastName}</span>
                                        </Card.Body>
                                    </Accordion.Collapse>
                                    <Button variant="outline-success" className="float-right" href={"journey/" + journey.id}>
                                        Details
                                    </Button>
                                </Card>
                        )
                    }
                </Accordion>
            </Container>
            </html>
        );
    }

    renderUserFullName(user) {

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
