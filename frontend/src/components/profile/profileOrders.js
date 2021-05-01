
import {
  Button, Space,
} from "antd";
import Container from "react-bootstrap/Container";
import UserService from "../../services/UserService";
import React, { useState, useEffect } from "react";
import jwtdecoder from "jwt-decode";
import { useParams } from "react-router";
import OrderService from "../../services/OrderService";
import OrderCard from ".././order/OrderCard";

const ProfileOrders = () => {
  const [orders, setOrders] = useState([]);
  const { id } = useParams();
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
        key={order.id}
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
        {ordersTable}
      </Container>
    </>
  );
};
export default ProfileOrders;
