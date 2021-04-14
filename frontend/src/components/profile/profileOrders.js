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
} from "antd";
import axios from "axios";
import { EditOutlined, SaveOutlined } from "@ant-design/icons";
import Container from "react-bootstrap/Container";
import UserService from "../../services/UserService";
import React, { useState, useEffect } from "react";
import jwtdecoder from "jwt-decode";
import { useParams } from "react-router";
import OrderService from "../../services/OrderService";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
const { Option } = Select;
const ProfileOrders = () => {
  const [orders, setOrders] = useState([]);
  const { id } = useParams();
  const [form] = useForm();
  const [edit, setEdit] = useState(false);
  const deleteOrder = async (id) => {
    try {
      await OrderService.deleteOrder(id);
      
    }
    catch (error){
        console.error("delete order: ", error);
    } 
  };  
  const ordersTable = orders.map((orders) => {
    return (
      <tr key={orders.id}>
        <td>{orders.arrivalPoint.address}</td>
        <td>{orders.dispatchPoint.address}</td>
        <td>{orders.orderValue}</td>
        <td>{orders.orderStatus.name}</td>
        <td>
          <div style={{ display: "flex" }}>
            <Button
              variant="outline-success"
              className="float-right"
              style={{ marginRight: 10 }}
            >
              Details
            </Button>

            {id === jwtdecoder(localStorage.getItem("token")).jti ? (
              <Button variant="outline-success" className="float-right" danger onClick={() => deleteOrder(orders.id) }>
                Delete
              </Button>
            ) : null}
          </div>
        </td>
      </tr>
    );
  });

  useEffect(() => {
    const load = async () => {
      const response = await UserService.getUserOrders(id);
      setOrders(response.data);
    };
    load();
  }, [id]);

  return (
    <>
      <h3>Profile</h3>

      <Container className="mt-5">
        <div>
          <table className="table table-striped">
            <thead>
              <tr>
                <td> From </td>
                <td> To </td>
                <td> Order Value </td>
                <td> Order Status </td>
              </tr>
            </thead>
            <tbody>{ordersTable}</tbody>
          </table>
        </div>
      </Container>
    </>
  );
};
export default ProfileOrders;
