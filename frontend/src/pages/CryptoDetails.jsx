import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import millify from "millify";
import {
  Col,
  Row,
  Typography,
  Select,
  Tabs,
  Alert,
  List,
} from "antd";
import { CaretUpOutlined, CaretDownOutlined } from "@ant-design/icons";
import prettyNum, { PRECISION_SETTING } from "pretty-num";
import Loader from "../components/Loader";
import LineChart from "../components/LineChart";
import {
  useGetCoinDataQuery,
  useGetCoinCSVDataQuery,
} from "../services/nomicsApi";
import MarketDepth from "../components/MarketDepth";
import Websites from "../components/Websites";
import { BreadCrumbs } from "../components";
import defaultImg from "../images/samih_sui.png";
import GoBack from "../components/GoBack";

const CryptoDetails = () => {
  const { Title, Text } = Typography;
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
  const stats =
    cryptoDetails 
      ? [
          {
            title: "Category",
            value: assetData && assetData.secondarysector
              ? assetData.secondarysector
              : (messariData && messariData.category)
                ? messariData.category
                : "-"
          },
          {
            title: "Sector",
            value: assetData && assetData.primarysector
              ? assetData.primarysector
              : (messariData && messariData.sector)
                ? messariData.sector
                : "-"
          },
          {
            title: "Consensus Mechanism",
            value:
              messariData && messariData.general_consensus_mechanism
              ? messariData.general_consensus_mechanism
              : "-",
          },
          {
            title: "Token Type",
            value: 
              messariData && messariData.token_type
              ? messariData.token_type
              : "-",
          },
          {
            title: "Token Usage",
            value: 
              messariData && messariData.token_usage
              ? messariData.token_usage
              : "-",
          },
          {
            title: "Volume (24H)",
            value: ` $${
              cryptoDetails
                ? millify(cryptoDetails.volume_24h)
                : "$-"
            }`,
          },
          {
            title: "Market Cap",
            value: ` $${
              cryptoDetails
                ? millify(cryptoDetails.market_cap)
                : "$-"
            }`,
          },
          {
            title: "ATH",
            value: (
              <Col>
                $
                {cryptoDetails.high < 1
                  ? prettyNum(cryptoDetails.high, {
                      precision: 6,
                      precisionSetting: PRECISION_SETTING.REDUCE_SIGNIFICANT,
                    })
                  : cryptoDetails.high
                  ? prettyNum(cryptoDetails.high, {
                      thousandsSeparator: ",",
                      precision: 2,
                      precisionSetting: PRECISION_SETTING.REDUCE_SIGNIFICANT,
                    })
                  : "-"
                }
              </Col>
            ),
          },
          {
            title: "ATH Date",
            value: cryptoDetails.high_timestamp
              ? (() => {
                  const isoTimestamp = cryptoDetails.high_timestamp;
                  const dateObj = new Date(isoTimestamp);
                  const day = dateObj.getDate();
                  const month = dateObj.toLocaleString('default', { month: 'long' }); // Full month name
                  const year = dateObj.getFullYear();
                  return `${day}, ${month}, ${year}`;
                })()
              : "-",
          },
          {
            title: "Down from ATH",
            value: 
              cryptoDetails
              ? prettyNum(cryptoDetails?.high_change_percentage, {
                thousandsSeparator: ",",
                precision: 0,
                precisionSetting: PRECISION_SETTING.REDUCE_SIGNIFICANT,
              }) 
              + "%"
              : "-",
          },
          {
            title: "ATL",
            value: (
              <Col>
                $
                {cryptoDetails?.low < 1
                  ? prettyNum(cryptoDetails.low, {
                      precision: 6,
                      precisionSetting: PRECISION_SETTING.REDUCE_SIGNIFICANT,
                    })
                  : cryptoDetails.low
                  ? prettyNum(cryptoDetails.low, {
                      thousandsSeparator: ",",
                      precision: 2,
                      precisionSetting: PRECISION_SETTING.REDUCE_SIGNIFICANT,
                    })
                  : "-"
                }
              </Col>
            ),
          },
          {
            title: "ATL Date",
            value: cryptoDetails?.low_timestamp
              ? (() => {
                  const isoTimestamp = cryptoDetails.low_timestamp;
                  const dateObj = new Date(isoTimestamp);
                  const day = dateObj.getDate();
                  const month = dateObj.toLocaleString('default', { month: 'long' }); // Full month name
                  const year = dateObj.getFullYear();
                  return `${day}, ${month}, ${year}`;
                })()
              : "-",
          },
          {
            title: "Up from ATL",
            value: 
              cryptoDetails
              ? prettyNum(cryptoDetails?.low_change_percentage, {
                thousandsSeparator: ",",
                precision: 0,
                precisionSetting: PRECISION_SETTING.REDUCE_SIGNIFICANT,
              }) 
              + "%"
              : "-",
          },
          {
            title: "Circulating Supply",
            value: 
              cryptoDetails
              ? prettyNum(cryptoDetails?.circulating_supply, {
                thousandsSeparator: ",",
                precision: 0,
                precisionSetting: PRECISION_SETTING.REDUCE_SIGNIFICANT,
              })
              : "-",
          },
          {
            title: "Max Supply",
            value: 
              cryptoDetails
              ? prettyNum(cryptoDetails?.max_supply, {
                thousandsSeparator: ",",
                precision: 0,
                precisionSetting: PRECISION_SETTING.REDUCE_SIGNIFICANT,
              })
              : "-",
          },
        ]
      : "-";

  return cryptoDetails && assetData ? (
    // Crypto Status Reasoning
    <Col className="coin-status-container">
      <Row>
        {assetData.statuses ? (
          <Col className="status-reasoning-container">
            {assetData.statuses !== "Active" ? (
              <Alert
                message={
                  assetData.statuses
                    ? assetData.statuses.replace(/_/g, " ")
                    : ""
                }
                description={
                  assetData.assetdescription ? (
                    <ul>
                      {assetData.statusreasoning
                        .split("-")
                        .map((reason, index) => {
                          const trimmedReason = reason.replace(/"/g, "").trim();
                          if (trimmedReason) {
                            return (
                              <li key={index}>
                                {trimmedReason}
                              </li>
                            );
                          }
                          return null; // Skip null or empty reasons
                        })}
                    </ul>
                  ) : (
                    ""
                  )
                }
                type="warning"
                showIcon
              />
            ) : (
              ""
            )}
          </Col>
        ) : (
          ""
        )}
      </Row>
      
      {/* BreadCrumbs */}
      <Row>
        <Col className="general-container">
          <BreadCrumbs />
        </Col>
      </Row>

      {/* Crypto Details */}
      <Row>
        <Col className="coin-heading-container" span={11}>
          <Col className="rank-subheader">Rank #{cryptoDetails.rank}</Col>
          <Col className="general-container">
            <Title level={3} className="coin-name">
              <img
                src={
                  cryptoDetails.logo_url ? cryptoDetails.logo_url : defaultImg
                }
                alt="icons"
                height={28}
                width={28}
              />
              {"  "}
              {cryptoDetails.name} ({cryptoDetails.symbol.toUpperCase()})
            </Title>
          </Col>
          <Row className="coin-price">
            <Col className="price">
              $
              {cryptoDetails.price < 1
                ? prettyNum(cryptoDetails.price, {
                    precision: 6,
                    precisionSetting: PRECISION_SETTING.REDUCE_SIGNIFICANT,
                  })
                : prettyNum(cryptoDetails.price, {
                    thousandsSeparator: ",",
                    precision: 1,
                    precisionSetting: PRECISION_SETTING.REDUCE_SIGNIFICANT,
                  })}{" "}
            </Col>
            <Col className="change">
              {cryptoDetails ? (
                cryptoDetails.price_change_percentage_24h < 0 ? (
                  <>
                    <CaretDownOutlined
                      className="downsymbol"
                      style={{ color: "#E15241", lineheight: "2rem" }}
                    />
                    <div style={{ color: "#E15241" }}>
                      {prettyNum(
                        Math.abs(cryptoDetails.price_change_percentage_24h),
                        {
                          precision: 2,
                          precisionSetting:
                            PRECISION_SETTING.REDUCE_SIGNIFICANT,
                        }
                      )}
                      %
                    </div>
                  </>
                ) : (
                  <>
                    <CaretUpOutlined
                      className="upsymbol"
                      style={{ color: "#4EAF0A" }}
                    />
                    <div style={{ color: "#4EAF0A" }}>
                      {prettyNum(
                        Math.abs(cryptoDetails.price_change_percentage_24h),
                        {
                          precision: 2,
                          precisionSetting:
                            PRECISION_SETTING.REDUCE_SIGNIFICANT,
                        }
                      )}
                      %
                    </div>
                  </>
                )
              ) : (
                ""
              )}
            </Col>
          </Row>

          {/* Website Buttons */}
          <Col className="general-container">
            {" "}
            <Websites
              coingeckolink={assetData.coingeckolink}
              messarilink={assetData.messari}
            />{" "}
          </Col>

          {/* // {Profile} */}
          <Col className="general-container" >
            <Row>
              <Col className="profile-container" style={{ paddingTop: 0 }}>
                <Title level={3} style={{ marginTop: 0 }} className="coin-profile-heading">
                  Profile
                </Title>

                <Tabs defaultActiveKey="1" style={{maxHeight: '330px', overflowY: 'auto'}}>
                  <Tabs.TabPane tab="Overview" key="1">
                    {messariData && messariData.project_details 
                    ? (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: messariData.project_details,
                        }}
                      />
                      ) 
                    : assetData.assetdescription 
                    ? (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: assetData.assetdescription,
                        }}
                      />
                      ) 
                    : "N/A"
                    }
                  </Tabs.TabPane>
                  <Tabs.TabPane tab="Token Economics" key="2">
                    {messariData && messariData.token_usage_details 
                    ? (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: messariData.token_usage_details,
                        }}
                      />
                      ) 
                    : "N/A"
                    }
                  </Tabs.TabPane>
                  <Tabs.TabPane tab="Technology" key="3">
                    {messariData && messariData.technology_details 
                    ? (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: messariData.technology_details,
                        }}
                      />
                      ) 
                    : "N/A"
                    }
                  </Tabs.TabPane>
                </Tabs>
              </Col>
            </Row>
          </Col>
        </Col>

        {/* // {Key Metrics} */}
        <Col className="coin-heading-container" span={12} offset={1}>
          <Title level={3} className="coin-details-heading">
            Key Metrics
          </Title>
          <Col className="key-metrics-container">
            <List>
              {stats.map(({ icon, title, value }) => (
                <Row>
                  <Col className="coin-stats" span={12}>
                    <Text key="icons">{icon}</Text>
                    <Text key="titles">{title}</Text>
                  </Col>
                  <Col className="coin-stats" span={12}>
                    <Text className="stats">{value}</Text>
                  </Col>
                </Row>
              ))}
            </List>
          </Col>
        </Col>
      </Row>

      {/* // {Crypto Chart} */}
      <Row>
        <Col className="chart-container">
          <Title level={3} className="coin-profile-heading" style={{ marginTop: 'auto' }}>
            Price Chart
          </Title>
          <Col className="general-container">
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
          </Col>
          <LineChart
            coinHistory={coinHistory ? coinHistory : ""}
            currentPrice={
              cryptoDetails.price < 1
                ? prettyNum(cryptoDetails.price, {
                    precision: 6,
                    precisionSetting: PRECISION_SETTING.REDUCE_SIGNIFICANT,
                  })
                : prettyNum(cryptoDetails.price, {
                    precision: 1,
                    precisionSetting: PRECISION_SETTING.REDUCE_SIGNIFICANT,
                  })
            }
            changeData={changeTime(timePeriod)}
          />
        </Col>
        {/* Market Depth */}
        <Col className="market-depth">
          <Title level={3} className="coin-details-heading">
            Market Depth
          </Title>
          {assetData.coingeckoid ? (
            <MarketDepth coinid={assetData.coingeckoid} />
          ) : (
            ""
          )}
        </Col>
      </Row>
      </Col>
  ) : (
    <GoBack/>
      );
};

export default CryptoDetails;
