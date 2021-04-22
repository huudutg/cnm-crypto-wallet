import { Card, Col, Input, List, Row, Skeleton, Tag, Timeline } from "antd";
import React, { useEffect, useState } from "react";

import Command from "src/components/command";
import NewGroupService, { GroupRequest } from "src/services/api/groups";
import Status from "./status";

const groupSvc = NewGroupService();

const ReqGroupDetail = ({
  id,
  setIsDisableBtn,
}: {
  id: string;
  setIsDisableBtn: any;
}) => {
  const [dataSource, setDataSource] = useState<GroupRequest>();

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
    groupSvc
      .getRequest({ id })
      .then((resp) => {
        console.log("respgetRequest groupSvc", resp);
        if (resp.status !== "OPEN") {
          setIsDisableBtn(true);
        }
        setDataSource(resp as GroupRequest);
      })
      .catch((err) => console.log(err));
  }, [id]);

  return dataSource ? (
    <Row gutter={[14, 21]}>
      <Col sm={24} md={12} xs={12}>
        <Card
          title={
            <>
              <span>Request for Create a Group</span>
              <Tag color="processing" className="custom-tag">
                Group
              </Tag>
            </>
          }
        >
          <Command title="Name:" value={dataSource.group_name} />
          <Command title="Department:" value={dataSource.department} />

          <div className="gr-infor">
            <div className="gr-label">Members:</div>
            <div className="gr-read-input gr-list-value">
              <List
                size="small"
                style={{ marginLeft: "-15px" }}
                dataSource={dataSource.members}
                renderItem={(item) => (
                  <List.Item>
                    {item.id} - {item.name}
                  </List.Item>
                )}
              />
            </div>
          </div>
          <div className="gr-infor">
            <div className="gr-label">Leaders</div>
            <div className="gr-read-input gr-list-value">
              <List
                size="small"
                style={{ marginLeft: "-15px" }}
                dataSource={dataSource.leaders}
                renderItem={(item) => (
                  <List.Item>
                    {item.id} - {item.name}
                  </List.Item>
                )}
              />
            </div>
          </div>
          <div className="gr-infor">
            <div className="gr-label">Included Groups</div>
            <div className="gr-read-input gr-list-value">
              <List
                size="small"
                style={{ marginLeft: "-15px" }}
                dataSource={dataSource.subgroups}
                renderItem={(item) => <List.Item>{item.name}</List.Item>}
              />
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

export default ReqGroupDetail;
