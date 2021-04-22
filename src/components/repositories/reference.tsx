import { Col, Collapse, Row, Tag } from "antd";
import React from "react";

const Rule = ({ userGroup }: any) => {
  let listUserGroup = [];
  for (let [key, value] of Object.entries(userGroup) as any) {
    listUserGroup.push(
      <Row gutter={[0, 16]} key={key} justify="space-between" align="middle">
        <Col>
          <Row justify="start" gutter={24} align="middle">
            <Col>
              <span className="Access-rule__title">
                {value.user_group || value.name}
              </span>
            </Col>
            <Col>{value.label && <Tag color="cyan">{value.label}</Tag>}</Col>
          </Row>
        </Col>
        <Col>
          {value.exclusive && <Tag color="green">EXCLUSIVE</Tag>}

          {value.force && <Tag color="magenta">FORCE</Tag>}
          <Tag color="blue">{value.action}</Tag>
          <Tag style={{ width: "30px", textAlign: "center" }}>{value.min}</Tag>
          <Tag style={{ width: "30px", textAlign: "center" }}>{value.max}</Tag>
        </Col>
      </Row>
    );
  }

  return <>{listUserGroup}</>;
};

export const Permission = ({ permissions }: { permissions: any }) => {
  let perms = [];
  for (let [key, value] of Object.entries(permissions)) {
    perms.push(
      <Collapse key={key}>
        <Collapse.Panel header={key} key="1">
          <Rule userGroup={value} />
        </Collapse.Panel>
      </Collapse>
    );
  }
  return <>{perms}</>;
};

export const Reference = ({ dataSource }: { dataSource: any }) => {
  console.log("%c dataSource", "color: blue;", dataSource);
  let reference = [];
  for (let [key, value] of Object.entries(dataSource)) {
    reference.push(
      <Collapse key={key} style={{ marginBottom: "15px" }}>
        <Collapse.Panel header={key} key={key} className="Access-permission">
          <Permission permissions={value} />
        </Collapse.Panel>
      </Collapse>
    );
  }

  return <>{reference}</>;
};
export default Reference;
