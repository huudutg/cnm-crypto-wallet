import React from "react";
import { Card, Input, Row, Col, Button, Tag, Divider, Typography } from "antd";
import { SearchOutlined, SyncOutlined } from "@ant-design/icons";

import { Group } from "src/services/api/groups";

const { Text } = Typography;
export interface GroupItemProps {
  id: string;
  name: string;
  description: string;
  isProccessing: boolean;
}

const GroupItem = ({ group }: { group: Group }) => {
  return (
    <>
      <Row justify="space-between" align="middle">
        <Col xl={18} lg={14} md={24}>
          {/* <p className="Group-member--p" style={{ overflow: "hidden" }}>
            {group.name}
          </p> */}
          <Text strong ellipsis={true} style={{ width: "100%" }}>
            {group.name}
          </Text>
          <p className="Group-member--p Group-member--desc">
            {group.description}
          </p>
        </Col>
        <Col xl={4} lg={6} md={4}>
          {!group ? (
            <Tag
              icon={<SyncOutlined spin />}
              style={{ marginRight: 0 }}
              color="default"
            >
              In removing proccessing
            </Tag>
          ) : (
            <Button danger>Remove</Button>
          )}
        </Col>
      </Row>
      <Divider />
    </>
  );
};

interface MyGroupsProps {
  justify?:
    | "start"
    | "end"
    | "center"
    | "space-around"
    | "space-between"
    | undefined;
  includedGroups: Group[] | undefined;
}

export const MyGroups = (props: MyGroupsProps) => {
  const groups: any = [];
  console.log("%c props.includedGroups", "color: blue;", props.includedGroups);
  props.includedGroups?.forEach((group, index) =>
    groups.push(<GroupItem key={index} group={group} />)
  );
  return (
    <Card
      title={
        <Row gutter={21} justify={props.justify}>
          <Col>Included Groups (3)</Col>
          <Col>
            <Input.Search
              placeholder="Find a group name"
              enterButton="Add"
              suffix={<SearchOutlined />}
            />
          </Col>
        </Row>
      }
    >
      {groups}
      {/* TODO: use data from API to render. Optimize by useCallback or useMemory */}
    </Card>
  );
};

