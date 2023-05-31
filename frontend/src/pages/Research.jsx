import React from "react";
import { Col, Typography } from "antd";
import ResearchTable from "../components/ResearchTable";
import { BreadCrumbs } from "../components";

const { Title } = Typography;
const Research = () => {
  return (
    <Col className="advice-container">
      <Col className="advice-heading-container">
        <BreadCrumbs />
        <Title level={1} className="advice-name">
          Types of Approved Messages to Clients
        </Title>
      </Col>
      <Col>
        <ResearchTable />
      </Col>
    </Col>
  );
};

export default Research;
