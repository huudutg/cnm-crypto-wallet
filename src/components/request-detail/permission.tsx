import { Card, Col, Input, Row, Skeleton, Tag, Timeline } from "antd";
import React, { useEffect, useState } from "react";

import Command from "src/components/command";
import NewPermissionService, {
  PermissionRequest,
} from "src/services/api/permission";
import Status from "./status";

const permissionSvc = NewPermissionService();

const ReqPermissionDetail = ({
  id,
  setIsDisableBtn,
}: {
  id: string;
  setIsDisableBtn: any;
}) => {
  const [dataSource, setDataSource] = useState<PermissionRequest>();

  const statusToItemTimeline = {
    ["OPEN"]: <Timeline.Item>Wating for permission</Timeline.Item>,
    ["REJECTED"]: (
      <Timeline.Item>
        {dataSource?.reviewer} rejected this request at{" "}
        {dataSource?.updated_at?.slice(0, 19).replace("T", " ")}
      </Timeline.Item>
    ),
    ["APPROVED"]: (
      <Timeline.Item>
        {dataSource?.reviewer} approved this request at{" "}
        {dataSource?.updated_at?.slice(0, 19).replace("T", " ")}
      </Timeline.Item>
    ),
  };

  useEffect(() => {
    permissionSvc
      .getRequest({ id })
      .then((resp) => {
        console.log("resp permissionSvc getRequest", resp);
        if (resp.status !== "OPEN") {
          setIsDisableBtn(true);
        }
        setDataSource(resp as PermissionRequest);
        const btnVerify = document.getElementById("btn-approve");
        btnVerify?.setAttribute("disabled", "disabled");
      })
      .catch((err) => console.log(err));
  }, [id]);
  return dataSource ? (
    <Row gutter={[14, 21]}>
      <Col sm={24} md={12} xs={12}>
        <Card
          title={
            <>
              <span>
                Request for{" "}
                {dataSource.request_type === "REMOVE"
                  ? "Revoke a Permission "
                  : "Permission "}
              </span>
              {dataSource.repo ? (
                <Tag color="processing" className="custom-tag">
                  Repository
                </Tag>
              ) : (
                <Tag color="cyan" className="custom-tag">
                  Manifest
                </Tag>
              )}
            </>
          }
        >
          {dataSource.repo ? (
            <>
              <Command title="Repository Name:" value={dataSource.repo} />
            </>
          ) : (
            <Command title="Manifest Name:" value={dataSource?.manifest} />
          )}
          <Command title="Branch:" value={dataSource?.branch} />
          <div className="gr-infor">
            <div className="gr-label">Request for:</div>
            <div className="gr-read-input gr-list-value">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                {dataSource?.user || dataSource?.group_info?.name}
                {dataSource?.user ? (
                  <Tag color="lime">user</Tag>
                ) : (
                  <Tag color="magenta">group</Tag>
                )}
              </div>
            </div>
          </div>
          <div className="gr-infor">
            <div className="gr-label">
              {dataSource?.role ? `Role:` : `Permission:`}
            </div>
            <div className="gr-read-input gr-list-value">
              <div>{dataSource?.role || dataSource.permission?.name}</div>
            </div>
          </div>
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

export default ReqPermissionDetail;
