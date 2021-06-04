import React, { useState } from "react";
import { Modal, Button, Rate, Form } from "antd";
import OrderService from "../../services/OrderService";
import UserService from "../../services/UserService";

const RateJourney = ({ id, idJourney }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const desc = ["terrible", "bad", "normal", "good", "wonderful"];
  const [value, setValue] = useState(3);

  const [form] = Form.useForm();
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    const ownerJourney = await OrderService.getJourneyOwnerId(idJourney);
    await OrderService.rateJourney(id, value);
    await UserService.updateRating(ownerJourney.data.id);
    setIsModalVisible(false);
  };
  const handleChange = (value) => {
    setValue(value);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <>
      <Button type="primary" onClick={showModal}>
        Rate
      </Button>
      <Modal
        title="Rate order delivery"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical" name="userForm" size="large">
          <Form.Item label="Please rate order delivery:">
            <Rate
              style={{ marginLeft: "10" }}
              tooltips={desc}
              onChange={handleChange}
              value={value}
            />
            {value ? (
              <span className="ant-rate-text">{desc[value - 1]}</span>
            ) : (
              ""
            )}
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default RateJourney;
