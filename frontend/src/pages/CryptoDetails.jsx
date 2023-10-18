import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Col,
  Row,
  Typography,
  Select,
} from "antd";
import prettyNum, { PRECISION_SETTING } from "pretty-num";
import Loader from "../components/Loader";
import LineChart from "../components/LineChart";
import {
  useGetCoinDataQuery,
  useGetCoinCSVDataQuery,
} from "../services/nomicsApi";
import MarketDepth from "../components/MarketDepth";
import { BreadCrumbs } from "../components";
import GoBack from "../components/GoBack";
import CryptoInfo from "../components/CryptoInfo";
import Alerts from "../components/Alerts";
import KeyMetrics from "../components/KeyMetrics";

const CryptoDetails = () => {
  const { Title } = Typography;
  const { Option } = Select;
  const { id } = useParams();
  const [loading, setLoading] = useState(true); //
  const [, setError] = useState(null);
  const time = ["24h", "7d", "30d", "1y", "Max"];
  const [timePeriod, setTimePeriod] = useState("24h");

  const { data: cryptoDetails } = useGetCoinDataQuery({ id });
  const { data: assetData } = useGetCoinCSVDataQuery({ id });

  const [coinHistory, setcoinHistory] = useState("");
  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + `/cryptodata/${timePeriod}/${id}`)
      .then((res) => res.json())
      .then((coinHistory) => {
        setcoinHistory(coinHistory);
      })

      .finally(() => setLoading(false));
  }, [id, timePeriod]);

  const [messariData, setMessariData] = useState("");
  useEffect(() => {
    fetch(
      process.env.REACT_APP_API_URL + `/messari/assets/${id}`
    )
      .then((res) => res.json())
      .then((data) => {
        setMessariData(data);
      })
      .catch((error) => {
        return setError(error);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loader />;

  const changeTime = (time) => {
    if (time === "max") {
      return "";
    }
  
    const timeMap = {
      "24h": cryptoDetails?.price_change_percentage_24h,
      "7d": cryptoDetails?.price_change_percentage_7d,
      "30d": cryptoDetails?.price_change_percentage_30d,
      "1y": cryptoDetails?.price_change_percentage_1y,
    };
  
    const change = timeMap[time];
  
    return (
      <>
        Change:{" "}
        {prettyNum(change, {
          precision: 2,
          precisionSetting: PRECISION_SETTING.FIXED,
        })}{" "}
        %
      </>
    );
  };

  return cryptoDetails && assetData ? (
    // Overall Container
    <Col style={{paddingLeft: "40px", paddingRight: "40px"}}>
      {/* // {Crypto Profile Container} */}
      <Row>
        <Col className="coin-status-container" span={11} style={{ paddingLeft: 20 }}>
          <Alerts assetData={assetData} />
          <Row className="general-container">
            <BreadCrumbs />
          </Row> 
          <CryptoInfo
            cryptoDetails={cryptoDetails}
            assetData={assetData}
            messariData={messariData}  
          />
        </Col>
        <Col className="coin-heading-container" span={11} offset={2} style={{ marginTop: 80 }}>
          <KeyMetrics
            cryptoDetails={cryptoDetails}
            assetData={assetData}
            messariData={messariData}
          />
        </Col>
      </Row>

      {/* // {Crypto Chart Container} */}
      <Col className="chart-padding-center">
          <Col className="chart-header">
            <Title level={2} className="coin-profile-heading" style={{ marginTop: 'auto', color: "#002035" }}>
              Price Chart
            </Title>
            <Row>
              <Select //Set up a select box that will be used to change time period of the chart
                defaultValue="24h"
                className="select-timeperiod"
                placeholder="Select Timeperiod"
                onChange={(value) => setTimePeriod(value)}
              >
                {time.map((date) => (
                  <Option key={date}>{date}</Option>
                ))}
              </Select>
            </Row>
          </Col>
          <Col className="chart-container">
            <Col className="chart-container-center">
              <LineChart
                coinHistory={coinHistory ? coinHistory : ""}
                changeData={changeTime(timePeriod)}
              />
          </Col>

        </Col>
        {/* Market Depth */}
        <Col className="market-depth">
          <Title level={2} className="semibold-font" style={{ color: "#002035" }}>
            Market Depth
          </Title>
          <Col className="chart-padding-center">
            {assetData.coingeckoid ? (
              <MarketDepth coinid={assetData.coingeckoid} />
            ) : (
              ""
            )}
          </Col>
        </Col>
      </Col>
    </Col>
  ) : (
    <GoBack/>
      );
};

export default CryptoDetails;
