import React from "react";
import JourneyService from "../services/JourneyService";
import Container from "react-bootstrap/Container";
import "antd/dist/antd.css";
import SearchComplete from "./SearchComplete";
import { YMaps } from "react-yandex-maps";
import 'antd/dist/antd.css';
import {
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

class Home extends React.Component {
    formRef = React.createRef();
    constructor(props) {
        super(props);

        this.state = {
            journeys: [],
            ymaps: null,
        }
    }

    componentDidMount() {
        JourneyService.getJourneys().then((response) => {
            this.setState({
                journeys: response.data
            });
        })
    }

    submitHandler = data => {
        const fromPromise = this.state.ymaps.geocode(data.from)
            .then(result => {
                    return result.geoObjects.get(0).geometry.getCoordinates();
                }
            )
        ;
        const toPromise = this.state.ymaps.geocode(data.to)
            .then(result => {
                    return result.geoObjects.get(0).geometry.getCoordinates();
                }
            );
        Promise.all([fromPromise, toPromise]).then(points => {
            console.log(points[0])
            console.log(points[1])
            const filterDto = {
                startTravelPoint: {
                    x: points[0][0],
                    y: points[0][1]
                },
                endTravelPoint: {
                    x: points[1][0],
                    y: points[1][1]
                },
                dispatchDate: data.dispatchDate.format(),
                arrivalDate: data.arrivalDate.format(),
                maxOrderCount: data.maxOrderCount,
                rating: data.rating
            };
            JourneyService.filterJourneys(filterDto).then((res => {
                this.setState({
                    journeys: res.data,
                })
            }))
        }).catch(err => alert('Can\'t find the specified destinations! Please check the entered data!'))
    }

    cancelHandler = event => {
        event.preventDefault();
        JourneyService.getJourneys().then((res => {
            this.setState({
                journeys: res.data
            });
        }));
        this.formRef.current.resetFields();
    }

    render() {

        const journeys = this.state.journeys;
        const journeyTable = journeys.map(
            journey => {
                return (
                    <tr key={journey.id}>
                        <td>{journey.startTravelPoint.address}</td>

                        <td>{journey.endTravelPoint.address}</td>

                        <td>{journey.startTravelPoint.dispatchDate}</td>
                        <td>{journey.startTravelPoint.dispatchDate}</td>
                        <td>{journey.maxOrderCount}</td>
                        {
                            journey.journeyCosts.map(
                                cost =>
                                    <td key={cost.id}>
                                        {cost.cost}
                                    </td>
                            )
                        }
                        <td>
                            <Button variant="outline-success" className="float-right"
                                    href={"journey/" + journey.id}>
                                Details
                            </Button>
                        </td>
                    </tr>
                )
            }
        )

        const onFinishFailed = (errorInfo) => {
            console.log('Failed:', errorInfo);
        };

        const tailLayout = {
            wrapperCol: {
                offset: 4,
                span: 14,
            },
        };
        return (
            <YMaps query={{ lang: "ru_RU", load: "package.full", apikey: "!!!!!!!!!!!!" }}
                   onApiAvaliable={ymaps => {
                       this.setState({
                           ymaps: ymaps,
                       })
                       //this.promise.resolve();
                   }}
            >
            <div>
            <h1 className="mt-5 Align">Service for finding and sending passing links</h1>
             <Container className="mt-5">
                 <Form
                     ref={this.formRef}
                     labelCol={{
                         span: 4,
                     }}
                     wrapperCol={{
                         span: 14,
                     }}
                     name="basic"
                     onFinish={this.submitHandler}
                     onFinishFailed={onFinishFailed}
                 >
                     <Form.Item label="From" style={{ marginBottom: 0 }}>
                         <Form.Item
                             label="Dispatch point"
                             name="from"
                             rules={[{ required: true, message: 'Please input dispatch point address!', }]}
                             style={{ display: 'inline-block', width: 'calc(70% - 8px)' }}
                         >
                             <SearchComplete ymaps={this.state.ymaps}/>
                         </Form.Item>
                         <Form.Item
                             name="dispatchDate"
                             label="Dispatch date"
                             rules={[
                                 { required: true, message: 'Please input dispatch date!', }
                             ]}
                             style={{ display: 'inline-block', width: 'calc(30% - 8px)', margin: '0 8px' }}
                         >
                             <DatePicker showTime/>
                         </Form.Item>
                    </Form.Item>
                     <Form.Item label="To" style={{ marginBottom: 0 }}>
                         <Form.Item
                             label="Arrival point"
                             name="to"
                             rules={[{ required: true, message: 'Please input arrival point address!', }]}
                             style={{ display: 'inline-block', width: 'calc(70% - 8px)' }}
                         >
                             <SearchComplete ymaps={this.state.ymaps}/>
                         </Form.Item>
                         <Form.Item
                             label="Arrival date"
                             name="arrivalDate"
                             rules={[
                                 { required: true, message: 'Please input arrival date!', }
                             ]}
                             style={{ display: 'inline-block', width: 'calc(30% - 8px)', margin: '0 8px' }}
                         >
                             <DatePicker showTime />
                         </Form.Item>
                     </Form.Item>
                     <Form.Item {...tailLayout} >
                         <Form.Item
                             name="rating"
                             label="Min owner rating"
                             tooltip="Each author of the trip has a rating, the higher it is, the more trust in him
                              "
                             rules={[
                                 {
                                     required: false,
                                     type: 'number',
                                     min: 0,
                                 },
                             ]}
                             style={{ display: 'inline-block', width: 'calc(30% - 8px)' }}
                         >
                             <InputNumber />
                         </Form.Item>
                         <Form.Item
                             name="orderCount"
                             label="The number of orders"
                             tooltip="Specify the number of orders to be shipped so as not to display trips that will not accommodate so many orders"
                             rules={[
                                 {
                                     required: false,
                                     type: 'number',
                                     min: 1,
                                 },
                             ]}
                             style={{ display: 'inline-block', width: 'calc(30% - 8px)', margin: '0 8px' }}
                         >
                             <InputNumber />
                         </Form.Item>
                     </Form.Item>


                     <Form.Item {...tailLayout}>
                         <Button type="primary" htmlType="submit" className="mr-2">
                             Filter
                         </Button>
                         <Button htmlType="button"
                                 onClick={this.cancelHandler}

                         >
                             Reset
                         </Button>
                     </Form.Item>
                 </Form>

            </Container>
            <Container className="mt-5">
                <div>
                    <table className = "table table-striped">
                        <thead>
                            <tr>
                            <td> From </td>
                            <td> To </td>
                            <td> First point dispatch date </td>
                            <td> Last point arrival Date </td>
                            <td> Max order count</td>
                            <td> Small order cost </td>
                            <td> Avg order cost </td>
                            <td> Max order cost </td>
                            </tr>
                        </thead>
                        <tbody>
                        {journeyTable}
                        </tbody>
                    </table>
                </div>

            </Container>
            </div>
            </YMaps>
        );
    }
}

export default Home;