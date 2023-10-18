import React from "react";
import { Col, Row, Typography, List } from "antd";
import prettyNum, { PRECISION_SETTING } from "pretty-num";
import millify from "millify";


const KeyMetrics = ({ cryptoDetails, assetData, messariData }) => {
    const { Title, Text } = Typography;

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

    return (
        <Col>
            <Title level={2} className="semibold-font" style={{color: "#002035"}}>
                Key Metrics
            </Title>
            <Col className="key-metrics-container">
                <List >
                {stats.map(({ icon, title, value }) => (
                    <Row>
                        <Col className="semibold-font" span={8} style={{ fontSize: "18px", padding: "3px"}}>
                            <Text key="icons">{icon}</Text>
                            <Text key="titles">{title}</Text>
                        </Col>
                        <Col className="light-font" span={8} offset={4} style={{ fontSize: "18px", textAlign: "right", padding: "3px"}}>
                            <Text>{value}</Text>
                        </Col>
                    </Row>
                ))}
                </List>
            </Col>
        </Col>
    );
};

export default KeyMetrics;