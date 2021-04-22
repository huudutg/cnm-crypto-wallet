import { Card, Col, Input, Row, Skeleton, Tag, Timeline } from "antd";
import React, { useEffect, useState } from "react";
import Command from "src/components/command";
import NewRepoService, { RepoRequest } from "src/services/api/repositories";
import Status from "./status";

const repoSvc = NewRepoService();

const ReqRepoDetail = ({
  id,
  setIsDisableBtn,
}: {
  id: string;
  setIsDisableBtn: any;
}) => {
  const [dataSource, setDataSource] = useState<RepoRequest>();

  const statusToItemTimeline = {
    ["OPEN"]: <Timeline.Item>Wating for permission</Timeline.Item>,
    ["REJECTED"]: (
      <Timeline.Item>
        {dataSource?.reviewer || "Admin"} rejected this request at{" "}
        {dataSource?.updated_at?.slice(0, 19).replace("T", " ")}
      </Timeline.Item>
    ),
    ["APPROVED"]: (
      <Timeline.Item>
        {dataSource?.reviewer || "Admin"} approved this request at{" "}
        {dataSource?.updated_at?.slice(0, 19).replace("T", " ")}
      </Timeline.Item>
    ),
  };

  useEffect(() => {
    repoSvc
      .getRequest({ id })
      .then((resp) => {
        console.log("respgetRequest", resp);
        if (resp.status !== "OPEN") {
          setIsDisableBtn(true);
        }
        setDataSource(resp as RepoRequest);
      })
      .catch((err) => console.log(err));
  }, [id]);
  return dataSource ? (
    <Row gutter={[14, 21]}>
      <Col sm={24} md={12} xs={12}>
        <Card
          title={
            <>
              <span>Request for Create a Repo</span>
              <Tag color="processing" className="custom-tag">
                Repo
              </Tag>
            </>
          }
        >
          <Command title="Name:" value={dataSource.repo} />
          <div className="gr-infor">
            <div className="gr-label">Request's Note:</div>
            <Input.TextArea
              className="gr-read-input"
              readOnly
              rows={4}
              value={dataSource.reason}
            />
          </div>
        </Card>
      </Col>
      <Status
        dataSource={dataSource}
        statusToItemTimeline={statusToItemTimeline}
      />
    </Row>
  ) : (
    <Row gutter={[14, 21]}>
      <Col sm={24} md={12} xs={12}>
        <Skeleton paragraph={{ rows: 12 }} />
      </Col>
      <Col sm={24} md={12} xs={12}>
        <Skeleton paragraph={{ rows: 4 }} />
      </Col>
    </Row>
  );
};

export default ReqRepoDetail;
