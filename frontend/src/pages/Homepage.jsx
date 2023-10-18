import React from "react";
import { Typography, Col } from "antd";
import {
  CryptoStats,
  Dailygainers,
  Weeklygainers,
  HomepageTabs,
} from "../components";
import Explorers from "../components/Explorers";

const { Title } = Typography;

const Homepage = () => {
  return (
    <Col style={{ marginLeft: "30px", marginRight: "30px", marginTop: "20px" }}>
      <Col style={{ padding: "10px" }}>
        <Col className="explorers-value-heading">
          <Title className="semibold-font" level={2}>Explorers</Title>
        </Col>

        <Col className="explorers">
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
      <Col style={{ padding: "10px" }}>
        <CryptoStats />
      </Col>
      <Col style={{ padding: "10px" }}>
        <HomepageTabs />
      </Col>
    </Col>
  );
};

export default Homepage;
