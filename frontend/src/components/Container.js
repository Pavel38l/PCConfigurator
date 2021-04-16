import { Card } from "antd";
import React from "react";

const PageContainer = ({ children }) => {
  return <Card style={{ margin: 10 }}>{children}</Card>;
};
export default PageContainer;
