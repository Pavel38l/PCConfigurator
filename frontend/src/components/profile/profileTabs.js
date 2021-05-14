import { Tabs } from "antd";
import React, { useState } from "react";
import Profile from "./profile";
import ProfileJourneys from "./profileJourneys";
import ProfileOrders from "./profileOrders";
import ProfileOtherOrders from "./profileOtherOrders";
import { useLocation } from "react-router-dom";

const ProfileTabs = () => {
  const { TabPane } = Tabs;
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const [activeKey, setActiveKey] = useState(
    searchParams.get("activeTab") ? searchParams.get("activeTab") : "1"
  );
  //TODO добавить activeKey в остальные табы

  return (
    <>
      <h3>Profile</h3>
      <Tabs activeKey={activeKey} onTabClick={(key) => setActiveKey(key)}>
        <TabPane tab="User info" key="1">
          <Profile></Profile>
        </TabPane>
        <TabPane tab="Journeys" key="2">
          <ProfileJourneys activeKey={activeKey}></ProfileJourneys>
        </TabPane>
        <TabPane tab="Orders" key="3">
          <ProfileOrders activeKey={activeKey}></ProfileOrders>
        </TabPane>
        <TabPane tab="Delivery requests" key="4">
          <ProfileOtherOrders activeKey={activeKey}></ProfileOtherOrders>
        </TabPane>
      </Tabs>
    </>
  );
};
export default ProfileTabs;
