import { Card, Col, Input, Row } from "antd";
import React from "react";

import Command from "src/components/command";
import IncludedGroup from "src/components/includedGroups";
import Members from "src/components/members";
import { Group } from "src/services/api/groups";

interface Props {
  dataSource: Group;
}

const GroupGeneral = ({ dataSource }: Props) => {
  return (
    <>
      <Row gutter={[14, 21]}>
        <Col span={24}>
          <Card title="General">
            <Row gutter={[14, 21]}>
              <Col xs={12} md={12} sm={24}>
                <p>Group UUID</p>
                <Command value={dataSource.id} />
              </Col>
              <Col xs={12} md={12} sm={24}>
                <p>Owner</p>
                <Input value="Administrators" readOnly />
              </Col>
              <Col xs={12} md={12} sm={24}>
                <p>Group Name</p>
                <Input value={dataSource.name} />
              </Col>
              <Col xs={12} md={12} sm={24}>
                <p>Group Description</p>
                <Input.TextArea value={dataSource.description} rows={4} />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col xs={14} md={14} sm={24}>
          <Members members={dataSource.members} justify="space-between" />
        </Col>
        <Col xs={10} md={10} sm={24}>
          <IncludedGroup
            includedGroups={dataSource.subgroups}
            justify="space-between"
          />
        </Col>
      </Row>
    </>
  );
};

export default GroupGeneral;
