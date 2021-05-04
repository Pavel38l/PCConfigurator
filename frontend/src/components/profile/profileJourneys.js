import {Empty, Button, Space} from "antd";
import Container from "react-bootstrap/Container";
import UserService from "../../services/UserService";
import JourneyService from "../../services/JourneyService";
import React, { useState, useEffect } from "react";
import jwtdecoder from "jwt-decode";
import { useParams } from "react-router";
import JourneyCard from ".././journey/JourneyCard";

const ProfileJourneys = () => {
  const [journeys, setJourneys] = useState([]);
  const { id } = useParams();
  const load = async () => {
    const response = await UserService.getUserJourneys(id);
    setJourneys(response.data);
  };
  const deleteJourney = async (id) => {
    try {
      await JourneyService.deleteJourney(id);
      await load();
    } catch (error) {
      console.error("delete journey: ", error);
    }
  };
  const journeyTable = journeys.length
    ? journeys.map((journey) => {
        return (
          <JourneyCard
            journey={journey}
            createButton={false}
            ordersButton={true}
            deleteButton={
              localStorage.getItem("token") &&
              id === jwtdecoder(localStorage.getItem("token")).jti ? (
                <Button
                  variant="outline-success"
                  className="float-right"
                  danger
                  onClick={() => deleteJourney(journey.id)}
                >
                  Delete
                </Button>
              ) : null
            }
            style={{ marginTop: "10" }}
          />
        );
      })
    : (<Empty />);
      

  useEffect(() => {
    load();
  }, [id]);

  return (
    <>
      <Container className="mt-5">
        {localStorage.getItem("token") &&
        id === jwtdecoder(localStorage.getItem("token")).jti ? (
            <Button
                type="primary"
                href="/journey-create"
            >
              Create journey
            </Button>
        ) : null}
        {journeyTable}
      </Container>
    </>
  );
};
export default ProfileJourneys;
