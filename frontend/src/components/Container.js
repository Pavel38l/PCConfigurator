import { Card, Layout } from "antd";
import React from "react";

const PageContainer = ({ children }) => {
  return <Layout.Content className="page-container" >{children}</Layout.Content>;
};
export default PageContainer;
