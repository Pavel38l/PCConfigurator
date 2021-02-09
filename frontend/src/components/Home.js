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
            journeys: [],
            journeyCost: []
        }
    }

    componentDidMount() {
        JourneyService.getJourneys().then((response) => {
            this.setState({
                journeys: response.data
            })
        })
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
        return (
            <html>
            <h1 className="mt-5">Service for finding and sending passing links</h1>
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
