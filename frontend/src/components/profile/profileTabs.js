import {
  Tabs,
} from "antd";
import React, { useState } from "react";
import Profile from "./profile";
import ProfileJourneys from "./profileJourneys";
import ProfileOrders from "./profileOrders";
import ProfileOtherOrders from "./profileOtherOrders";
import { useLocation } from "react-router-dom";


const ProfileTabs = () => {
  const { TabPane } = Tabs;
  const [activeKey, setActiveKey] = useState("1");
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  console.log(searchParams);
  // activeKey={searchParams.get("activeTab")}
  //TODO добавить activeKey в остальные табы

  return (
    <>
      <h3>Profile</h3>
      <Tabs activeKey={activeKey} onTabClick={(key) => setActiveKey(key)}>
        <TabPane tab="User info"  key="1">
          <Profile></Profile>
        </TabPane>
        <TabPane tab="Journeys" key="2">
          <ProfileJourneys activeKey={activeKey}></ProfileJourneys>
        </TabPane>
        <TabPane tab="Orders" activeKey={activeKey} key="3">
          <ProfileOrders></ProfileOrders>
        </TabPane>
        <TabPane tab="Delivery requests" activeKey={activeKey} key="4">
          <ProfileOtherOrders></ProfileOtherOrders>
        </TabPane>
      </Tabs>
    </>
  );
};
export default ProfileTabs;
