import React from "react";
import { Col, Typography } from "antd";
import { BreadCrumbs, WatchListTable, CryptoMCap, Explorers} from "../components";

const { Title } = Typography;
const WatchList = () => {
  return (
    <Col className="advice-container">
      <Col className="advice-heading-container">
        <BreadCrumbs/>
        <Title level={1} className="advice-name">
          Token Watchlist
        </Title>
        <CryptoMCap />
      </Col>
      <Explorers />
      <Col>
        <WatchListTable />{" "}
      </Col>
    </Col>
  );
};

export default WatchList;
