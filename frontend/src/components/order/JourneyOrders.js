import React, { useState, useEffect } from "react";
import {
    Typography,
    Empty,
    Form,
    Select,
    Input,
    Button,
    Space,
    Timeline,
    Spin,
    message,
} from "antd";
import OrderService from "../../services/OrderService";
import "antd/dist/antd.css";
import { useParams } from "react-router";
import JourneyService from "../../services/JourneyService";
import UserJourneyUtils from "../utils/UserJourneyUtils";
import OrderCard from "./OrderCard";
import Container from "react-bootstrap/Container";
import OrderIssueForm from "./OrderIsueForm";

const { Title, Text } = Typography;
const { Option } = Select;

const JourneyOrders = () => {
  const [journey, setJourney] = useState(null);
  const [orders, setOrders] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { journeyId } = useParams();

  const getTimelineItemForPoint = (point, index) => {
    return (
      <Timeline.Item
        key={`${point.id}_timeline`}
        label={UserJourneyUtils.resolvePointLabel(
          index,
          point,
          journey.travelPoints.length
        )}
      >
        {point.address}
      </Timeline.Item>
    );
  };

  useEffect(() => {
    const load = async () => {
      const ordersPromise = OrderService.getAllJourneyOrders(journeyId);
      const journeyPromise = JourneyService.getJourney(journeyId);
      Promise.all([ordersPromise, journeyPromise]).then((res) => {
        setOrders(res[0].data);
        setJourney(res[1].data);
      });
    };
    load();
  }, [journeyId]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = (values) => {
    setIsModalVisible(false);
    //message.success("Success!");
      message.error("Invalid password!");
      setIsModalVisible(true);

  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const ordersTable = orders.length ? (
    orders.map((order) => {
      return (
        <OrderCard
          key={order.id}
          order={order}
          issueButton={
            <Button type="primary" onClick={showModal}>
              Issue
            </Button>
          }
        />
      );
    })
  ) : (
    <Empty />
  );

  return (
    <>
      <Title className="Centered">Journey orders</Title>
      <div>
        <Title level={3} className="Centered">
          Travel points
        </Title>
        {journey ? (
          <Timeline mode={"left"} style={{ padding: "10px 20% 0 20%" }}>
            {journey.travelPoints.map((point, index) => {
              return getTimelineItemForPoint(point, index);
            })}
          </Timeline>
        ) : (
          <Spin className="Centered" />
        )}
      </div>
      <Title level={3} className="Centered">
        Orders
      </Title>
      <Container className="mt-5">{ordersTable}</Container>
      <Form.Provider onFormFinish={(name, { values, forms }) => handleOk(values)}>
        <OrderIssueForm visible={isModalVisible} onCancel={handleCancel} />
      </Form.Provider>
    </>
  );
};

export default JourneyOrders;
