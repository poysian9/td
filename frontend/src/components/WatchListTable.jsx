import React from "react";
import { useState, useEffect } from "react";
import { Button, Table, Typography } from "antd";
import Loader from "./Loader";
import { StarFilled, StarOutlined } from "@ant-design/icons";
import { useReducer } from "react";
import prettyNum, { PRECISION_SETTING } from "pretty-num";
import defaultImg from "../images/samih_sui.png";

const WatchListTable = () => {
  const [watchAssets, setwatchAssets] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [favorite, toggle] = useReducer((favorite) => !favorite, false);

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + `/nomicsdata/merge`)
      .then((res) => res.json())
      .then((watchAssets) => {
        setwatchAssets(watchAssets);
        // return data;
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const handleClick = (id) => {
    console.log("id", id);
    toggle();
    // TODO: Call the backend to add or remove from the watchlist
  };

  if (loading) return <Loader />;

  const watchlist = watchAssets.filter(
    (watchlists) => watchlists.coindata?.[0]?.watchlist === "TRUE"
  );

  console.log(watchlist);

  const columns = [
    {
      title: "Coin",
      dataIndex: "name",
      key: "Coin",
      render: (text, record, index) => (
        <a href={`/cryptocurrencies/${record.id}`}>
          <img
            src={record.logo_url ? record.logo_url : defaultImg}
            alt="icons"
            height={28}
            width={28}
          />{" "}
          {text} ({record.symbol}){" "}
        </a>
      ),
      width: 300,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      width: 67,
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
    },
    {
      title: "7d",
      dataIndex: ["sevenday", "price_change_pct"],
      key: "percentchange7d",
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
      key: "b",
      width: 67,
      align: "center",
      render: (text) => <p>{text[0].statuses}</p>,
    },
    {
      title: "Primary Sector",
      dataIndex: "coindata",
      key: "c",
      width: 67,
      align: "center",
      render: (text) => <p>{text[0].primarysector}</p>,
    },
    {
      title: "Secondary Sector",
      dataIndex: "coindata",
      key: "d",
      width: 67,
      align: "center",
      render: (text) => <p>{text[0].secondarysector}</p>,
    },
    {
      title: "Coingecko Link",
      dataIndex: "coingeckolink",
      key: "e",
      width: 67,
      render: (text) => <a href={text}>Coingecko</a>,
    },
    {
      title: "Favorite",
      dataIndex: "favorite",
      key: "f",
      width: 67,
      align: "center",
      render: (text, record) => (
        <Button
          onClick={() => handleClick(record.nomicsid, text)}
          type="primary"
          shape="circle"
          icon={favorite ? <StarOutlined /> : <StarFilled />}
        />
      ),
    },
  ];

  return (
    <>
      {error ? (
        <Typography>Something went wrong</Typography>
      ) : (
        <Table
          pagination={{ defaultPageSize: 10 }}
          columns={columns}
          dataSource={watchlist}
        />
      )}
    </>
  );
};

export default WatchListTable;
