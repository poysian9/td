import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "antd";
import Loader from "./Loader";
import {
  TwitterOutlined,
  MediumOutlined,
} from "@ant-design/icons";

const Websites = ({ coingeckolink, messarilink }) => {
  const [data, setdata] = useState();
  const [loading, setLoading] = useState(true); //
  const [, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + `/cryptodata/website/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setdata(data);
        // return data;
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loader />;

  
  const openInNewTab = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return data !== undefined ? (
    <div>
      <div>
        {data[0]?.block_explorer_url ? (
          <Button onClick={() => openInNewTab(data[0]?.block_explorer_url)}>
            Block Explorer
          </Button>
        ) : (
          ""
        )}
        {data[0]?.twitter_url ? (
          <Button onClick={() => openInNewTab(data[0]?.twitter_url)}>
            <TwitterOutlined />
          </Button>
        ) : (
          ""
        )}
        {data[0]?.website_url ? (
          <Button onClick={() => openInNewTab(data[0]?.website_url)}>
            Website
          </Button>
        ) : (
          ""
        )}
        {data[0]?.whitepaper_url ? (
          <Button onClick={() => openInNewTab(data[0]?.whitepaper_url)}>
            Whitepaper
          </Button>
        ) : (
          ""
        )}
        {data[0]?.telegram_url ? (
          <Button onClick={() => openInNewTab(data[0]?.telegram_url)}>
            Telegram
          </Button>
        ) : (
          ""
        )}
        {data[0]?.medium_url ? (
          <Button onClick={() => openInNewTab(data[0]?.medium_url)}>
            <MediumOutlined />
          </Button>
        ) : (
          ""
        )}
        {coingeckolink ? (
          <Button onClick={() => openInNewTab(coingeckolink)}>Coingecko</Button>
        ) : (
          ""
        )}
        {messarilink ? (
          <Button onClick={() => openInNewTab(messarilink)}>Messari</Button>
        ) : (
          ""
        )}
      </div>
    </div>
  ) : (
    ""
  );
};

export default Websites;
