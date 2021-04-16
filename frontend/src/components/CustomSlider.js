import React, { useState, useEffect } from 'react';
import {Col, Form, InputNumber, Row, Slider} from "antd";


function CustomSlider(props) {
    const [value, setValue] = useState(0);
    const onChange = value => {
        setValue(value);
    };
    return (
        <Row>
            <Col span={12}>
                <Form.Item
                    name={props.name}
                    label={props.label}
                    rules={[
                        {
                            required: true,
                            type: 'number',
                            min: 1,
                        },
                    ]}
                >
                    <Slider
                        min={1}
                        max={props.max}
                        onChange={onChange}
                        value={value}
                    />
                </Form.Item>
            </Col>
            <Col span={4}>
                <InputNumber
                    min={1}
                    max={props.max}
                    style={{ margin: '0 16px' }}
                    value={value}
                    onChange={onChange}
                />
            </Col>
        </Row>
    );
}

export default CustomSlider;