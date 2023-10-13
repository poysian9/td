import React, { useState, useEffect } from "react";
import prettyNum, { PRECISION_SETTING } from "pretty-num";
import { Col } from "antd";
import millify from "millify";
import Loader from "./Loader";
import { CaretUpOutlined, CaretDownOutlined } from "@ant-design/icons";

const CryptoMCap = () => {
  const [marketCap, setmarketCap] = useState("");
  const [loading, setLoading] = useState(true); //
  const [, setError] = useState(null);

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + `/cryptodata/readGlobal`)
      .then((res) => res.json())
      .then((marketCap) => {
        setmarketCap(marketCap);
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;
  
  return (
    <>
      <Col className="cryptomarketcap">
        <div>
          The global cryptocurrency market cap today is $
          {marketCap.total_market_cap ? millify(marketCap.total_market_cap,{
                                                          precision: 3
                                                          }) : ""}, a{" "}
          {marketCap.market_cap_change_pct < 0 ? (
            <>
              <CaretDownOutlined
                className="downsymbol"
                style={{ color: "#E15241", lineheight: "2rem" }}
              />
              {prettyNum(
                Math.abs(marketCap.market_cap_change_pct),
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
                Math.abs(marketCap.market_cap_change_pct),
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
