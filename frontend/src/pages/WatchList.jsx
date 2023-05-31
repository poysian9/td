import React from "react";
import { Col, Typography } from "antd";
import { BreadCrumbs, WatchListTable } from "../components";

const { Title } = Typography;
const WatchList = () => {
  return (
    <Col className="advice-container">
      <Col className="advice-heading-container">
        <BreadCrumbs />
        <Title level={1} className="advice-name">
          Token Watchlist
        </Title>
      </Col>
      <Col>
        <WatchListTable />{" "}
      </Col>
    </Col>
  );
};

export default WatchList;
