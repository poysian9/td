import React, { useEffect, useState } from "react";
import { Space, Table, Tag } from "antd";
import Loader from "./Loader";
import prettyNum, { PRECISION_SETTING } from "pretty-num";

const MarketDepth = ({ coinid }) => {
  const id = coinid;
  const [loading, setLoading] = useState(false); //

  const [depth, setdepth] = useState("");

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + `/marketdepth/${id}`)
      .then((res) => res.json())
      .then((depth) => {
        setdepth(depth);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  });

  if (loading) return <Loader />;

  // console.log(depth);

  const marketDepth = depth;

  const columns = [
    {
      title: "Exchange",
      dataIndex: "exchange",
      key: "exchange",

      width: 8,
    },

    {
      title: "Pair",
      dataIndex: "base",
      key: "pair",
      render: (text, record, index) => (
        <p>
          {record.exchange.includes("Uniswap") ? (
            `${record.coin_id.toUpperCase()} / ${record.target_coin_id.toUpperCase()}`
          ) : (
            `${text} / ${record.target}`
          )}
        </p>
      ),
      width: 10,
    },
    {
      title: "Spread (BPS)",
      dataIndex: "spread",
      key: "spread",
      width: 10,
      render: (text) => (text * 100).toFixed(1),
    },
    {
      title: "+2% Depth",
      dataIndex: "cost_to_move_up_usd",
      key: "cost_to_move_up_usd",
      width: 8,
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
    },

    {
      title: "-2% Depth",
      dataIndex: "cost_to_move_down_usd",
      key: "cost_to_move_down_usd",
      width: 8,
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
    },
    {
      title: "24hr Volume",
      dataIndex: "volume",
      key: "24hr Volume",
      width: 25,
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
      defaultSortOrder: "descend",
      sorter: (a, b) => a.volume - b.volume,
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={marketDepth}
      scroll={{
        x: 600,
      }}
    />
  );
};

export default MarketDepth;
