import React from "react";

import { Row, Col, Button } from "antd";

import { EXPLORERS } from "../data/explorers.ts";

const openInNewTab = (url) => {
  window.open(url, "_blank", "noopener,noreferrer");
};

const Explorers = () => {
  return (
    <Col className="explorers-container">
      <Col className="explorers-heading-container">
        <Row style={{ fontSize: "1px" }}>
          {EXPLORERS.map((explorer) => (
            <Col style={{ margin: "10px 20px" }} key={explorer.name}>
              <Col style={{ fontWeight: "bold" }}>
                <Button
                  onClick={() => openInNewTab(explorer.url)}
                  shape="round"
                >
                  {explorer.name}
                </Button>
              </Col>
            </Col>
          ))}
        </Row>
      </Col>
    </Col>
  );
};

export default Explorers;
