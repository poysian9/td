// Base APP File
import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import { Layout, Typography, Space, Row } from "antd";

import { Navbar } from "./components";

import {
  Homepage,
  Cryptocurrencies,
  CryptoDetails,
  Research,
  WatchList,
} from "./pages";

import "./App.css";
import ErrorBoundery from "./components/ErrorBoundery";

const App = () => {
  return (
    <div className="app">
      <ErrorBoundery>
        <div className="main">
          <Row className="navbar">
            <Navbar />
          </Row>
          <Layout>
            <div className="routes">
              <Switch>
                <Route exact path="/">
                  <Homepage />
                </Route>
                <Route exact path="/cryptocurrencies">
                  <Cryptocurrencies />
                </Route>
                <Route exact path="/cryptocurrencies/:id">
                  <CryptoDetails />
                </Route>
                <Route exact path="/research">
                  <Research />
                </Route>
                <Route exact path="/watchlist">
                  <WatchList />
                </Route>
              </Switch>
            </div>
          </Layout>

          <div className="footer">
            <Typography.Title
              level={5}
              style={{ color: "white", textAlign: "center" }}
            >
              C&B Database <br />
              All Rights Reserved
            </Typography.Title>
            <Space>
              <Link to="/">Home</Link>
              <Link to="/cryptocurrencies">Cryptocurrencies</Link>
            </Space>
          </div>
        </div>
      </ErrorBoundery>
    </div>
  );
};

export default App;
