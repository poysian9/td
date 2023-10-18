import React from "react";
import { BreadCrumbs, CryptoMCap, CryptoTable } from "../components";
import { Typography, Col } from "antd";

const Cryptocurrencies = () => {
  const { Title } = Typography;

  return (
    <Col style={{ paddingLeft: "40px", paddingRight: "40px"}}>
      <Col className="active-heading-container">
        <BreadCrumbs />
        <Title className="semibold-font" level={1}>
          C&B Cryptocurrencies by Market Cap
        </Title>
        <CryptoMCap />
      </Col>
      <CryptoTable />
    </Col>
  );
};

export default Cryptocurrencies;
