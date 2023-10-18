import React from "react";
import { useState, useEffect } from "react";
import { Table } from "antd";
import { Typography } from "antd";
import Loader from "./Loader";
import prettyNum, { PRECISION_SETTING } from "pretty-num";
import defaultImg from "../images/samih_sui.png";
const { Title } = Typography;

const API_URL = process.env.REACT_APP_API_URL;

const Dailygainers = () => {
  const [cryptoData, setcryptoData] = useState("");
  const [, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API_URL + `/nomicsdata/biggestdailygainer`)
      .then((res) => res.json())
      .then((cryptoData) => {
        setcryptoData(cryptoData);
        // return data;
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;

  const activeCryptoData = cryptoData.filter(
    (status) =>
      status.coindata?.[0]?.statuses === "Active" &&
      status.price_change_percentage_24h > 0
  );

  const columns = [
    {
      title: "#",
      dataIndex: "rank",
      key: "Rank2",
      className: "spread-column",
      render(text) {
        return text !== undefined
          ? {
              children: <div>{text}</div>,
            }
          : {
              children: <div>Null</div>,
            };
      },
    },
    {
      title: "Coin",
      dataIndex: "name",
      key: "Coin2",
      render: (text, record, index) => (
        <a href={`/cryptocurrencies/${record.id}`} style={{ color: "black"}}>
          <img
            src={record.logo_url ? record.logo_url : defaultImg}
            alt="icons"
            height={28}
            width={28}
            style={{ marginRight: "8px" }}
          />{" "}
        <span className="sohne-buch" style={{fontSize: "15px"}}>{text}</span>{" "}
        <span className="sohne-leicht" style={{fontSize: "11px", paddingLeft: "3px", color: "gray"}}>{record.symbol.toUpperCase()}</span>{" "}
        </a>
      ),
      className: "spread-column",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price2",
      render: (text) => (
        <>
          $
          {text < 1
            ? prettyNum(text, {
                precision: 6,
                precisionSetting: PRECISION_SETTING.REDUCE_SIGNIFICANT,
              })
            : prettyNum(text, {
                thousandsSeparator: ",",
                precision: 2,
                precisionSetting: PRECISION_SETTING.REDUCE_SIGNIFICANT,
              })}{" "}
        </>
      ),
      className: "spread-column",
    },
    {
      title: "24h",
      dataIndex: "price_change_percentage_24h",
      key: "percentchange24h2",
      render(text) {
        return text !== null
          ? {
              props: {
                style: { color: text < 0 ? "#fc4c4c" : "#079363" },
              },
              children: (
                <div>
                  {" "}
                  {prettyNum(text, {
                    precision: 2,
                    precisionSetting: PRECISION_SETTING.FIXED,
                  })}
                  %
                </div>
              ),
            }
          : {
              props: {
                style: { color: "#000000" },
              },
              children: <div>Null%</div>,
            };
      },
      className: "spread-column",
    },

    {
      title: "Market Cap",
      dataIndex: "market_cap",
      key: "market_cap2",
      render(text) {
        return text !== undefined
          ? {
              children: (
                <div>
                  {" "}
                  $
                  {prettyNum(text, {
                    precision: 0,
                    thousandsSeparator: ",",
                    precisionSetting: PRECISION_SETTING.REDUCE_SIGNIFICANT,
                  })}
                </div>
              ),
            }
          : {
              children: <div>Null</div>,
            };
      },
      className: "spread-column",
    },
  ];

  return (
    <>
      <div className="home-heading-container">
        <Title className="semibold-font" level={2} style={{color: "#002035"}}>Daily Gainers</Title>
      </div>
      <div className="rounded-table-container">
        <Table
          className="custom-table"
          pagination={false}
          columns={columns}
          dataSource={activeCryptoData.slice(0, 5)}
          scroll={{
            x: 600,
          }}
        />
      </div>
    </>
  );
};

export default Dailygainers;
