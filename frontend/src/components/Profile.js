import { Tabs } from 'antd';
import 'antd/dist/antd.css';
import Container from "react-bootstrap/Container";
import React, { useState, useEffect } from "react";
import {
    useParams
} from "react-router-dom";
import UserService from "../services/UserService";
import Image from "react-bootstrap/Image";

function Profile() {
    const { TabPane } = Tabs;
    const [user, setUser] = useState('');

    let { id } = useParams();
    console.log(id);
    useEffect(() => {
        UserService.getUserById(id).then((response) => {
            setUser(response.data);
        })
    });

    UserService.getUsers()
    return (
        <Container className="mt-5">
            <Tabs defaultActiveKey="1">
                <TabPane tab="Profile" key="1">
                    Profile
                    <Image src="">
                    </Image>
                    <p>{user.email}</p>
                </TabPane>
                <TabPane tab="Journeys" key="2">
                    Journeys
                </TabPane>
                <TabPane tab="Orders" key="3">
                    Orders
                </TabPane>
            </Tabs>
        </Container>
    );
}

export default Profile