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
  Space,
  Descriptions,
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
import FormItem from "antd/lib/form/FormItem";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
const { Option } = Select;

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
    console.log("update user ", updateUser);
    const res = await axios.post(
      `http://localhost:8080/api/v1/user/update`, //поменять
      updateUser
    );
    console.log("update res ", res);
    setUser(updateUser);
    setEdit(!edit);
  };
  if (!user) {
    return <p>loading...</p>;
  }
  return (
    <>
      {!edit ? (
        <Container>
          
          <Descriptions labelStyle={{fontWeight:600}} >
            <Descriptions.Item label="Name">
              {user.firstName} {user.lastName}
            </Descriptions.Item>
            <Descriptions.Item label="Gender">{user.sex}</Descriptions.Item>
            <Descriptions.Item label="Date of birthday">
              {user.dateOfBirth.format("DD-MM-yyyy")}
            </Descriptions.Item>
          </Descriptions>
          <Space align="baseline">
            
            {localStorage.getItem("token") && id === jwtdecoder(localStorage.getItem("token")).jti ? (
              <Tooltip title="Edit">
                <Button
                  type="primary"
                  onClick={() => setEdit(!edit)}
                  icon={<EditOutlined />}
                >
                  Edit
                </Button>
              </Tooltip>
            ) : null}
          </Space>
        </Container>
      ) : (
        <Container>
          <Form
            form={form}
            {...layout}
            name="control-ref"
            onFinish={handleSubmit}
            initialValues={user}
          >
            <h3>Profile</h3>

            <Form.Item name="firstName" label="First name">
              <Input />
            </Form.Item>
            <Form.Item name="lastName" label="Last name">
              <Input />
            </Form.Item>
            <Form.Item name="sex" label="Gender">
              <Select>
                <Option value="male">male</Option>
                <Option value="female">female</Option>
                <Option value="other">other</Option>
              </Select>
            </Form.Item>
            <Form.Item
              noStyle
              shouldUpdate={(prevValues, currentValues) =>
                prevValues.gender !== currentValues.gender
              }
            >
              {({ getFieldValue }) =>
                getFieldValue("gender") === "other" ? (
                  <Form.Item name="customizeGender" label="Customize Gender">
                    <Input />
                  </Form.Item>
                ) : null
              }
            </Form.Item>
            <Form.Item name="dateOfBirth" label="Date of brithday">
              <DatePicker />
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
                Save
              </Button>
            </Form.Item>
          </Form>
        </Container>
      )}
    </>
  );
};
export default Profile;
