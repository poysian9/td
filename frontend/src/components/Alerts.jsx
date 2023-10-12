import React from "react";
import { Col, Row, Alert } from "antd";

const Alerts = ({ assetData }) => {

    return (
        <Row>
        {assetData.statuses ? (
          <Col className="status-reasoning-container">
            {assetData.statuses !== "Active" ? (
              <Alert
                message={
                  assetData.statuses
                    ? assetData.statuses.replace(/_/g, " ")
                    : ""
                }
                description={
                  assetData.assetdescription ? (
                    <ul>
                      {assetData.statusreasoning
                        .split("-")
                        .map((reason, index) => {
                          const trimmedReason = reason.replace(/"/g, "").trim();
                          if (trimmedReason) {
                            return (
                              <li key={index}>
                                {trimmedReason}
                              </li>
                            );
                          }
                          return null; // Skip null or empty reasons
                        })}
                    </ul>
                  ) : (
                    ""
                  )
                }
                type="warning"
                showIcon
              />
            ) : (
              ""
            )}
          </Col>
        ) : (
          ""
        )}
      </Row>
    );
};

export default Alerts;