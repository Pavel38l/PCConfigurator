import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Card,
  Col,
  Row,
  Space,
  Timeline,
  Typography,
} from "antd";
import RatingComponent from "../home/RatingComponent";
import moment from "moment";
import JourneyService from "../../services/JourneyService";
const { Text, Link } = Typography;

const OrderCard = ({ orderProfile, button }) => {

  const dateFormat = (date) => {
    console.log(date, moment(date).format('LLL'));
    return moment(date).format('LLL');
  }

  return (
    <Card
      key={orderProfile.id}
      title={
        orderProfile.arrivalPoint.pointName +
        " - " +
        orderProfile.dispatchPoint.pointName
      }
      extra={ button}
    >
      <Row justify="space-between">
        <Col span={10}>
            <Timeline mode={"left"}>
              <Timeline.Item
                label={
                  dateFormat(orderProfile.arrivalPoint.arrivalDate)
                }
              >
                {orderProfile.arrivalPoint.address}
              </Timeline.Item>
              <Timeline.Item
                label={
                  dateFormat(orderProfile.dispatchPoint.dispatchDate)
                }
              >
                {orderProfile.dispatchPoint.address}
              </Timeline.Item>
            </Timeline>        
        </Col>
        <Col>
          <Space>
            <a href={"/profile/" + orderProfile.owner.id}>
              <Avatar size="large">{orderProfile.owner.firstName}</Avatar>
            </a>
            <Space direction="vertical">
              <Text strong>{orderProfile.owner.email}</Text>
              <Text>
                {(orderProfile.owner.firstName ? orderProfile.owner.firstName : "") +
                  " " +
                  (orderProfile.owner.lastName ? orderProfile.owner.lastName : "")}
              </Text>
              <Text>
                Rating: <RatingComponent value={orderProfile.owner.rating} />
              </Text>
            </Space>
          </Space>
        </Col>
        <Col>
        <p>
            Order status:{" "}
            <Text strong>{orderProfile.orderStatus.name}</Text>
          </p>
          
        </Col>
        <Col>
          <p>
            Order size:{" "}
            <Text strong>{orderProfile.orderSize.name}</Text>
          </p>
        </Col>
      </Row>
    </Card>
  );
};

export default OrderCard;
