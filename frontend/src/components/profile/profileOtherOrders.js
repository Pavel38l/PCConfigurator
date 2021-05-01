import { useForm } from "antd/lib/form/Form";

import {
  Tabs,
  Tag,
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
import jwtdecoder from "jwt-decode";
import { useParams } from "react-router";
import OrderService from "../../services/OrderService";
import OrderCard from ".././order/OrderCard";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
const { Option } = Select;
const ProfileOtherOrders = () => {
  const [orders, setOrders] = useState([]);
  const { id } = useParams();
  const [form] = useForm();
  const [edit, setEdit] = useState(false);
  const load = async () => {
    const response = await UserService.getUserOrders(id);
    setOrders(response.data);
    console.log(response.data);
  };
  const deleteOrder = async (id) => {
    try {
      await OrderService.deleteOrder(id);
      await load();
    } catch (error) {
      console.error("delete order: ", error);
    }
  };
  const ordersTable = orders.map((order) => {
    console.log(order);
    return (
      <OrderCard
        orderProfile={order}
        button={
          localStorage.getItem("token") &&
          id === jwtdecoder(localStorage.getItem("token")).jti ? (
            <Button
              variant="outline-success"
              className="float-right"
              danger
              onClick={() => deleteOrder(order.id)}
            >
              Delete
            </Button>
          ) : null
        }
      />
    );
  });

  useEffect(() => {
    load();
  }, [id]);

  return (
    <>
      <Container className="mt-5">
        <div>
          <table className="table table-striped">
            <tbody>{ordersTable}</tbody>
          </table>
        </div>
      </Container>
    </>
  );
};
export default ProfileOtherOrders;
