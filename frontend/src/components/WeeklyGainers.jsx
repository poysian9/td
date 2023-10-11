import React from "react";
import { useState, useEffect } from "react";
import { Carousel, Table } from "antd";
import { Card, Row, Col, Typography } from "antd";
import Loader from "./Loader";
import prettyNum, { PRECISION_SETTING } from "pretty-num";
import defaultImg from "../images/samih_sui.png";
const { Title } = Typography;

const Weeklygainers = () => {
  const [cryptoData, setcryptoData] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + `/nomicsdata/biggestweeklygainer`)
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
      status.price_change_percentage_7d > 0
  );



  const columns = [
    {
      title: "#",
      dataIndex: "rank",
      key: "Rank1",
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
      key: "Coin1",
      render: (text, record, index) => (
        <a href={`/cryptocurrencies/${record.id}`}>
          <img
            src={record.logo_url ? record.logo_url : defaultImg}
            alt="icons"
            height={28}
            width={28}
          />{" "}
          {text} ({record.symbol.toUpperCase()}){" "}
        </a>
      ),
      className: "spread-column",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price1",
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
      title: "7d",
      dataIndex: "price_change_percentage_7d",
      key: "percentchange7d1",
      render(text) {
        return text !== null
          ? {
              props: {
                style: { color: text < 0 ? "#e15241" : "#4eaf0a" },
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
      key: "market_cap1",
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
        <Title level={2}>Weekly Gainers</Title>
      </div>
      <div>
        <Table
          pagination={false}
          columns={columns}
          dataSource={activeCryptoData.slice(0, 5)}
          scroll={{
            x: 800,
          }}
        />
      </div>
    </>
  );
};

export default Weeklygainers;
