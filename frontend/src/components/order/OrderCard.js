import React from "react";
import {
  Avatar,
  Card,
  Col,
  Comment,
  Row,
  Space,
  Tag,
  Timeline,
  Typography,
} from "antd";
import RatingComponent from "../home/RatingComponent";
import UserJourneyUtils from "../utils/UserJourneyUtils";
import { UserOutlined } from "@ant-design/icons";
import { PROFILE_URL } from "../../constants";
import RateJourney from "./rateJourney";

const { Text } = Typography;

const OrderCard = ({ order, button, issueButton, acceptbutton, rate }) => {
  const color =
    order.orderStatus.name === "offered"
      ? "orange"
      : order.orderStatus.name === "defined"
      ? "blue"
      : "success";

  const userName = UserJourneyUtils.getUserName(order.owner);

  const avatar = (
    <Avatar
      size="large"
      style={{
        backgroundColor: "#7265e6",
        verticalAlign: "middle",
      }}
    >
      {order.owner.firstName
        ? order.owner.firstName.length < 8
          ? order.owner.firstName
          : order.owner.firstName.substr(0, 1)
        : order.owner.email.substr(0, 1)}
    </Avatar>
  );

  return (
    <Card
      key={order.id}
      title={
        order.dispatchPoint.pointName + " - " + order.arrivalPoint.pointName
      }
      extra={
        <Space>
          {acceptbutton}
          {rate && order.orderStatus.name ==="completed" && order.rateJourney === null ? (<RateJourney id={order.id} idJourney={order.journey.id} ></RateJourney>):null}
          {button}
          {order.orderStatus.name !== "completed" ? issueButton : null}
        </Space>
      }
      style={{ marginTop: 10 }}
    >
      <Row justify="space-between">
        <Col span={10}>
          <Timeline mode={"left"}>
            <Timeline.Item
              label={UserJourneyUtils.dateFormat(
                order.dispatchPoint.arrivalDate
              )}
            >
              {order.dispatchPoint.address}
            </Timeline.Item>
            <Timeline.Item
              label={UserJourneyUtils.dateFormat(
                order.arrivalPoint.dispatchDate
              )}
            >
              {order.arrivalPoint.address}
            </Timeline.Item>
          </Timeline>
        </Col>
        <Col>
          <Space>
            <a href={`${PROFILE_URL}/${order.owner.id}`}>{avatar}</a>
            <Space direction="vertical">
              <Text strong>{order.owner.email}</Text>
              <Text>
                {(order.owner.firstName ? order.owner.firstName : "") +
                  " " +
                  (order.owner.lastName ? order.owner.lastName : "")}
              </Text>
              <Text>
                Rating: <RatingComponent value={order.owner.rating/20} />
              </Text>
            </Space>
          </Space>
        </Col>
        <Col>
          <p align="center">
            Order status: <Tag color={color}>{order.orderStatus.name}</Tag>
          </p>
        </Col>
        <Col>
          <p>
            Order size: <Text strong>{order.orderSize.name}</Text>
          </p>

          <p>
            Order value: <Text strong>{`${order.orderValue} $`}</Text>
          </p>
        </Col>
      </Row>
      {order.description ? (
        <Row justify="left">
          <Col span={2}>
            <Text type="secondary" style={{ fontStyle: "italic" }}>
              Comment:
            </Text>
          </Col>
          <Col span={22}>
            <Comment
              id={order.id}
              author={
                <a href={`${PROFILE_URL}/${order.owner.id}`}>{userName}</a>
              }
              avatar={
                <Avatar
                  id={order.id}
                  style={{ backgroundColor: "#7265e6" }}
                  icon={<UserOutlined />}
                />
              }
              content={<p>{order.description}</p>}
            />
          </Col>
        </Row>
      ) : null}
    </Card>
  );
};

export default OrderCard;
