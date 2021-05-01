import React, { useState, useEffect } from "react";
// TODO поправить id элементов (на название + id)
import {
  Typography,
  Form,
  Select,
  Input,
  Button,
  Space,
  Timeline,
  Row,
  Col,
  Spin, InputNumber,
} from "antd";
import OrderService from "../../services/OrderService";
import "antd/dist/antd.css";
import { useParams } from "react-router";
import JourneyService from "../../services/JourneyService";
import { FlagOutlined } from "@ant-design/icons";
import UserJourneyUtils from "../utils/UserJourneyUtils";
import jwtdecoder from "jwt-decode";

const { Title, Text } = Typography;
const { Option } = Select;

const OrderAdd = () => {
  const [orderSizes, setOrdersSizes] = useState([]);
  const [journey, setJourney] = useState(null);
  const [startPointIndex, setStartPointIndex] = useState(null);
  const [endPointIndex, setEndPointIndex] = useState(null);
  const [initialValue, setInitialValue] = useState({})
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
        key={`${point.id}_timeline`}
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
        key={`${point.id}_timeline`}
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

  const configForm = (loadedJourney, loadedOrderSize) => {
    if (loadedJourney.travelPoints.length === 2) {
      setStartPointIndex(0);
      setEndPointIndex(1);
      initialValue.startPoint = 0;
      initialValue.endPoint = 1;
    }
    initialValue.orderSize = loadedOrderSize[1].id
    setJourney(loadedJourney);
    console.log(initialValue)
  };

  useEffect(() => {
    const load = async () => {
      const orderSizesPromise = OrderService.getOrdersSize();
      const journeyPromise = JourneyService.getJourney(journeyId);
      Promise.all([orderSizesPromise, journeyPromise]).then(res => {
        setOrdersSizes(res[0].data);
        configForm(res[1].data, res[0].data);
      })
    };
    load();
  }, [journeyId]);

  const onReset = () => {
    form.resetFields();
    setStartPointIndex(null);
    setEndPointIndex(null);
  };

  const onFinish = (values) => {
    const dto = {
      dispatchPoint: journey.travelPoints[values.startPoint],
      arrivalPoint: journey.travelPoints[values.endPoint],
      orderSize: {id: values.orderSize.toString()},
      owner: {id: jwtdecoder(localStorage.getItem("token")).jti},
      journey: {id: journeyId},
      description: values.description,
      orderValue: values.orderValue,
    }
    console.log(dto)
    OrderService.createOrder(dto).then();
  }

  return (
    <>
      <Title className="Centered">Order create</Title>
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
        ) : null}
      </div>
      {orderSizes.length > 1 && journey ? (
        <Form
          {...layout}
          form={form}
          initialValues={initialValue}
          onFinish={onFinish}
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
              name="orderValue"
              label="Parcel value"
              tooltip="Indicate the value of the parcel so that the carrier knows the possible risks"
              rules={[
                {
                  required: false,
                  type: "number",
                  min: 0,
                },
              ]}
          >
            <InputNumber />
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
            <Space>
              <Button type="primary" htmlType="submit">
                Create
              </Button>
              <Button onClick={onReset}>Reset</Button>
              <Button href="/">Cancel</Button>
            </Space>
          </Form.Item>
        </Form>
      ) : (
        <Spin className="Centered"/>
      )}
    </>
  );
};

export default OrderAdd;
