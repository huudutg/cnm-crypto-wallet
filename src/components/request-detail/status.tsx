import { Card, Col, Tag, Timeline } from "antd";
import React from "react";

const statusToColor: { [key: string]: string } = {
  ["OPEN"]: "lime",
  ["APPROVED"]: "blue",
  ["REJECTED"]: "red",
};

const Status = ({ dataSource, statusToItemTimeline, reason }: any) => {
  return (
    <>
      <Col sm={24} md={12} xs={12}>
        <Card
          title={
            <>
              <span>Status</span>
              <Tag
                color={statusToColor[dataSource.status]}
                className="custom-tag"
              >
                {dataSource.status}
              </Tag>
            </>
          }
        >
          <Timeline>
            <Timeline.Item>
              {dataSource.request_user} created this request at{" "}
              {dataSource.created_at?.slice(0, 19).replace("T", " ")}
            </Timeline.Item>
            {dataSource.status && statusToItemTimeline[dataSource?.status]}
          </Timeline>
          {dataSource.status === "REJECTED" && (
            <div className="reason">
              <b>Rejected reason: </b>
              {dataSource.reviewer_comment}
            </div>
          )}
        </Card>
      </Col>
    </>
  );
};

export default Status;
