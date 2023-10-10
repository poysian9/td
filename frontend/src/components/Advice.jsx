import React from "react";
import { useState, useEffect } from "react";
import Loader from "./Loader";
import { CheckSquareFilled, StopFilled } from "@ant-design/icons";
import { Table } from "antd";

const Advice = ({ id }) => {
  const coinid = id;
  const [loading, setLoading] = useState(true); //
  const [error, setError] = useState(null);
  const [adviceData, setadviceData] = useState("");

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + `/csv/coingeckoid/${coinid}`)
      .then((res) => res.json())
      .then((adviceData) => {
        setadviceData(adviceData);
        // return data;
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;

  const columns = [
    {
      title: "Facts",
      dataIndex: "factsdata",
      key: "factsdata",
      align: "center",
      render(text) {
        return text === "Yes"
          ? {
              children: (
                <CheckSquareFilled
                  style={{ fontSize: "20px", color: "#4eaf0a" }}
                />
              ),
            }
          : {
              children: (
                <StopFilled style={{ fontSize: "20px", color: "#fc4c4c" }} />
              ),
            };
      },
    },
    {
      title: "Opinions",
      dataIndex: "opinions",
      key: "opinions",
      align: "center",
      render(text) {
        return text === "Yes"
          ? {
              children: (
                <CheckSquareFilled
                  style={{ fontSize: "20px", color: "#4eaf0a" }}
                />
              ),
            }
          : {
              children: (
                <StopFilled style={{ fontSize: "20px", color: "#fc4c4c" }} />
              ),
            };
      },
    },
    {
      title: "Recommendations",
      dataIndex: "rmtr",
      key: "rmtr",
      align: "center",
      render(text) {
        return text === "Yes"
          ? {
              children: (
                <CheckSquareFilled
                  style={{ fontSize: "20px", color: "#4eaf0a" }}
                />
              ),
            }
          : {
              children: (
                <StopFilled style={{ fontSize: "20px", color: "#fc4c4c" }} />
              ),
            };
      },
    },
  ];

  return (
    <Table
      className="your-table"
      pagination={false}
      columns={columns}
      dataSource={[adviceData]}
      scroll={{
        x: 20,
      }}
    />
  );
};

export default Advice;
