import { useForm } from "antd/lib/form/Form";

import { Button, Select, Empty} from "antd";
import Container from "react-bootstrap/Container";
import UserService from "../../services/UserService";
import React, { useState, useEffect } from "react";
import jwtdecoder from "jwt-decode";
import { useParams } from "react-router";
import OrderService from "../../services/OrderService";
import OrderCard from ".././order/OrderCard";
import isCurentUser from "../utils/isCurentUser";



const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
const { Option } = Select;
const ProfileOtherOrders = ({activeKey}) => {
  const [orders, setOrders] = useState([]);
  const { id } = useParams();
  const load = async () => {
    const response = await UserService.getUserOtherOrders(id);
    setOrders(response.data);
  };
  const acceptOrder = async (id) => {
    try {
      await OrderService.acceptOrder(id);
      await load();
    } catch (error) {
      console.error("update status order: ", error);
    }
  };
  const cancelOrder = async (id) => {
    try {
      await OrderService.cancelOrder(id);
      await load();
    } catch (error) {
      console.error("update status order: ", error);
    }
  };
  
  const ordersTable = orders.length ? ( orders.map((order) => {
    return (
      <>
        {order.orderStatus.name === "offered" ? (
          <OrderCard
            key={order.id}
            order={order}
            acceptbutton={
              isCurentUser(id) ? (
                <Button
                  variant="outline-success"
                  className="float-right"
                  type="primary"
                  onClick={() => acceptOrder(order.id)}
                >
                  Accept
                </Button>
              ) : null
            }
            button={
              isCurentUser(id) ? (
                <Button
                  variant="outline-success"
                  className="float-right"
                  danger
                  onClick={() => cancelOrder(order.id)}
                >
                  Decline
                </Button>
              ) : null
            }
          />
        ) : null}
      </>
    );
  })) : (<Empty />);

  useEffect(() => {
    load();
  }, [id, activeKey]);

  return (
    <>
      <Container className="mt-5">{ordersTable}</Container>
    </>
  );
};
export default ProfileOtherOrders;
