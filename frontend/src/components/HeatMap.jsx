import React from "react";
import { Col, Typography } from "antd";

const { Title } = Typography;

const HeatMap = () => {
  return (
    <Col className="heatmap-container">
      <Title level={3} className="show-more"></Title>
      <Col>
        <coingecko-coin-heatmap-widget
          height="1000"
          top="100"
          locale="en"
        ></coingecko-coin-heatmap-widget>
      </Col>
    </Col>
  );
};

export default HeatMap;