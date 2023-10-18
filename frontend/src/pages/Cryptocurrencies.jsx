import React from "react";
import { BreadCrumbs, CryptoMCap, Explorers, CryptoTable } from "../components";
import { Typography, Col } from "antd";

const Cryptocurrencies = () => {
  const { Title } = Typography;

  return (
    <Col>
      <Col className="active-heading-container">
        <BreadCrumbs />
        <Title className="semibold-font" level={1}>
          C&B Cryptocurrencies by Market Cap
        </Title>
        <CryptoMCap />
      </Col>
      {/* <Explorers /> */}
      <CryptoTable />
    </Col>
  );
};

export default Cryptocurrencies;
