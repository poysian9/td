import React, { useState, useEffect } from "react";
import { Typography, Col, Input, Button, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import prettyNum, { PRECISION_SETTING } from "pretty-num";
import defaultImg from "../images/samih_sui.png";
import Loader from "./Loader";
import { useGetCoinsQuery } from "../services/nomicsApi";
import { BreadCrumbs, CryptoMCap, Explorers } from "../components";

const { Title } = Typography;

const CryptoTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: cryptosList } = useGetCoinsQuery(); // Use your API query
  const [cryptos, setCryptos] = useState([]);
  const [assets, setassets] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [filteredInfo, setFilteredInfo] = useState({});
  const handleChange = (sorter, filters) => {
    setFilteredInfo({
      ...sorter,
      ...filters,
    });
  };
  const clearFilters = () => {
    setFilteredInfo({});
  };

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + `/csv`)
      .then((res) => res.json())
      .then((assets) => {
        setassets(assets);
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, [cryptosList]);
  
  useEffect(() => {
    if (!cryptosList) return;

    // Filter based on your search term
    const filteredData = cryptosList.filter(
      (coin) =>
        coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCryptos(filteredData);
  }, [cryptosList, searchTerm]);

  const mergeById = (a1, a2) =>
  a1.map((itm) => ({
    ...a2.find((item) => item.coingeckoid === itm.id && item),
    ...itm,
  }));

  const datalist = assets ? mergeById(cryptos, assets) : "";
  if (loading) return <Loader />;

  const top = "topLeft";
  const bottom = "bottomRight";
  
  const columns = [
    {
      title: "#",
      dataIndex: "rank",
      key: "Rank",
      width: 67,
      render: (text) => (
        <div>{text !== undefined ? text : "Null"}</div>
      ),
      defaultSortOrder: "ascend",
      sorter: (a, b) => {
         return a?.rank - b?.rank;
      },
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
          {text} ({record.symbol.toUpperCase()}){" "}
        </a>
      ),
      width: 500,
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
      dataIndex: "price_change_percentage_1h",
      key: "percentchange1h",
      width: 101,
      sorter: (c, d) => {
        const priceChangeA = c?.price_change_percentage_1h ?? 0;
        const priceChangeB = d?.price_change_percentage_1h ?? 0;

        // Use the nullish coalescing operator to handle undefined/null values
        return priceChangeA === priceChangeB ? 0 : priceChangeA < priceChangeB ? -1 : 1;
      },
      render: (text) =>{
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
              children: <div>-%</div>,
            };
      },
    },
    {
      title: "24h",
      dataIndex: "price_change_percentage_24h",
      key: "percentchange24h",
      width: 101,
      sorter: (a, b) => {
        const priceChangeA = a?.price_change_percentage_24h ?? 0;
        const priceChangeB = b?.price_change_percentage_24h ?? 0;

        // Use the nullish coalescing operator to handle undefined/null values
        return priceChangeA === priceChangeB ? 0 : priceChangeA < priceChangeB ? -1 : 1;
      },
      render: (text) =>{
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
              children: <div>-%</div>,
            };
      },
    },
    {
      title: "7d",
      dataIndex: "price_change_percentage_7d",
      key: "percentchange7d",
      width: 101,
      sorter: (a, b) => {
        const priceChangeA = a?.price_change_percentage_7d ?? 0;
        const priceChangeB = b?.price_change_percentage_7d ?? 0;

        // Use the nullish coalescing operator to handle undefined/null values
        return priceChangeA === priceChangeB ? 0 : priceChangeA < priceChangeB ? -1 : 1;
      },
      render: (text) =>{
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
              children: <div>-%</div>,
            };
      },
    },
    {
      title: "Status",
      dataIndex: "statuses",
      key: "statuses",
      width: 100,
      filters: [
        {
          text: "Active",
          value: "Active",
        },
        {
          text: "Sell Only",
          value: "Sell_Only",
        },
        {
          text: "Delisted",
          value: "Delisted",
        },
      ],
      defaultFilteredValue: ["Active"],
      filteredValue: filteredInfo?.statuses || null, // Add optional chaining operator
      filterMode: "multiple",
      onFilter: (value, record) => record?.statuses === value,
      render: (text) => {
        // Replace underscores with spaces for rendering
        const displayedText = text?.replace(/_/g, ' ');
    
        return displayedText;
      },
    },
    {
      title: "Primary Sector",
      dataIndex: "primarysector",
      key: "primarysector",
      width: 100,
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
      filteredValue: filteredInfo?.primarysector || null,
      filterMode: "multiple",
      onFilter: (value, record) => record?.primarysector === value,
      render: (text) => {
        // Replace underscores with spaces for rendering
        const displayedText = text === "null" ? "-" : text; // Render "-" for "null" value
    
        return displayedText;
      },
    },
    {
      title: "Secondary Sector",
      dataIndex: "secondarysector",
      key: "secondarysector",
      width: 100,
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
      filteredValue: filteredInfo?.secondarysector || null,
      filterMode: "multiple",
      onFilter: (value, record) => record?.secondarysector === value,
      render: (text) => {
        // Replace underscores with spaces for rendering
        const displayedText = text === "null" ? "-" : text; // Render "-" for "null" value
    
        return displayedText;
      }
    },
    {
      title: "Market Cap",
      dataIndex: "market_cap",
      key: "market_cap",
      render: (text) => {
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
      width: 160,
      sorter: {
        compare: (a, b) => a.market_cap - b.market_cap,
      },
    },
    {
      title: "24h Volume",
      dataIndex: "volume_24h",
      key: "onedayvolume2",
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
      sorter: {
        compare: (a, b) => a.volume_24h - b.volume_24h,
        multiple: 2, // Allow multiple columns to be sorted simultaneously
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
          {/* <Select //Set up a select box that will be used to change time period of the chart
            defaultValue="USD"
            className="select-currency"
            placeholder="Select Currency"
            onChange={(value) => setCurrency(value)}
          >
            {fiats.map((fiat) => (
              <Option key={fiat}>{fiat}</Option>
            ))}
          </Select> */}
        </div>
      </div>
      <Table
        pagination={{ defaultPageSize: 100, position: [top, bottom] }}
        columns={columns}
        dataSource={datalist}
        onChange={handleChange}
        scroll={{
          x: 600,
        }}
        size={"small"}      
      />
    </Col>
  ) : (
    ""
  );
};

export default CryptoTable;
