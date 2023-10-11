import { Table } from "antd";
import { useState, useEffect } from "react";
import React from "react";
import Loader from "./Loader";

const ResearchTable = () => {
  const [loading, setLoading] = useState(true); //
  const [, setError] = useState(null);
  const [data, setdata] = useState("");

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + `/advice/research`)
      .then((res) => res.json())
      .then((data) => {
        setdata(data);
        // return data;
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;

  const columns = [
    {
      title: "Market or Asset",
      dataIndex: "Market_or_Asset",
      key: "Market_or_Asset",
      width: 67,
      align: "center",
    },

    {
      title: "Specificity",
      dataIndex: "Specificity",
      key: "Specificity",
      width: 67,
      align: "center",
    },
    {
      title: "C&B Listed",
      dataIndex: "CB_Listed",
      key: "CB_Listed",
      width: 67,
      align: "center",
    },
    {
      title: "Regulatory Req",
      dataIndex: "Regulatory_Req",
      key: "Regulatory_Req",
      width: 67,
      align: "center",
    },
    {
      title: "Facts & Data",
      dataIndex: "Facts_Data",
      key: "Facts_Data",
      width: 67,
      align: "center",
      render(text) {
        return text === "Yes"
          ? {
              props: {
                style: { color: "#4eaf0a" },
              },
              children: <div>{text}</div>,
            }
          : {
              props: {
                style: { color: "#e15241" },
              },
              children: <div>{text}</div>,
            };
      },
    },
    {
      title: "Opinions",
      dataIndex: "Opinions",
      key: "Opinions",
      width: 67,
      align: "center",
      render(text) {
        return text === "Yes"
          ? {
              props: {
                style: { color: "#4eaf0a" },
              },
              children: <div>{text}</div>,
            }
          : {
              props: {
                style: { color: "#e15241" },
              },
              children: <div>{text}</div>,
            };
      },
    },
    {
      title: "Risk Mitigation & Trade Recommendations",
      dataIndex: "Risk_Mitigation_Trade_Recommendations",
      key: "Risk_Mitigation_Trade_Recommendations",
      width: 67,
      align: "center",
      render(text) {
        return text === "Yes"
          ? {
              props: {
                style: { color: "#4eaf0a" },
              },
              children: <div>{text}</div>,
            }
          : {
              props: {
                style: { color: "#e15241" },
              },
              children: <div>{text}</div>,
            };
      },
    },
    {
      title: "General Advice (RG 244)",
      dataIndex: "General_Advice_RG244",
      key: "General_Advice_RG244",
      width: 67,
      align: "center",
    },

    {
      title: "Personal Advice RG244",
      dataIndex: "Personal_Advice_RG244",
      key: "Personal_Advice_RG244",
      width: 67,
      align: "center",
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={false}
      scroll={{
        x: 1300,
      }}
    />
  );
};

export default ResearchTable;
