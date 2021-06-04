import { useForm } from "antd/lib/form/Form";
import { Row, Col } from "antd";
import {
  Button,
  Tooltip,
  Form,
  Input,
  Select,
  DatePicker,
  Space,
  Descriptions,
} from "antd";

import Container from "react-bootstrap/Container";
import UserService from "../../services/UserService";
import React, { useState, useEffect } from "react";
import jwtdecoder from "jwt-decode";
import moment from "moment";
import { useParams } from "react-router";
import isCurentUser from "../utils/isCurentUser";
import RatingComponent from "../home/RatingComponent";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
const { Option } = Select;
//TODO отзывы в каждом заказе свой, высчитывать на бэке для пользователя только при оценке
const Profile = () => {
  const { id } = useParams();
  const [form] = useForm();
  const [user, setUser] = useState(null);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    const load = async () => {
      const response = await UserService.getUserById(id);
      response.data.dateOfBirth = moment(response.data.dateOfBirth);
      setUser(response.data);
    };
    load();
  }, [id]);

  const handleSubmit = async (data) => {
    const updateUser = { ...user, ...data };
    const res = await UserService.userUpdate(updateUser);
    setUser(updateUser);
    setEdit(!edit);
  };
  const cancelSubmit = () => {
    setEdit(!edit);
  };
  if (!user) {
    return <p>loading...</p>;
  }
 
  return (
    <>
      {!edit ? (
        <Container>
          <Descriptions labelStyle={{ fontWeight: 600 }}>
            <Descriptions.Item label="Name">
              {user.firstName} {user.lastName}
            </Descriptions.Item>
            <Descriptions.Item label="Gender">{user.sex}</Descriptions.Item>
            <Descriptions.Item label="Date of birthday">
              {user.dateOfBirth.format("DD-MM-yyyy")}
            </Descriptions.Item>
            <Descriptions.Item label="Rating">
              <RatingComponent value={user.rating / 20} />
            </Descriptions.Item>
          </Descriptions>
          <Space align="baseline">
            {isCurentUser(jwtdecoder(localStorage.getItem("token")).jti) ? (
              <Tooltip title="Edit">
                <Button type="primary" onClick={() => setEdit(!edit)}>
                  Edit
                </Button>
              </Tooltip>
            ) : null}
          </Space>
        </Container>
      ) : (
        <Form
          form={form}
          {...layout}
          name="control-ref"
          onFinish={handleSubmit}
          initialValues={user}
          colon={false}
        >
          <Form.Item name="firstName" label="First name">
            <Input />
          </Form.Item>
          <Form.Item name="lastName" label="Last name">
            <Input />
          </Form.Item>
          <Form.Item
            name="sex"
            label="Sex"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select>
              <Option value="male">male</Option>
              <Option value="female">female</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="dateOfBirth"
            label="Date of birthday"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <DatePicker />
          </Form.Item>
          <Row>
            <Col offset={8}>
              <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                  Save
                </Button>
              </Form.Item>
            </Col>
            <Form.Item {...tailLayout}>
              <Button htmlType="submit" onClick={() => cancelSubmit()}>
                Cancel
              </Button>
            </Form.Item>
          </Row>
        </Form>
      )}
    </>
  );
};
export default Profile;
