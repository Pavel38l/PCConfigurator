import { Form, Input, Modal, Typography, Rate} from "antd";
import React, { useEffect, useRef, useState } from "react";
const { Text } = Typography;

const useResetFormOnCloseModal = ({ form, visible }) => {
  const prevVisibleRef = useRef();
  useEffect(() => {
    prevVisibleRef.current = visible;
  }, [visible]);
  const prevVisible = prevVisibleRef.current;
  useEffect(() => {
    if (!visible && prevVisible) {
      form.resetFields();
    }
  }, [visible]);
};

const OrderIssueForm = ({ visible, onCancel }) => {
  const desc = ["terrible", "bad", "normal", "good", "wonderful"];
 
  const [form] = Form.useForm();
  useResetFormOnCloseModal({
    form,
    visible,
  });

  const onOk = () => {
    form.submit();
  };

  return (
    <Modal
      title="Issue check"
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
    >
      <Form form={form} layout="vertical" name="userForm" size="large">
        <Text style={{marginRight: 10}}>please rate the sender:</Text>
        <Form.Item label="Please rate the user's package" name="rate" noStyle>
          <Rate
            style={{ marginLeft: "10" }}
            tooltips={desc}
          />
        
        </Form.Item> 
        <Form.Item dependencies={["rate"]}  noStyle >
          {form => form.getFieldValue("rate") &&  <span className="ant-rate-text">{desc[form.getFieldValue("rate") - 1]}</span> }
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>
      </Form>
      <Text>
        To issue an order, ask the recipient for it, he should come to his phone
        number, enter the password in the check field. Do not issue an order
        without receiving the correct password!
      </Text>
    </Modal>
  );
};

export default OrderIssueForm;
