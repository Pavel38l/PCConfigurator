import React, { useState, useEffect } from "react";

import {
  Typography,
  Form,
  Select,
  Input,
  Button,
  Space,
  Steps,
  Timeline,
  Checkbox,
} from "antd";
import OrderService from "../services/OrderService";
import "antd/dist/antd.css";

const { Title, Text } = Typography;
const { Option } = Select;
const { Step } = Steps;

const OrderAdd = () => {
  const [orderSizes, setOrdersSizes] = useState([]);
  const [form] = Form.useForm();
  const layout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 10 },
  };

  const tailLayout = {
    wrapperCol: {
      offset: 3,
      span: 10,
    },
  };

  useEffect(() => {
    const load = async () => {
      const response = await OrderService.getOrdersSize();
      setOrdersSizes(response.data);
    };
    load();
  });

  return (
    <>
      <Title className="App">Order create</Title>
      <Steps size="small" progressDot>
        <Step title="Finished" status="finish" />
        <Step title="In Progress" status="finish" />
        <Step title="Waiting" status="finish" />
      </Steps>
      <Form
        {...layout}
        form={form}
        name="order"
        colon={false}
        style={{ marginTop: 50 }}
      >
        <Form.Item >
          <Timeline mode={"left"}>
            <Timeline.Item label={<Checkbox></Checkbox>}>
              Solve initial network problems 2015-09-01
            </Timeline.Item>
            <Timeline.Item>
              Solve initial network problems 2015-09-01
            </Timeline.Item>
            <Timeline.Item>Technical testing 2015-09-01</Timeline.Item>
            <Timeline.Item>
              Network problems being solved 2015-09-01
            </Timeline.Item>
          </Timeline>
        </Form.Item>
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
