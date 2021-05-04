import React, { useEffect, useState } from "react";
import {
  Comment,
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
import JourneyService from "../../services/JourneyService";
import { UserOutlined } from "@ant-design/icons";
import UserJourneyUtils from "../utils/UserJourneyUtils";
const { Text } = Typography;

const JourneyCard = ({ journey, deleteButton, createButton, ordersButton = false }) => {
  const [isDetails, setIsDetails] = useState(false);
  const [journeyFull, setJourneyFull] = useState(null);

  const onDetailClick = () => {
    setIsDetails(!isDetails);
  };

  useEffect(() => {
    const load = async () => {
      const response = await JourneyService.getJourney(journey.id);
      setJourneyFull(response.data);
    };
    load();
  }, [journey.id]);

  const resolvePointLabel = (index, point, pointsSize) => {
    if (index === 0) {
      return UserJourneyUtils.dateFormat(point.dispatchDate);
    } else if (index === pointsSize - 1) {
      return UserJourneyUtils.dateFormat(point.arrivalDate);
    } else {
      return (
        <>
          <p
            style={{
              marginBottom: 0,
              marginTop: "-10px",
            }}
          >
            {UserJourneyUtils.dateFormat(point.dispatchDate)}
          </p>
          <p>{UserJourneyUtils.dateFormat(point.arrivalDate)}</p>
        </>
      );
    }
  };

  const userName = UserJourneyUtils.getUserName(journey.owner);

  const avatar = (
    <Avatar
      size="large"
      style={{
        backgroundColor: "#7265e6",
        verticalAlign: "middle",
      }}
    >
      {journey.owner.firstName
        ? journey.owner.firstName.length < 8
          ? journey.owner.firstName
          : journey.owner.firstName.substr(0, 1)
        : journey.owner.email.substr(0, 1)}
    </Avatar>
  );

  return (
    <Card
      key={journey.id}
      title={
        journey.startTravelPoint.pointName +
        " - " +
        journey.endTravelPoint.pointName
      }
      style={{marginTop: 10}}
      extra={
        <Space>
          {createButton ? (
              <Button href={`/orderAdd/${journey.id}`} type="primary">Create order</Button>
          ) : null}
          {ordersButton ? (
              <Button href={`/orders/${journey.id}`} type="primary">Orders</Button>
          ) : null}
          <Button onClick={onDetailClick}>Details</Button>
          {deleteButton}
        </Space>
      }
    >
      <Row justify="space-between">
        <Col span={10}>
          {isDetails ? (
            <Timeline mode={"left"}>
              {journeyFull.travelPoints.map((point, index) => {
                return (
                  <Timeline.Item
                    key={point.id}
                    label={resolvePointLabel(
                      index,
                      point,
                      journeyFull.travelPoints.length
                    )}
                  >
                    <p>{point.address}</p>
                    <Text type="secondary" style={{ fontStyle: "italic" }}>
                      Comment:
                    </Text>
                    <Comment
                      id={point.id}
                      author={
                        <a href={`/profile/${journey.owner.id}`}>{userName}</a>
                      }
                      avatar={
                        <Avatar
                          id={point.id}
                          style={{ backgroundColor: "#7265e6" }}
                          icon={<UserOutlined />}
                        />
                      }
                      content={<p>{point.comment}</p>}
                    />
                  </Timeline.Item>
                );
              })}
            </Timeline>
          ) : (
            <Timeline mode={"left"}>
              <Timeline.Item
                label={UserJourneyUtils.dateFormat(
                  journey.startTravelPoint.dispatchDate
                )}
              >
                {journey.startTravelPoint.address}
              </Timeline.Item>
              <Timeline.Item
                label={UserJourneyUtils.dateFormat(
                  journey.endTravelPoint.arrivalDate
                )}
              >
                {journey.endTravelPoint.address}
              </Timeline.Item>
            </Timeline>
          )}
        </Col>
        <Col>
          <Space>
            <a href={`/profile/${journey.owner.id}`}>{avatar}</a>
            <Space direction="vertical">
              <Text strong>{journey.owner.email}</Text>
              <Text>
                {(journey.owner.firstName ? journey.owner.firstName : "") +
                  " " +
                  (journey.owner.lastName ? journey.owner.lastName : "")}
              </Text>
              <Text>
                Rating: <RatingComponent value={journey.owner.rating} />
              </Text>
            </Space>
          </Space>
        </Col>
        <Col>
          <Text>Max parcel count: {journey.maxOrderCount}</Text>
        </Col>
        <Col>
          <p>
            Small parcel:{" "}
            <Text strong>{journey.journeyCosts[0].cost} $/km</Text>
          </p>
          <p>
            Avg parcel: <Text strong>{journey.journeyCosts[1].cost} $/km</Text>
          </p>
          <p>
            Large parcel:{" "}
            <Text strong>{journey.journeyCosts[2].cost} $/km</Text>
          </p>
        </Col>
      </Row>
    </Card>
  );
};

export default JourneyCard;
