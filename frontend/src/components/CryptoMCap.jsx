import React, { useState, useEffect } from "react";
import prettyNum, { PRECISION_SETTING } from "pretty-num";
import { Row, Col, Button } from "antd";
import millify from "millify";
import Loader from "./Loader";
import { CaretUpOutlined, CaretDownOutlined } from "@ant-design/icons";

const CryptoMCap = () => {
  const [marketCap, setmarketCap] = useState("");
  const [loading, setLoading] = useState(true); //
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + `/cryptodata/global`)
      .then((res) => res.json())
      .then((marketCap) => {
        setmarketCap(marketCap);
        // return data;
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;

  // console.log(data);

  return (
    <>
      <Col className="cryptomarketcap">
        <div>
          The global cryptocurrency market cap today is $
          {marketCap.market_cap ? millify(marketCap.market_cap) : ""}, a{" "}
          {marketCap["1d"].market_cap_change_pct < 0 ? (
            <>
              <CaretDownOutlined
                className="downsymbol"
                style={{ color: "#E15241", lineheight: "2rem" }}
              />
              {prettyNum(
                Math.abs(marketCap["1d"]?.market_cap_change_pct) * 100,
                {
                  precision: 2,
                  precisionSetting: PRECISION_SETTING.REDUCE_SIGNIFICANT,
                }
              )}
              %
            </>
          ) : (
            <>
              <CaretUpOutlined
                className="upsymbol"
                style={{ color: "#4EAF0A" }}
              />
              {prettyNum(
                Math.abs(marketCap["1d"].market_cap_change_pct) * 100,
                {
                  precision: 2,
                  precisionSetting: PRECISION_SETTING.REDUCE_SIGNIFICANT,
                }
              )}
              %
            </>
          )}{" "}
          change in the last 24 hours.
        </div>
      </Col>
    </>
  );
};

export default CryptoMCap;
