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
import React, { useState, useEffect } from "react";
import Image from "react-bootstrap/Image";
import jwtdecoder from "jwt-decode";
import moment from "moment";
import { useParams } from "react-router";
import Profile from "./profile";
import ProfileJourneys from "./profileJourneys";
import ProfileOrders from "./profileOrders";
import PageContainer from "../Container";
import ProfileOtherOrders from "./profileOtherOrders";

const ProfileTabs = () => {
  const { TabPane } = Tabs;
  const { id } = useParams();
  return (
    <>
      <h3>Profile</h3>
      <Tabs>
        <TabPane tab="User info" key="1">
          <Profile></Profile>
        </TabPane>
        <TabPane tab="Journeys" key="2">
          <ProfileJourneys></ProfileJourneys>
        </TabPane>
        <TabPane tab="Orders" key="3">
          <ProfileOrders></ProfileOrders>
        </TabPane>
        <TabPane tab="Other Orders" key="4">
          <ProfileOtherOrders></ProfileOtherOrders>
        </TabPane>
      </Tabs>
    </>
  );
};
export default ProfileTabs;
