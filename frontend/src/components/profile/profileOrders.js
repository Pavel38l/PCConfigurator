
import {
  Button, Empty, Select
} from "antd";
import Container from "react-bootstrap/Container";
import UserService from "../../services/UserService";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import OrderService from "../../services/OrderService";
import OrderCard from ".././order/OrderCard";
import isCurentUser from "../utils/isCurentUser";
const { Option } = Select;
const ProfileOrders = ({activeKey}) => {
  const [orders, setOrders] = useState([]);
  const { id } = useParams();
  const [status, setStatus] = useState([]);
  const load = async () => {
    const response = await UserService.getUserOrders(id);
    setOrders(response.data);
  };
  const deleteOrder = async (id) => {
    try {
      await OrderService.deleteOrder(id);
      await load();
    } catch (error) {
    }
  };
  
  const handleSelect = (value) => {
    setStatus(value);
  }
  //TODO создание заказа самому себе исправить

  const ordersTable = orders.length ? (
      orders.map((order) => {
        return (
            <>
              {status.some((elem) => elem === order.orderStatus.name) || status.length == 0 ? (
                <OrderCard
                  key={order.id}
                  order={order}
                  button={
                    isCurentUser(id) ? (
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
                  rate={isCurentUser(id)}
                />
              ) : (<Empty />)}
          </>
        );
      })
  ) : (<Empty />);

  useEffect(() => {
    load();
  }, [id, activeKey]);

  return (
    <>
    {orders.length ? (
      <Container className="mt-5">
        <Select
          mode="multiple"
          style={{ width: "30%" }}
          placeholder="Select status order"
          onChange={handleSelect}
          optionLabelProp="label"
        >
          <Option value="offered" label="Offered">
            Offered
          </Option>
          <Option value="defined" label="Defined">
            Defined
          </Option>
          <Option value="completed" label="Completed">
            Completed
          </Option>
        </Select>
        {ordersTable}
      </Container>
    ): (<Empty />)
    } 
    </>
  );
};
export default ProfileOrders;
