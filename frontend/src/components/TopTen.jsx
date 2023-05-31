import { Table, Typography, Col } from "antd";
import { useState, useEffect } from "react";
import prettyNum, { PRECISION_SETTING } from "pretty-num";
import React from "react";

import Loader from "./Loader";

const { Title } = Typography;

const TopTen = () => {
  const [filteredInfo, setFilteredInfo] = useState({});

  const [loading, setLoading] = useState(true); //
  const [error, setError] = useState(null);
  const [assets, setassets] = useState("");
  const top = "topLeft";
  const bottom = "bottomRight";

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + `/nomicsdata/merge`)
      .then((res) => res.json())
      .then((assets) => {
        setassets(assets);
        // return data;
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;

  const data = assets.slice(0, 10);

  const columns = [
    {
      title: "#",
      dataIndex: "rank",
      key: "Rank3",
      width: 67,

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
        <a href={`/cryptocurrencies/${record.id}`}>
          <img src={record.logo_url} alt="icons" height={28} width={28} />{" "}
          {text} ({record.symbol}){" "}
        </a>
      ),
      width: 300,
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
      width: 140,
    },
    {
      title: "1h",
      dataIndex: ["onehour", "price_change_pct"],
      key: "percentchange1h3",
      render(text) {
        return text !== null
          ? {
              props: {
                style: { color: text * 100 < 0 ? "#e15241" : "#4eaf0a" },
              },
              children: (
                <div>
                  {" "}
                  {prettyNum(text * 100, {
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
      width: 101,
      sorter: (a, b) => {
        if (
          a &&
          a["onehour"] &&
          a["onehour"].price_change_pct &&
          b &&
          b["onehour"] &&
          b["onehour"].price_change_pct
        ) {
          return a["onehour"].price_change_pct - b["onehour"].price_change_pct;
        } else if (a && a["onehour"] && a["onehour"].price_change_pct) {
          // That means be has null rechargeType, so a will come last.
          return 0;
        } else if (b && b["onehour"] && b["onehour"].price_change_pct) {
          // That means a has null rechargeType so b will come last.
          return 0;
        }

        // Both rechargeType has null value so there will be no order change.
        return 0;
      },
    },
    {
      title: "24h",
      dataIndex: ["oneday", "price_change_pct"],
      key: "percentchange24h3",
      render(text) {
        return text !== null
          ? {
              props: {
                style: { color: text * 100 < 0 ? "#e15241" : "#4eaf0a" },
              },
              children: (
                <div>
                  {" "}
                  {prettyNum(text * 100, {
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
      width: 101,
      sorter: (a, b) => {
        if (
          a &&
          a["oneday"] &&
          a["oneday"].price_change_pct &&
          b &&
          b["oneday"] &&
          b["oneday"].price_change_pct
        ) {
          return a["oneday"].price_change_pct - b["oneday"].price_change_pct;
        } else if (a && a["oneday"] && a["oneday"].price_change_pct) {
          // That means be has null rechargeType, so a will come last.
          return 0;
        } else if (b && b["oneday"] && b["oneday"].price_change_pct) {
          // That means a has null rechargeType so b will come last.
          return 0;
        }

        // Both rechargeType has null value so there will be no order change.
        return 0;
      },
    },
    {
      title: "7d",
      dataIndex: ["sevenday", "price_change_pct"],
      key: "percentchange7d3",
      render(text) {
        return text !== null
          ? {
              props: {
                style: { color: text * 100 < 0 ? "#e15241" : "#4eaf0a" },
              },
              children: (
                <div>
                  {" "}
                  {prettyNum(text * 100, {
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
      width: 101,
      sorter: (a, b) => {
        if (
          a &&
          a["sevenday"] &&
          a["sevenday"].price_change_pct &&
          b &&
          b["sevenday"] &&
          b["sevenday"].price_change_pct
        ) {
          return (
            a["sevenday"].price_change_pct - b["sevenday"].price_change_pct
          );
        } else if (a && a["sevenday"] && a["sevenday"].price_change_pct) {
          // That means be has null rechargeType, so a will come last.
          return 0;
        } else if (b && b["sevenday"] && b["sevenday"].price_change_pct) {
          // That means a has null rechargeType so b will come last.
          return 0;
        }

        // Both rechargeType has null value so there will be no order change.
        return 0;
      },
    },
    {
      title: "Status",
      dataIndex: "coindata",
      key: "statuses3",

      render(text) {
        return text !== "Sell_Only"
          ? {
              children: <div>{text[0].statuses}</div>,
            }
          : {
              children: <div>Sell Only</div>,
            };
      },
      width: 100,
    },
    {
      title: "Primary Sector",
      dataIndex: "coindata",
      key: "primarysectors3",
      width: 100,
      render: (text) => <>{text[0].primarysector}</>,
    },
    {
      title: "Secondary Sector",
      dataIndex: "coindata",
      key: "secondarysectors3",
      width: 100,
      render: (text) => <>{text[0].secondarysector}</>,
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
                  {" "}
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
      width: 160,
      sorter: {
        compare: (a, b) => a.market_cap - b.market_cap,
      },
    },
    {
      title: "24h Volume",
      dataIndex: ["oneday", "volume"],
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
      width: 160,
      sorter: (a, b) => {
        if (
          a &&
          a["oneday"] &&
          a["oneday"].volume &&
          b &&
          b["oneday"] &&
          b["oneday"].volume
        ) {
          return a["oneday"].volume - b["oneday"].volume;
        } else if (a && a["oneday"] && a["oneday"].volume) {
          // That means be has null rechargeType, so a will come last.
          return 0;
        } else if (b && b["oneday"] && b["oneday"].volume) {
          // That means a has null rechargeType so b will come last.
          return 0;
        }

        // Both rechargeType has null value so there will be no order change.
        return 0;
      },
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        scroll={{
          x: 1300,
        }}
      />
    </>
  );
};

export default TopTen;
