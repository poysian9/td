import React from "react";
import { Typography, Row, Col, Statistic } from "antd";
import CryptoMCap from "./CryptoMCap";
import Loader from "./Loader";
import { useGetStatusQuery } from "../services/nomicsApi";

const { Title } = Typography;

const CryptoStats = () => {
  const { data, isFetching } = useGetStatusQuery();

  if (isFetching) return <Loader />;

  return (
    <>
      <Title level={2} className="heading">
        Markets
      </Title>
      <CryptoMCap />
      <Row>
        <Col className="general-container" span={8}>
          <Statistic
            title="Total Active C&B Traded Cryptocurrencies"
            value={data[0]}
          />
        </Col>
        <Col className="general-container" span={8}>
          <Statistic
            title="Total Sell Only C&B Traded Cryptocurrencies"
            value={data[1]}
          />
        </Col>
        <Col className="general-container" span={8}>
          <Statistic
            title="Total Delisted C&B Traded Cryptocurrencies"
            value={data[2]}
          />
        </Col>
      </Row>
    </>
  );
};

export default CryptoStats;
