import React from "react";
import { Typography, Row, Col, Statistic } from "antd";
import { Link } from "react-router-dom";
import {
  BreadCrumbs,
  CryptoStats,
  Dailygainers,
  Weeklygainers,
  HomepageTabs,
  CryptoMCap,
} from "../components";
import Explorers from "../components/Explorers";

const { Title } = Typography;

const Homepage = () => {
  return (
    <>
      <BreadCrumbs />

      <Col className="explorers-info">
        <Col className="explorers-value-heading">
          <Title level={2}>Explorers</Title>
        </Col>

        <Col className="explorers">
          {" "}
          <Explorers />
        </Col>
      </Col>

      <Col className="movers">
        <Col span={12} style={{ padding: "10px" }}>
          <Dailygainers />
        </Col>
        <Col span={12} style={{ padding: "10px" }}>
          <Weeklygainers />
        </Col>
      </Col>
      <CryptoStats />
      <HomepageTabs />
    </>
  );
};

export default Homepage;
