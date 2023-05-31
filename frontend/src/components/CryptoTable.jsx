import { Table, Button } from "antd";
import { useState, useEffect } from "react";
import prettyNum, { PRECISION_SETTING } from "pretty-num";
import React from "react";
import defaultImg from "../images/samih_sui.png";
import Loader from "./Loader";
import { useGetCoinsQuery, useGetFiatCoinsQuery } from "../services/nomicsApi";
import { BreadCrumbs, CryptoMCap, Explorers } from "../components";
import { SearchOutlined } from "@ant-design/icons";
import { Col, Typography, Input, Select } from "antd";

const CryptoTable = () => {
  const { Option } = Select;
  const [filteredInfo, setFilteredInfo] = useState({});
  const handleChange = (pagination, filters) => {
    setFilteredInfo(filters);
    console.log(filters);
  };
  const clearFilters = () => {
    setFilteredInfo({});
  };
  const { Title } = Typography;
  const { data, isFetching } = useGetCoinsQuery();
  const cryptosList = data;
  const [cryptos, setCryptos] = useState([]);
  const [loading, setLoading] = useState(true); //
  const [error, setError] = useState(null);
  const [assets, setassets] = useState("");

  const fiats = ["AUD", "NZD", "CAD", "EUR", "GBP", "USD"];
  const [currency, setCurrency] = useState("USD");

  const { data: fiatData } = useGetFiatCoinsQuery(currency);

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + `/csv`)
      .then((res) => res.json())
      .then((assets) => {
        setassets(assets);
        // return data;
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, [cryptosList]);

  useEffect(() => {
    if (currency === "USD") {
      if (cryptosList) {
        const filteredData = cryptosList.filter((coin) =>
          assets.includes(coin.currency)
        );
        setCryptos(filteredData);
      }
    } else {
      if (fiatData) {
        const filteredData = fiatData.filter((coin) =>
          assets.includes(coin.currency)
        );
        setCryptos(filteredData);
      }
    }
  }, [cryptosList, fiatData]);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (currency === "USD") {
      if (cryptosList) {
        const filteredData = cryptosList.filter(
          (coin) =>
            coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setCryptos(filteredData);
      }
    } else {
      if (fiatData) {
        const filteredData = fiatData.filter(
          (coin) =>
            coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setCryptos(filteredData);
      }
    }
  }, [cryptosList, searchTerm, fiatData]);

  if (isFetching) return <Loader />;

  const mergeById = (a1, a2) =>
    a1.map((itm) => ({
      ...a2.find((item) => item.nomicsid === itm.currency && item),
      ...itm,
    }));

  const datalist = assets ? mergeById(cryptos, assets) : "";

  // console.log(datalist);
  const top = "topLeft";
  const bottom = "bottomRight";

  const columns = [
    {
      title: "#",
      dataIndex: "rank",
      key: "Rank",
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
      key: "percentchange1h",
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
      key: "percentchange24h",
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
      dataIndex: "statuses",
      key: "statuses",
      filters: [
        {
          text: "Active",
          value: "Active",
        },
        {
          text: "Sell Only",
          value: "Sell Only",
        },
        {
          text: "Delisted",
          value: "Delisted",
        },
      ],
      width: 100,
      defaultFilteredValue: ["Active"],
      filteredValue: filteredInfo.statuses || null,
      filterMode: "tree",
      onFilter: (value, record) => record.statuses.includes(value),
    },
    {
      title: "Primary Sector",
      dataIndex: "primarysector",
      key: "primarysector",
      filters: [
        {
          text: "Computing",
          value: "Computing",
        },
        {
          text: "Culture & Entertainment",
          value: "Culture & Entertainment",
        },
        {
          text: "Currency",
          value: "Currency",
        },
        {
          text: "DeFi",
          value: "DeFi",
        },
        {
          text: "Digitisation",
          value: "Digitisation",
        },
        {
          text: "Smart Contract Platform",
          value: "Smart Contract Platform",
        },
        {
          text: "null",
          value: "null",
        },
      ],
      width: 100,
      filteredValue: filteredInfo.primarysector || null,
      filterMode: "tree",
      onFilter: (value, record) => record.primarysector.includes(value),
    },
    {
      title: "Secondary Sector",
      dataIndex: "secondarysector",
      key: "secondarysector",
      filters: [
        {
          text: "Active DAO",
          value: "Active DAO",
        },
        {
          text: "AMM",
          value: "AMM",
        },
        {
          text: "Art",
          value: "Art",
        },
        {
          text: "Asset Management",
          value: "Asset Management",
        },
        {
          text: "Atomic Swaps",
          value: "Atomic Swaps",
        },
        {
          text: "BaaS (Others)",
          value: "BaaS (Others)",
        },
        {
          text: "Broadcast",
          value: "Broadcast",
        },
        {
          text: "CLOB",
          value: "CLOB",
        },
        {
          text: "Credit Platform (Other)",
          value: "Credit Platform (Other)",
        },
        {
          text: "DAO (Other)",
          value: "DAO (Other)",
        },
        {
          text: "Derivatives",
          value: "Derivatives",
        },
        {
          text: "Digitisation",
          value: "Digitisation",
        },
        {
          text: "Exchanges (Others)",
          value: "Exchanges (Others)",
        },
        {
          text: "Gaming",
          value: "Gaming",
        },
        {
          text: "IoT",
          value: "IoT",
        },
        {
          text: "Lending / Borrowing",
          value: "Lending / Borrowing",
        },
        {
          text: "IoT",
          value: "IoT",
        },
        {
          text: "Metaverse Platform",
          value: "Metaverse Platform",
        },
        {
          text: "Multi-Chain / Parachain",
          value: "Multi-Chain / Parachain",
        },
        {
          text: "Oracle",
          value: "Oracle",
        },
        {
          text: "Payments",
          value: "Payments",
        },
        {
          text: "Private",
          value: "Private",
        },
        {
          text: "Private Computing",
          value: "Private Computing",
        },
        {
          text: "Shared Network",
          value: "Shared Network",
        },
        {
          text: "Shared Storage",
          value: "Shared Storage",
        },
        {
          text: "Single Chain",
          value: "Single Chain",
        },
        {
          text: "Social",
          value: "Social",
        },
        {
          text: "Stablecoin",
          value: "Stablecoin",
        },
        {
          text: "Private",
          value: "Private",
        },
        {
          text: "Supply Chain / Commerce",
          value: "Supply Chain / Commerce",
        },
        {
          text: "Transparent (Other)",
          value: "Transparent (Other)",
        },
        {
          text: "Transparent CeFi Currency",
          value: "Transparent CeFi Currency",
        },
        {
          text: "Transparent DeFi Currency",
          value: "Transparent DeFi Currency",
        },
        {
          text: "Virtual World",
          value: "Virtual World",
        },
        {
          text: "Yield",
          value: "Yield",
        },
        {
          text: "null",
          value: "null",
        },
      ],
      width: 100,
      filteredValue: filteredInfo.secondarysector || null,
      filterMode: "tree",
      onFilter: (value, record) => record.secondarysector.startsWith(value),
    },

    {
      title: "Market Cap",
      dataIndex: "market_cap",
      key: "market_cap",
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
      key: "onedayvolume",
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

  return datalist ? (
    <Col className="activeassets-container">
      <Col className="active-heading-container">
        <BreadCrumbs />
        <Title level={1} className="active-heading">
          C&B Cryptocurrencies by Market Cap
        </Title>
        <CryptoMCap />
      </Col>

      <Explorers />
      <div style={{ display: "flex", marginTop: "20px", marginBottom: "20px" }}>
        <div className="search-crypto">
          <Input
            addonAfter={<SearchOutlined />}
            placeholder="Search Cryptocurrency"
            onChange={(e) => setSearchTerm(e.target.value)}
            allowClear
          />
        </div>
      </div>
      <div className="boxfortable">
        <div>
          <Button
            shape="round"
            onClick={clearFilters}
            style={{ display: "flex" }}
          >
            Clear Filters
          </Button>
        </div>
        <div>
          <Select //Set up a select box that will be used to change time period of the chart
            defaultValue="USD"
            className="select-currency"
            placeholder="Select Currency"
            onChange={(value) => setCurrency(value)}
          >
            {fiats.map((fiat) => (
              <Option key={fiat}>{fiat}</Option>
            ))}
          </Select>
        </div>
      </div>
      <Table
        pagination={{ defaultPageSize: 100, position: [top, bottom] }}
        columns={columns}
        dataSource={datalist}
        onChange={handleChange}
        scroll={{
          x: 1300,
        }}
      />
    </Col>
  ) : (
    ""
  );
};

export default CryptoTable;
