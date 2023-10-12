import React from "react";
import { CaretUpOutlined, CaretDownOutlined } from "@ant-design/icons";
import { Col, Row, Tabs, Typography } from "antd";
import Websites from "./Websites";
import defaultImg from "../images/samih_sui.png";
import prettyNum, { PRECISION_SETTING } from "pretty-num";


const CryptoInfo = ({cryptoDetails, assetData, messariData}) => {
    const { Title } = Typography;

    return (
        <Col className="coin-heading-container" span={24}>
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

                        <Tabs defaultActiveKey="1" style={{maxHeight: '35r0px', overflowY: 'auto'}}>
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
    );
};

export default CryptoInfo;