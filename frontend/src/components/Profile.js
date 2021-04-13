import { Tabs, Button, Tooltip, Form, Input, Checkbox, Select, DatePicker } from 'antd';
import axios from 'axios';
import { EditOutlined, SaveOutlined } from '@ant-design/icons';
import Container from "react-bootstrap/Container";
import UserService from "../services/UserService"
import React, { useState, useEffect } from "react";
import Image from "react-bootstrap/Image";
import jwtdecoder from 'jwt-decode';
import moment from 'moment';
import { useParams } from 'react-router';



class Profile extends React.Component {
    formRef = React.createRef();
    constructor(props) {
        super(props);

        this.state = {
            user: null,
            edit: true,
            journeys: [],
            orders: [],
        }
    }

    componentDidMount() {
        UserService.getUserById(this.props.userId).then((response) => {
            response.data.dateOfBirth = moment(response.data.dateOfBirth);
            this.setState({
                user: response.data

            });
            console.log(this.state.user)
        })
        UserService.getUserOrders(this.props.userId).then((response) => {
            this.setState({
                orders: response.data

            });
            console.log(this.state.orders)
        })
        UserService.getUserJourneys(this.props.userId).then((response) => {
            this.setState({
                journeys: response.data
            });
            console.log(this.state.journeys)

        })


    }
    toggleEdit = () => {
        this.setState(prev => ({
            edit: !prev.edit
        }))
    }
    handleSubmit = async data => {
        const updateUser = { ...this.state.user, ...data };
        console.log(updateUser);
        axios.post(`http://localhost:8080/api/v1/user/update`, updateUser)
            .then(res => {
                console.log(res);

                this.toggleEdit();
                this.setState({
                    user: updateUser
                })


            }).catch(e => {
                alert(e.message);
            })

    }
    deliteJourney = id => {
        axios.delete(`/api/v1/journey/${id}`)
    }

    render() {
        const { TabPane } = Tabs;
        const journeys = this.state.journeys;
        const orders = this.state.orders;
        const user = this.state.user;
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
                            {(this.props.userId === jwtdecoder(localStorage.getItem("token")).jti && !this.state.edit) ? (
                                <Button variant="outline-success" className="float-right" danger
                                >
                                    Delete
                                </Button>
                            ) : (
                                <Button variant="outline-success" className="float-right"
                                >
                                    Details
                                </Button>
                            )
                            }
                        </td>



                    </tr>
                )
            }

        )
        const ordersTable = orders.map(
            orders => {
                return (
                    <tr key={orders.id}>
                        <td>{orders.arrivalPoint.address}</td>
                        <td>{orders.dispatchPoint.address}</td>
                        <td>{orders.orderValue}</td>
                        <td>{orders.orderStatus.name}</td>
                        <td>
                            {this.props.userId === jwtdecoder(localStorage.getItem("token")).jti && !this.state.edit ? (
                                <Button variant="outline-success" className="float-right" danger
                                >
                                    Delite
                                </Button>
                            ) : (
                                <Button variant="outline-success" className="float-right"
                                >
                                    Details
                                </Button>
                            )
                            }

                        </td>
                    </tr>
                )
            }

        )
        if (this.state.edit) {
            return user ? (
                <Container className="mt-5">
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="Profile" key="1">

                            <h3>Profile</h3>
                            {this.props.userId === jwtdecoder(localStorage.getItem("token")).jti ? (
                                <Tooltip title="Edit">
                                    <Button type="primary" onClick={this.toggleEdit} icon={<EditOutlined />} >
                                        Edit
                                </Button>
                                </Tooltip>
                            ) : null
                            }

                            <p>Name: {user.firstName} {user.lastName}</p>
                            <p>Gender: {user.sex}</p>
                            <p>Date of birthday: {user.dateOfBirth.format("DD-MM-yyyy")}</p>


                            <Image src="">
                            </Image>

                        </TabPane>
                        <TabPane tab="Journeys" key="2">
                            <Container className="mt-5">
                                <div>
                                    <table className="table table-striped">
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
                        </TabPane>
                        <TabPane tab="Orders" key="3">
                            <Container className="mt-5">
                                <div>
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <td> From </td>
                                                <td> To </td>
                                                <td> Order Value </td>
                                                <td> Order Status </td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {ordersTable}
                                        </tbody>
                                    </table>
                                </div>

                            </Container>
                        </TabPane>
                    </Tabs>
                </Container>
            ) : (<div>loading...</div>);
        }
        else {
            const layout = {
                labelCol: { span: 8 },
                wrapperCol: { span: 8 },
            };
            const tailLayout = {
                wrapperCol: { offset: 8, span: 16 },
            };
            const { Option } = Select;
            return (
                <Container className="mt-5">
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="Profile" key="1">

                            <h3>Profile</h3>

                            <Form {...layout} ref={this.formRef} name="control-ref" onFinish={this.handleSubmit} initialValues={user}>
                                <Form.Item name="firstName" label="First name" >
                                    <Input />
                                </Form.Item>
                                <Form.Item name="lastName" label="Last name" >
                                    <Input />
                                </Form.Item>
                                <Form.Item name="sex" label="Gender" >
                                    <Select >
                                        <Option value="male">male</Option>
                                        <Option value="female">female</Option>
                                        <Option value="other">other</Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    noStyle
                                    shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
                                >
                                    {({ getFieldValue }) =>
                                        getFieldValue('gender') === 'other' ? (
                                            <Form.Item name="customizeGender" label="Customize Gender" >
                                                <Input />
                                            </Form.Item>
                                        ) : null
                                    }
                                </Form.Item>
                                <Form.Item name="dateOfBirth" label="Date of brithday">
                                    <DatePicker />
                                </Form.Item>

                                <Form.Item {...tailLayout}>
                                    <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
                                        Save
                                         </Button>
                                </Form.Item>
                            </Form>

                        </TabPane>
                        <TabPane tab="Journeys" key="2">
                            <Container className="mt-5">
                                <div>
                                    <table className="table table-striped">
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
                        </TabPane>
                        <TabPane tab="Orders" key="3">
                            <Container className="mt-5">
                                <div>
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <td> From </td>
                                                <td> To </td>
                                                <td> Order Value </td>
                                                <td> Order Status </td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {ordersTable}
                                        </tbody>
                                    </table>
                                </div>

                            </Container>
                        </TabPane>
                    </Tabs>
                </Container >
            );
        }
    }
}
const ProfileWrapper = () => {
    const { id } = useParams();
    return (
        <Profile userId={id}></Profile>
    )
}

export default ProfileWrapper