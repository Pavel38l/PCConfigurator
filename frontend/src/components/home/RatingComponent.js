import React from "react";
import { Typography } from 'antd';
const { Text } = Typography;

function RatingComponent(props) {
    let status = 'secondary';
    if (props.value < 2) {
        status='danger';
    } else if(props.value >= 2 && props.value < 4) {
        status='warning';
    } else if(props.value >= 4) {
        status='success';
    }
    return (
        <Text type={status}>{props.value}</Text>
    );
}

export default RatingComponent;