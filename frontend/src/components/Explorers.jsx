import React from "react";

import { Row, Col, Button } from "antd";

import { EXPLORERS } from "../data/explorers.ts";

const openInNewTab = (url) => {
  window.open(url, "_blank", "noopener,noreferrer");
};

const Explorers = () => {
  return (
    <Col className="explorers-container">
      <Row className="explorers-heading-container">
        {EXPLORERS.map((explorer) => (
          <Button
            key={explorer.name}
            onClick={() => openInNewTab(explorer.url)}
            shape="round"
            style={{ whiteSpace: 'normal', margin: '4px' }}
          >
            {explorer.name}
          </Button>
        ))}
      </Row>
    </Col>
  );
};

export default Explorers;
