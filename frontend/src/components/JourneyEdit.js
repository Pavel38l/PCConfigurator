import {YMaps, Map, SearchControl, Placemark, Polyline} from 'react-yandex-maps';
import React, { useState, useEffect } from "react";
import {Container} from "react-bootstrap";
import 'antd/dist/antd.css';
import {
    Typography,
    Form,
    Input,
    Button,
    DatePicker,
    InputNumber,
    TreeSelect,
    Switch,
    Row,
    Col,
} from 'antd';
const { Title } = Typography;


function JourneyEdit() {
    const [ymaps, setYmaps] = useState(null);
    const [points, setPoints] = useState([]);
    const defmapState = {
        center: [55.751574, 37.573856],
        zoom: 5
    };

    const width = 700;
    const  height= 300;
    let i = 1;

    function onMapClick(event) {
        let position = event.get('coords');
        ymaps.geocode(position)
            .then(result => {
                let newPoints = points.slice();
                let newPoint = result.geoObjects.get(0).properties.getAll();
                newPoint.coordinates = position;
                if (newPoints.length > 0) {
                    newPoints[newPoints.length - 1] = newPoint;
                } else {
                    newPoints.push(newPoint);
                }

                console.log(newPoint);
                setPoints(newPoints);
                console.log(points);
            })
        ;
    }

    const onPointAddSubmit = (values) => {
        console.log('Success:', values);
    };

    return (
        <Container className="mt-5">
            <YMaps
                query={{ lang: "ru_RU", load: "package.full", apikey: "c23fb47e-a86c-40a3-95a6-866811b17aff" }}
            >
                <Title style={{textAlign: 'center' }}>Create trip</Title>
                <Row>
                    <Col>
                        <Map
                            defaultState={defmapState}
                            width={width}
                            height={height}
                            onClick={onMapClick.bind(this)}
                            onLoad={ymaps => setYmaps(ymaps)}
                        >
                            <SearchControl
                                options={{ provider: 'yandex#search' }}
                            />
                            {points.map(point =>
                                <Placemark
                                    key={i++}
                                    geometry={point.coordinates}
                                    properties={{
                                        hintContent: point.text,
                                        balloonContent: point.balloonContent,
                                        iconContent: i
                                    }}
                                    options={{
                                        draggable: false
                                    }}
                                />
                            )}
                            <Polyline
                                geometry={
                                    points.map(point =>
                                        point.coordinates
                                    )
                                }
                                options={{
                                    balloonCloseButton: false,
                                    strokeColor: '#1E90FF',
                                    strokeWidth: 4,
                                    strokeOpacity: 0.5,
                                }}
                            />
                        </Map>
                        <Form
                            onFinish={onPointAddSubmit}
                        >
                            <Row justify="space-between">
                                <Form.Item
                                    name="dispatchDate"
                                    label="Dispatch date"
                                    rules={[
                                        { required: true, message: 'Please input dispatch date!', }
                                    ]}
                                    style={{ display: 'inline-block' }}
                                    tooltip="Time of arrival at this point"
                                >
                                    <DatePicker showTime/>
                                </Form.Item>
                                <Form.Item
                                    label="Arrival date"
                                    name="arrivalDate"
                                    rules={[
                                        { required: true, message: 'Please input arrival date!', }
                                    ]}
                                    style={{ display: 'inline-block' }}
                                    tooltip="Departure time from this point"
                                >
                                    <DatePicker showTime />
                                </Form.Item>
                                <Form.Item

                                >
                                    <Button type="primary" htmlType="submit" style={{marginTop: '40px'}}>
                                        Add point
                                    </Button>
                                </Form.Item>
                            </Row>
                            <Form.Item
                                name="comment"
                                label="Comment"
                                tooltip="Comment on this point (tips how to find and so on)"

                            >
                                <Input.TextArea />
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </YMaps>
        </Container>
    )
}

export default JourneyEdit