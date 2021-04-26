import React, { useState, useEffect } from "react";
// TODO кнопку clear form, cancel и на страницу создания поездки, order size default value
// TODO для 2-х точек задание значений
// TODO поправить id элементов (на название + id)
import {
  Typography,
  Form,
  Select,
  Input,
  Button,
  Space,
  Steps,
  Timeline,
  Row,
  Col,
} from "antd";
import OrderService from "../services/OrderService";
import "antd/dist/antd.css";
import { useParams } from "react-router";
import JourneyService from "../services/JourneyService";
import { FlagOutlined } from "@ant-design/icons";
import UserJourneyUtils from "./utils/UserJourneyUtils";

const { Title, Text } = Typography;
const { Option } = Select;

const OrderAdd = () => {
  const [orderSizes, setOrdersSizes] = useState([]);
  const [journey, setJourney] = useState(null);
  const [startPointIndex, setStartPointIndex] = useState(null);
  const [endPointIndex, setEndPointIndex] = useState(null);
  const [form] = Form.useForm();
  const { journeyId } = useParams();
  const layout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 8 },
  };

  const tailLayout = {
    wrapperCol: {
      offset: 3,
      span: 10,
    },
  };

  const getStartPoints = () => {
    return journey
      ? journey.travelPoints.filter(
          (point, index) =>
            index !== journey.travelPoints.length - 1 &&
            (!endPointIndex || index < endPointIndex)
        )
      : [];
  };

  const getEndPoints = () => {
    return journey
      ? journey.travelPoints.filter(
          (point, index) =>
            index !== 0 && (!startPointIndex || index > startPointIndex)
        )
      : [];
  };

  const onStartPointSelect = (index) => {
    console.log("start", index);
    setStartPointIndex(index);
  };

  const onEndPointSelect = (index) => {
    console.log("end", index);
    setEndPointIndex(index);
  };

  const getTimelineItemForPoint = (point, index) => {
    return index === startPointIndex || index === endPointIndex ? (
      <Timeline.Item
        id={`${point.id}_timeline`}
        color="green"
        label={UserJourneyUtils.resolvePointLabel(
          index,
          point,
          journey.travelPoints.length
        )}
        dot={<FlagOutlined />}
      >
        {point.address}
      </Timeline.Item>
    ) : (
      <Timeline.Item
        id={`${point.id}_timeline`}
        color={
          index < endPointIndex && index > startPointIndex ? "green" : "blue"
        }
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
      OrderService.getOrdersSize().then((response) => {
        setOrdersSizes(response.data);
      });
      JourneyService.getJourney(journeyId).then((response) => {
        setJourney(response.data);
      });
    };
    load();
  }, [journeyId]);

  return (
    <>
      <Title className="Centered">Order create</Title>
      <div>
        <Title level={3} className="Centered">Travel points</Title>
        {journey ? (
          <Timeline mode={"left"} style={{padding: '10px 20% 0 20%'}}>
            {journey.travelPoints.map((point, index) => {
              return getTimelineItemForPoint(point, index);
            })}
          </Timeline>
        ) : null}
      </div>
      <Form
        {...layout}
        form={form}
        name="order"
        colon={false}
        style={{ marginTop: 50 }}
      >
        <Row>
          <Col span={12}>
            <Form.Item
              labelAlign="right"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
              name="startPoint"
              label="Start point"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select
                name="startPoint"
                placeholder="Select start point"
                onSelect={(value) => onStartPointSelect(value)}
              >
                {getStartPoints().map((point) => (
                  <Option key={point.id} value={point.pointIndex}>
                    <Space>
                      <Text id={point.id}>{point.address}</Text>
                    </Space>
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
              name="endPoint"
              label="Finish point"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select
                name="endPoint"
                placeholder="Select finish point"
                onSelect={(value) => onEndPointSelect(value)}
              >
                {getEndPoints().map((point) => (
                  <Option key={point.id} value={point.pointIndex}>
                    <Space>
                      <Text id={point.id}>{point.address}</Text>
                    </Space>
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          name="orderSize"
          label="Order size"
          tooltip=""
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select placeholder="Select order size">
            {orderSizes.map((size) => (
              <Option key={size.id} value={size.id}>
                <Space>
                  <Text>{size.name}</Text>
                  <Text type={"secondary"}>{size.description}</Text>
                </Space>
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          wrapperCol={{ span: 20 }}
          name="description"
          label="Description"
          tooltip="Describe the features of your package and possible problems"
        >
          <Input.TextArea rows={1} />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Offer order
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default OrderAdd;
