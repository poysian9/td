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
            <Col xs={24} sm={12} md={9} lg={6} xl={3} key={explorer.name}>
                <Button
                  onClick={() => openInNewTab(explorer.url)}
                  shape="round"
                  block
                  style={{ whiteSpace: 'normal' }}
                >
                  {explorer.name}
                </Button>
            </Col>
          ))}
        </Row>
      </Col>
    </Col>
  );
};

export default Explorers;
