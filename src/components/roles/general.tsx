import { Card, Col, Input, Row } from "antd";
import React from "react";

import { Permission } from "src/services/api/permission";
import { Role } from "src/services/api/roles";
import Command from "../command";
import { Permission as PermissionComponent } from "src/components/repositories/reference";

interface Props {
  dataSource: Role;
  permission?: Permission;
}

const General = ({ dataSource, permission }: Props) => (
  <>
    <Row gutter={[0, 21]}>
      <Col span={24}>
        <Card title="General">
          <Row gutter={[14, 21]}>
            <Col xs={12} md={12} sm={24}>
              <p>Role UUID</p>
              <Command value={dataSource?.id} />
            </Col>
            <Col xs={12} md={12} sm={24}>
              <p>Owner</p>
              <Input value="..." readOnly />
            </Col>
            <Col xs={12} md={12} sm={24}>
              <p>Role Name</p>
              <Input value={dataSource.name} />
            </Col>
            <Col xs={12} md={12} sm={24}>
              <p>Role Description</p>
              <Input.TextArea value={dataSource.description} rows={4} />
            </Col>
          </Row>
        </Card>
      </Col>
      <Col span={24}>
        <Card title="Permissions">
          {permission && <PermissionComponent permissions={permission} />}
        </Card>
      </Col>
    </Row>
  </>
);

export default General;
