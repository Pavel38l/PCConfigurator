import {Button, Space} from "antd";
import Container from "react-bootstrap/Container";
import UserService from "../../services/UserService";
import JourneyService from "../../services/JourneyService";
import React, { useState, useEffect } from "react";
import jwtdecoder from "jwt-decode";
import { useParams } from "react-router";
import JourneyCard from ".././journey/JourneyCard";
import isCurentUser from "../utils/isCurentUser";

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
  const journeyTable = journeys.map((journey) => {
    return (
      <JourneyCard
        key={journey.id}
        journey={journey}
        createButton={false}
        deleteButton={
          isCurentUser(id) ? (
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
        style={{marginTop: "10"}}
        status
      />
    );
  });

  useEffect(() => {
    load();
  }, [id]);
  
  return (
    <>
      <Container className="mt-5">
        {isCurentUser(id) ? (
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
