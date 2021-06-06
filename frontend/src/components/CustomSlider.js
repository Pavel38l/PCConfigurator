import React from 'react';
import {Col, Form, InputNumber, Row, Slider} from "antd";


const CustomSlider = ({value = {}, max, onChange }) => {

    return (
        <Row>
            <Col span={12}>
                    <Slider
                        min={1}
                        max={max}
                        onChange={onChange}
                        value={value}
                    />
            </Col>
            <Col span={2}>
                <InputNumber
                    min={1}
                    max={max}
                    style={{ margin: '0 16px' }}
                    value={value}
                    onChange={onChange}
                />
            </Col>
            <Col>$ / 100 km</Col>
        </Row>
    );
}

export default CustomSlider;