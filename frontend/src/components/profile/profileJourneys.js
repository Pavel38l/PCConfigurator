import { useForm } from "antd/lib/form/Form";

import {
  Tabs,
  Button,
  Tooltip,
  Form,
  Input,
  Checkbox,
  Select,
  DatePicker,
} from "antd";
import axios from "axios";
import { EditOutlined, SaveOutlined } from "@ant-design/icons";
import Container from "react-bootstrap/Container";
import UserService from "../../services/UserService";
import JourneyService from "../../services/JourneyService";
import React, { useState, useEffect } from "react";
import jwtdecoder from "jwt-decode";
import { useParams } from "react-router";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
const { Option } = Select;
const ProfileJourneys = () => {
  const [journeys, setJourneys] = useState([]);
  const { id } = useParams();
  const [form] = useForm();
  const [edit, setEdit] = useState(false);
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
      <tr key={journey.id}>
        <td>{journey.startTravelPoint.address}</td>

        <td>{journey.endTravelPoint.address}</td>

        <td>{journey.startTravelPoint.dispatchDate}</td>
        <td>{journey.startTravelPoint.dispatchDate}</td>
        <td>{journey.maxOrderCount}</td>
        {journey.journeyCosts.map((cost) => (
          <td key={cost.id}>{cost.cost}</td>
        ))}

        <td>
          <div style={{ display: "flex" }}>
            <Button
              variant="outline-success"
              className="float-right"
              style={{ marginRight: 10 }}
            >
              Details
            </Button>

            {localStorage.getItem("token") && id === jwtdecoder(localStorage.getItem("token")).jti ? (
              <Button
                variant="outline-success"
                className="float-right"
                danger
                onClick={() => deleteJourney(journey.id)}
              >
                Delete
              </Button>
            ) : null}
          </div>
        </td>
      </tr>
    );
  });

  useEffect(() => {
    load();
  }, [id]);
  //поменять
  return (
    <>
      

      <Container className="mt-5">
        <div>
          <table className="table table-striped">
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
                <td> Actions </td>
              </tr>
            </thead>
            <tbody>{journeyTable}</tbody>
          </table>
        </div>
      </Container>
    </>
  );
};
export default ProfileJourneys;
