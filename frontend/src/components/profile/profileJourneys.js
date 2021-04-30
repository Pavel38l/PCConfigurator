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
import JourneyCard from ".././journey/JourneyCard";

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
      
      <JourneyCard journey={journey }  button= {localStorage.getItem("token") && id === jwtdecoder(localStorage.getItem("token")).jti ? (
        <Button
          variant="outline-success"
          className="float-right"
          danger
          onClick={() => deleteJourney(journey.id)}
        >
          Delete
        </Button>
      ) : null}/>
    );
  });

  useEffect(() => {
    load();
  }, [id]);
  
  return (
    <>
    {localStorage.getItem("token") && id === jwtdecoder(localStorage.getItem("token")).jti ? (
      <Button
          type="primary"
          variant="outline-success"
          className="float-left"
        >
          Create journey
        </Button>
    ):null}
      <Container className="mt-5">
        <div>
          <table className="table table-striped">
            <tbody>{journeyTable}</tbody>
          </table>
        </div>
      </Container>
    </>
  );
};
export default ProfileJourneys;
