import React from "react";
import { Menu, Row, Col, Typography } from "antd";
import { Link } from "react-router-dom";
import { HomeOutlined, MenuOutlined, DollarOutlined } from "@ant-design/icons";
import logo from "../images/CNBwordmarkwhite.png";

const Navbar = () => {
  return (
    <>
      <Row className="nav-container">

          <Col className="logo-container" span={6}>
            <a href="/">
              <img src={logo} alt="logo" height={60} width={230}/>
            </a>       
            <a href="/" style={{ position: "relative", top: "-20px", overflow: "hidden" }}>
              <Typography.Title level={5} style={{ color: "white", textAlign: "center", paddingLeft: "20px", width: "215px"}}>
                Asset Database
              </Typography.Title>
            </a>    
          </Col>

        <Col className="menu-container" span={10} offset={8}>
          {
            <Menu theme="dark" style={{ display: "flex", fontSize: "16px", fontFamily: "Roobert Light" }}>
              <Menu.Item
                icon={<HomeOutlined style={{ fontSize: "16px" }} />}
                key="home"
                style={{paddingLeft: 30, paddingRight: 30 }}
                >
                <Link to="/">Home</Link>
              </Menu.Item>
              <Menu.Item
                icon={<DollarOutlined style={{ fontSize: "16px" }} />}
                key="cryptocurriences"
                style={{paddingLeft: 30, paddingRight: 30 }}
                >
                <Link to="/cryptocurrencies">Cryptocurrencies</Link>
              </Menu.Item>
              <Menu.Item
                icon={<MenuOutlined style={{ fontSize: "16px" }} />}
                key="research"
                style={{paddingLeft: 30, paddingRight: 30 }}
                >
                <Link to="/research">Research</Link>
              </Menu.Item>
            </Menu>
          }
        </Col>
      </Row>
    </>
  );
};

export default Navbar;
