import { YMaps, Map, SearchControl, Placemark, Polyline } from 'react-yandex-maps';
import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import 'antd/dist/antd.css';
import '../App.css';
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
    Space,
    Slider
} from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import SearchComplete from "./SearchComplete";
import CustomSlider from "./CustomSlider";
const { Title } = Typography;


function JourneyEdit() {
    const [ymaps, setYmaps] = useState(null);
    const [points, setPoints] = useState([]);
    const [currPoints, setCurrPoints] = useState([]);
    const [add, setAdd] = useState(null);
    const [smallCost, setSmallCost] = useState(0);
    const [avgCost, setAvgCost] = useState(0);
    const [largeCost, setLargeCost] = useState(0);
    const defmapState = {
        center: [55.751574, 37.573856],
        zoom: 5
    };

    const width = 600;
    const height = 500;
    let i = 1;

    function onMapClick(event) {
        let position = event.get('coords');
        console.log(position);
        ymaps.geocode(position)
            .then(result => {
                let newPoints = points.slice();
                let newPoint = result.geoObjects.get(0).properties.getAll();
                newPoint.coordinates = position;
                //setCurrPoints([newPoint]);
                // if (newPoints.length > 0) {
                //     newPoints[newPoints.length - 1] = newPoint;
                // } else {
                //     newPoints.push(newPoint);
                // }
                newPoints.push(newPoint);
                //console.log(currPoints[0]);
                //console.log(points.concat(currPoints)[0]);
                setPoints(newPoints);
                add();
            })
            ;
    }

    const onPointAddSubmit = (values) => {
        //let newPoint = currPoints[0];
        currPoints[0].arrivalDate = values.arrivalDate.format();
        currPoints[0].dispatchDate = values.dispatchDate.format();
        currPoints[0].comment = values.comment;
        let newPoints = points.slice();
        newPoints.push(currPoints[0]);
        setCurrPoints([]);
        setPoints(newPoints);

        console.log('Success:', currPoints[0]);
    };

    const onJourneyFinish = (values) => {
        console.log('Success:', values);
    };

    const [pointsForms] = Form.useForm();

    const onArrivalDateChange = (name, value) => {
        //pointsForms.setFields({name: value});
        console.log(name, value);
    }

    return (
        <div className="App-container">
            <YMaps
                query={{ lang: "ru_RU", load: "package.full", apikey: "c23fb47e-a86c-40a3-95a6-866811b17aff" }}
            >
                <Title level={2} style={{ textAlign: 'center' }}>Create trip</Title>
                <Row justify="space-between">
                    <Col>
                        <Title level={3}>Trip points:</Title>
                        <Form
                            form={pointsForms}
                            colon={false}
                            layout='vertical'
                            name="dynamic_form_nest_item"
                            autoComplete="off"

                        >
                            <Form.List name="points">
                                {(fields, { add, remove }) => (
                                    <>
                                        {fields.map(field => (
                                            <>
                                            <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                                <Title level={3}>{field.name + 1}</Title>
                                                <Form.Item
                                                    {...field}
                                                    label="Point address"
                                                    name={[field.name, 'address']}
                                                    key={[field.fieldKey, 'address']}
                                                    rules={[{ required: true, message: 'Please input point address!', }]}
                                                    style={{ width: 250, display: 'inline-block' }}
                                                >
                                                    <SearchComplete ymaps={ymaps}/>
                                                </Form.Item>
                                                <Form.Item
                                                    {...field}
                                                    label="Arrival date"
                                                    name={[field.name, 'arrivalDate']}
                                                    key={[field.fieldKey, 'arrivalDate']}
                                                    rules={[
                                                        { required: true, message: 'Please input arrival date!', }
                                                    ]}
                                                    style={{ width: 140}}
                                                    tooltip="Time of arrival at this point"
                                                >
                                                    <DatePicker
                                                                showTime
                                                                name={[field.name, 'arrivalDate']}
                                                                onChange={(value) => {
                                                                    onArrivalDateChange(field.name, value)
                                                                }}
                                                    />
                                                </Form.Item>
                                                <Form.Item
                                                    {...field}
                                                    name={[field.name, 'dispatchDate']}
                                                    key={[field.fieldKey, 'dispatchDate']}
                                                    label="Dispatch date"
                                                    rules={[
                                                        { required: true, message: 'Please input dispatch date!', }
                                                    ]}
                                                    style={{ width: 140}}
                                                    tooltip="Departure time from this point"

                                                >
                                                    <DatePicker showTime />
                                                </Form.Item>


                                                <MinusCircleOutlined onClick={() => remove(field.name)} />
                                            </Space>
                                                <Form.Item
                                                    name={[field.name, 'comment']}
                                                    label="Comment"
                                                    tooltip="Comment on this point (tips how to find and so on)"
                                                >
                                                    <Input.TextArea rows={1} />
                                                </Form.Item>
                                            </>

                                        ))}
                                        <Form.Item>
                                            <Button
                                                type="dashed"
                                                onClick={() => add()} block
                                                icon={<PlusOutlined />}>
                                                Add point
                                            </Button>
                                        </Form.Item>
                                    </>
                                )}
                            </Form.List>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </Col>
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

                    </Col>
                </Row>
            </YMaps>
            <Title level={2} style={{ textAlign: 'center' }} className="mt-5"> Trip order info</Title>
            <Form
                colon={false}
                name="journey"
                onFinish={onJourneyFinish}
            >
                <Form.Item
                    name="orderCount"
                    label="The number of orders"
                    tooltip="Indicate the maximum number of orders that you can take on a trip"
                    rules={[
                        {
                            required: true,
                            type: 'number',
                            min: 1,
                        },
                    ]}

                >
                    <InputNumber />
                </Form.Item>
                <CustomSlider name="smallCost" label="Small order cost" max={5000}/>
                <CustomSlider name="avgCost" label="Average order cost" max={10000}/>
                <CustomSlider name="largeCost" label="Large order cost" max={20000}/>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Create journey
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default JourneyEdit