import React from "react";
import { Menu, Typography, Avatar } from "antd";
import { Link } from "react-router-dom";
import { HomeOutlined, MenuOutlined, DollarOutlined } from "@ant-design/icons";
import icon from "../images/CNBsmall.png";

const Navbar = () => {
  return (
    <>
      <div className="nav-container">
        <div>
          <div className="logo-container">
            <Avatar src={icon} shape="square" size="large" />
            <Typography.Title level={2} className="logo" color="#fc4c4c">
              <Link to="/" className="hlinkstyle">
                Trader Database
              </Link>
            </Typography.Title>
          </div>
        </div>

        <div className="menu-content">
          {
            <Menu theme="dark" style={{ display: "flex", fontSize: "18px" }}>
              <Menu.Item
                icon={<HomeOutlined style={{ fontSize: "18px" }} />}
                key="home"
              >
                <Link to="/">Home</Link>
              </Menu.Item>
              <Menu.Item
                icon={<DollarOutlined style={{ fontSize: "18px" }} />}
                key="cryptocurriences"
              >
                <Link to="/cryptocurrencies">Cryptocurrencies</Link>
              </Menu.Item>

              <Menu.Item
                icon={<MenuOutlined style={{ fontSize: "18px" }} />}
                key="research"
              >
                <Link to="/research">Research</Link>
              </Menu.Item>
              {/* <Menu.Item icon={<EyeOutlined />}>
                <Link to="/watchlist">Watch List</Link>
              </Menu.Item> */}
            </Menu>
          }
        </div>
      </div>
    </>
  );
};

export default Navbar;
