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
  Collapse,
} from "antd";
import { CaretUpOutlined, CaretDownOutlined } from "@ant-design/icons";
import prettyNum, { PRECISION_SETTING } from "pretty-num";
import Loader from "../components/Loader";
import LineChart from "../components/LineChart";
import {
  useGetCoinHistoryQuery,
  useGetCoinDataQuery,
  useGetCoinCSVDataQuery,
} from "../services/nomicsApi";
import MarketDepth from "../components/MarketDepth";
import Websites from "../components/Websites";
import Advice from "../components/Advice";
import { BreadCrumbs } from "../components";
import defaultImg from "../images/samih_sui.png";

const { Panel } = Collapse;

const CryptoDetails = () => {
  const { Title, Text } = Typography;
  const ltv = "Positive";
  const { Option } = Select;
  const { id } = useParams();
  const [loading, setLoading] = useState(true); //
  const [error, setError] = useState(null);
  const time = ["24h", "7d", "30d", "1y", "max"];
  const [timePeriod, setTimePeriod] = useState("24h");

  const { data: cryptoDetails } = useGetCoinDataQuery({ id });
  const { data: assetData } = useGetCoinCSVDataQuery({ id });

  const [coinHistory, setcoinHistory] = useState("");
  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + `/cryptodata/${timePeriod}/${id}`)
      .then((res) => res.json())
      .then((coinHistory) => {
        setcoinHistory(coinHistory);
        // return data;
      })

      .finally(() => setLoading(false));
  }, [id, timePeriod]);

  const [messariData, setMessariData] = useState("");
  useEffect(() => {
    fetch(
      process.env.REACT_APP_API_URL + `/messari/api/v2/assets/${id}/profile`
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
    if (time === "24h") {
      return (
        <>
          Change:{" "}
          {prettyNum(cryptoDetails?.oneday?.price_change_pct * 100, {
            precision: 2,
            precisionSetting: PRECISION_SETTING.FIXED,
          })}{" "}
          %
        </>
      );
    } else if (time === "7d") {
      return (
        <>
          Change:{" "}
          {prettyNum(cryptoDetails?.sevenday?.price_change_pct * 100, {
            precision: 2,
            precisionSetting: PRECISION_SETTING.FIXED,
          })}{" "}
          %
        </>
      );
    } else if (time === "30d") {
      return (
        <>
          Change:{" "}
          {prettyNum(cryptoDetails?.thirtyday?.price_change_pct * 100, {
            precision: 2,
            precisionSetting: PRECISION_SETTING.FIXED,
          })}{" "}
          %
        </>
      );
    } else if (time === "1y") {
      return (
        <>
          Change:{" "}
          {prettyNum(cryptoDetails?.oneyear?.price_change_pct * 100, {
            precision: 2,
            precisionSetting: PRECISION_SETTING.FIXED,
          })}{" "}
          %
        </>
      );
    } else if (time === "max") {
      return "";
    }
  };

  const percentAth =
    cryptoDetails !== undefined
      ? (1 - cryptoDetails.price / cryptoDetails.high) * 100
      : "";
  const stats =
    cryptoDetails !== undefined
      ? [
          {
            title: "Category",
            value: messariData.length > 0 ? messariData[0].category : "",
          },
          {
            title: "Sector",
            value:
              messariData.length > 0
                ? messariData[0].sector
                : assetData.primarysector,
          },
          {
            title: "Consensus Mechanism",
            value:
              (messariData.length > 0 &&
                messariData[0].general_consensus_mechanism) ||
              "",
          },
          {
            title: "Token Type",
            value: (messariData.length > 0 && messariData[0].token_type) || "",
          },
          {
            title: "Token Usage",
            value: (messariData.length > 0 && messariData[0].token_usage) || "",
          },
          {
            title: "Volume (24H)",
            value: ` $${
              cryptoDetails.oneday !== undefined
                ? millify(cryptoDetails.oneday.volume)
                : "Null"
            }`,
          },
          {
            title: "Market Cap",
            value: `$${
              cryptoDetails.market_cap && millify(cryptoDetails.market_cap)
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
                  : prettyNum(cryptoDetails.high, {
                      precision: 2,
                      precisionSetting: PRECISION_SETTING.REDUCE_SIGNIFICANT,
                    })}
              </Col>
            ),
          },
          {
            title: "ATH Date",
            value: cryptoDetails.high_timestamp
              ? cryptoDetails.high_timestamp.slice(
                  0,
                  cryptoDetails.high_timestamp.lastIndexOf("T")
                )
              : "",
          },
          {
            title: "Down from ATH",
            value:
              "-" +
              prettyNum(percentAth, {
                precision: 2,
                precisionSetting: PRECISION_SETTING.REDUCE_SIGNIFICANT,
              }) +
              "%",
          },
          {
            title: "Circulating Supply",
            value: `${prettyNum(cryptoDetails.circulating_supply, {
              thousandsSeparator: ",",
              precision: 0,
              precisionSetting: PRECISION_SETTING.REDUCE_SIGNIFICANT,
            })}`,
          },
          {
            title: "Max Supply",
            value: `${prettyNum(
              (messariData.length > 0 && messariData[0].max_supply) ||
                cryptoDetails.max_supply,
              {
                thousandsSeparator: ",",
                precision: 0,
                precisionSetting: PRECISION_SETTING.REDUCE_SIGNIFICANT,
              }
            )}`,
          },
          {
            title: "Emission Type",
            value:
              (messariData.length > 0 &&
                messariData[0].general_emission_type) ||
              "",
          },
        ]
      : "";

  //only return the page when cryptoDetails exists
  return cryptoDetails !== undefined ? (
    // Crypto Status Reasoning
    <Col className="coin-status-container">
      <Row>
        {assetData.statuses !== undefined ? (
          <Col className="status-reasoning-container">
            {assetData.statuses !== "Active" ? (
              <Alert
                message={
                  assetData.statuses
                    ? assetData.statuses.replace(/_/g, " ")
                    : ""
                }
                description={
                  assetData.assetdescription
                    ? assetData.statusreasoning
                        .replace(/_/g, "<>")
                        .replace(/"/g, "")
                        .replace(
                          /null/g,
                          "Please contact a Trader for more information."
                        )
                    : ""
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

      <Row>
        <Col className="general-container">
          <BreadCrumbs />
        </Col>
      </Row>

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
              {cryptoDetails.name} ({cryptoDetails.symbol})
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
                    precision: 1,
                    precisionSetting: PRECISION_SETTING.REDUCE_SIGNIFICANT,
                  })}{" "}
            </Col>
            <Col className="change">
              {cryptoDetails?.oneday !== undefined ? (
                cryptoDetails.oneday.price_change_pct < 0 ? (
                  <>
                    <CaretDownOutlined
                      className="downsymbol"
                      style={{ color: "#E15241", lineheight: "2rem" }}
                    />
                    <div style={{ color: "#E15241" }}>
                      {prettyNum(
                        Math.abs(cryptoDetails.oneday.price_change_pct) * 100,
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
                        Math.abs(cryptoDetails.oneday.price_change_pct) * 100,
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
          <Col className="general-container">
            {" "}
            <Websites
              coingeckolink={assetData.coingeckolink}
              messarilink={assetData.messari}
            />{" "}
          </Col>
          <Col>
            <Advice id={id} />
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
        <Col className="chart-container" span={15}>
          <Title level={3} className="coin-details-heading">
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
            coinHistory={coinHistory !== undefined ? coinHistory : ""}
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

        {/* // {Research} */}
        <Col className="general-container" span={8} offset={1}>
          <Row>
            <Col className="research-container">
              <Title level={3} className="coin-details-heading">
                Research - {assetData.primarysector}:{" "}
                {assetData.secondarysector}
              </Title>

              <Tabs>
                <Tabs.TabPane tab="Sector Guidance" key="3">
                  <Collapse>
                    <Panel header="Long-Term House View" key="1">
                      <p>
                        COMING SOON
                        {/* {ltv === "Positive" ? (
                          <p style={{ color: "#4EAF0A" }}>{ltv}</p>
                        ) : ltv === "Neutral" ? (
                          <p style={{ color: "#808080" }}>{ltv}</p>
                        ) : (
                          <p style={{ color: "#E15241" }}>{ltv}</p>
                        )}
                        <p
                          style={{
                            "font-weight": "bold",
                            "border-bottom": "1px solid",
                          }}
                        >
                          Long-Term Thesis{" "}
                        </p>
                        We believe that Bitcoin will become widely used as an
                        alternative money in the digital economy. Expect that
                        other cryptocurrencies in this sector such as Bitcoin
                        Cash and Litecoin will lose relevance over time. */}
                      </p>
                    </Panel>
                    <Panel header="Short-Term House View" key="2">
                      <p>
                        COMING SOON
                        {/* {ltv === "Positive" ? (
                          <p style={{ color: "#4EAF0A" }}>{ltv}</p>
                        ) : ltv === "Neutral" ? (
                          <p style={{ color: "#808080" }}>{ltv}</p>
                        ) : (
                          <p style={{ color: "#E15241" }}>{ltv}</p>
                        )}
                        <p
                          style={{
                            "font-weight": "bold",
                            "border-bottom": "1px solid",
                          }}
                        >
                          Monthly Comments{" "}
                        </p>
                        Currently the Inflationary Bear Market is not ideal for
                        Bitcoin but shows no worse decline than many growth
                        stocks. Our expectation that this sector is positioned
                        for relatively stronger market rebound than equities. */}
                      </p>
                    </Panel>
                  </Collapse>
                </Tabs.TabPane>
              </Tabs>
            </Col>
          </Row>

          {/* // {Profile} */}
          <Row>
            <Col className="profile-container">
              <Title level={3} className="coin-details-heading">
                Profile
              </Title>

              <Tabs defaultActiveKey="1">
                <Tabs.TabPane tab="Overview" key="1">
                  {messariData.length > 0
                    ? messariData.map((el) => (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: el.project_details,
                          }}
                        />
                      ))
                    : ""}
                </Tabs.TabPane>
                <Tabs.TabPane tab="Token Economics" key="2">
                  {messariData.length > 0
                    ? messariData.map((el) => (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: el.token_usage_details,
                          }}
                        />
                      ))
                    : ""}
                </Tabs.TabPane>
                <Tabs.TabPane tab="Technology" key="3">
                  {(messariData.length > 0 &&
                    messariData.map((el) => (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: el.technology_details,
                        }}
                      />
                    ))) ||
                    ""}
                </Tabs.TabPane>
              </Tabs>
            </Col>
          </Row>
        </Col>

        <Col className="market-depth">
          {/* <Title level={3} className="coin-details-heading">
            Market Depth
          </Title>
          {assetData.coingeckoid ? (
            <MarketDepth coinid={assetData.coingeckoid} />
          ) : (
            ""
          )} */}
        </Col>
      </Row>
    </Col>
  ) : (
    ""
  );
};

export default CryptoDetails;
