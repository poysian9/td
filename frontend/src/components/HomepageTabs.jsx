import { AndroidOutlined, AppleOutlined } from "@ant-design/icons";
import { Tabs } from "antd";
import React from "react";
import CryptoMCap from "./CryptoMCap";
import HeatMap from "./HeatMap";

import TopTen from "./TopTen";

const HomepageTabs = () => {
  return (
    <Tabs className="tab-headings" size="large">
      <Tabs.TabPane tab="Top Ten" key="item-1">
        <TopTen />
      </Tabs.TabPane>
      <Tabs.TabPane tab="Heat Map" key="item-2">
        <HeatMap />
      </Tabs.TabPane>
    </Tabs>
  );
};
export default HomepageTabs;
