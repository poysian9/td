import { Table } from "antd";
import { useState, useEffect } from "react";
import prettyNum, { PRECISION_SETTING } from "pretty-num";
import React from "react";

import Loader from "./Loader";

const TopTen = () => {

  const [loading, setLoading] = useState(true); //
  const [, setError] = useState(null);
  const [assets, setassets] = useState("");

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + `/nomicsdata/merge`)
      .then((res) => res.json())
      .then((assets) => {
        setassets(assets);
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;

  const columns = [
    {
      title: "#",
      dataIndex: "rank",
      key: "Rank3",
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
      defaultSortOrder: "ascend",
      sorter: (a, b) => a.rank - b.rank,
    },

    {
      title: "Coin",
      dataIndex: "name",
      key: "Coin3",
      render: (text, record, index) => (
        <a href={`/cryptocurrencies/${record.id}`} style={{ color: "black" }}>
          <img src={record.logo_url} 
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
      key: "price3",
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
      title: "1h",
      dataIndex: "price_change_percentage_1h",
      key: "percentchange1h3",
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
      sorter: (a, b) => {
        const priceChangeA = a?.price_change_percentage_1h ?? 0;
        const priceChangeB = b?.price_change_percentage_1h ?? 0;

        return priceChangeA - priceChangeB;
      },
    },
    {
      title: "24h",
      dataIndex: "price_change_percentage_24h",
      key: "percentchange24h3",
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
      sorter: (a, b) => {
        const priceChangeA = a?.price_change_percentage_24h ?? 0;
        const priceChangeB = b?.price_change_percentage_24h ?? 0;
        return priceChangeA - priceChangeB;
      },
    },
    {
      title: "7d",
      dataIndex: "price_change_percentage_7d",
      key: "percentchange7d3",
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
      sorter: (a, b) => {
        const priceChangeA = a?.price_change_percentage_7d ?? 0;
        const priceChangeB = b?.price_change_percentage_7d ?? 0;
        return priceChangeA - priceChangeB;
      },
    },
    {
      title: "Status",
      dataIndex: "coindata",
      key: "statuses3",

      render(text) {
        return text !== "Sell_Only" && text[0]?.statuses ? (
          <div>{text[0].statuses}</div>
        ) : (
          <div>Sell Only</div>
        );
      },
      className: "spread-column",
    },
    {
      title: "Primary Sector",
      dataIndex: "coindata",
      key: "primarysectors3",
      className: "spread-column",
      render: (text) => <>{text[0]?.primarysector}</>,
    },
    {
      title: "Secondary Sector",
      dataIndex: "coindata",
      key: "secondarysectors3",
      className: "spread-column",
      render: (text) => <>{text[0]?.secondarysector}</>,
    },

    {
      title: "Market Cap",
      dataIndex: "market_cap",
      key: "market_caps3",
      render(text) {
        return text !== undefined
          ? {
              children: (
                <div>
                  {"$"}
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
      sorter: {
        compare: (a, b) => a.market_cap - b.market_cap,
      },
    },
    {
      title: "24h Volume",
      dataIndex: "volume_24h",
      key: "volumes3",
      render: (text) => (
        <>
          $
          {prettyNum(text, {
            thousandsSeparator: ",",
            precision: 0,
            precisionSetting: PRECISION_SETTING.REDUCE_SIGNIFICANT,
          })}
        </>
      ),
      className: "spread-column",
      sorter: (a, b) => {
        const volumeChangeA = a?.volume_24h ?? 0;
        const volumeChangeB = b?.volume_24h ?? 0;

        return volumeChangeA - volumeChangeB;
      },
    },
  ];

  return (
    <div className="rounded-tablez">
      <Table
        className="custom-table"
        columns={columns}
        dataSource={assets}
        pagination={{ pageSize: 10 }}
        scroll={{
          x: 1300,
        }}
      />
    </div>
  );
};

export default TopTen;
