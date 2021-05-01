import React from "react";
import { Typography } from 'antd';
const { Text } = Typography;

function RatingComponent(props) {
    let status = 'secondary';
    if (props.value < 0) {
        status='danger';
    } else if(props.value >= 0 && props.value < 50) {
        status='warning';
    } else if(props.value >= 100) {
        status='success';
    }
    return (
        <Text type={status}>{props.value}</Text>
    );
}

export default RatingComponent;