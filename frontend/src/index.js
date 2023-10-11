import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";

import App from "./App";
import store from "./app/store";
import "antd/dist/antd.css";
// require("os");require("dotenv").config();

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <Router>
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  </Router>
);
