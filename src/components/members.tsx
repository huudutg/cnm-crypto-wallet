import React from "react";
import { Row, Col, Avatar, Tag, Button, Card, Input, Divider } from "antd";
import { SyncOutlined, SearchOutlined } from "@ant-design/icons";

import { User } from "src/services/api/users";

export interface MemberItemProps {
  id: string;
  isLeader: boolean;
  email: string;
  name: string;
  process?: string;
  isProcessing?: boolean;
}

const ActionMemberItem = ({ isLeader }: { isLeader: boolean }) => {
  return (
    <>
      {isLeader ? (
        <Button type="dashed">Demove to Member</Button>
      ) : (
        <Row align="middle" justify="end" gutter={7}>
          <Col>
            <Button type="dashed" className="btn-success">
              Promove to Leader
            </Button>
          </Col>
          <Col>
            <Button danger>Remove</Button>
          </Col>
        </Row>
      )}
    </>
  );
};

const MemberItem = ({ member }: { member: User }) => {
  return (
    <>
      <Row align="middle" gutter={[8, 0]}>
        <Col>
          <Avatar size="large" className="Group-member__avatar">
            {member?.name}
          </Avatar>
        </Col>
        <Col xl={18} lg={14} md={12} sm={24} xs={12}>
          <Row align="middle" gutter={8}>
            <Col>
              <p className="Group-member--p">
                {member?.name} ({member?.email})
              </p>
              {member?.is_lead ? (
                <Tag color="success" className="Group-member__role">
                  Leader
                </Tag>
              ) : (
                <Tag color="lime" className="Group-member__role">
                  Member
                </Tag>
              )}
            </Col>
          </Row>
        </Col>
        <Col span={4}>
          {!member.is_lead ? (
            <Tag
              icon={<SyncOutlined spin />}
              style={{ marginRight: 0 }}
              color="default"
            >
              In proccessing
            </Tag>
          ) : (
            <ActionMemberItem isLeader={member.is_lead} />
          )}
        </Col>
      </Row>
      <Divider />
    </>
  );
};

interface MembersProps {
  justify?:
    | "start"
    | "end"
    | "center"
    | "space-around"
    | "space-between"
    | undefined;
  members: User[];
}

const Members = (props: MembersProps) => {
  const members: any = [];
  props.members?.forEach((member, index) =>
    members.push(<MemberItem key={index} member={member} />)
  );
  return (
    <Card
      title={
        <Row gutter={21} justify={props.justify}>
          <Col>List of Members (7)</Col>
          <Col>
            <Input.Search
              placeholder="Find a name or an email"
              enterButton="Add"
              suffix={<SearchOutlined />}
              style={{ width: "300px" }}
            />
          </Col>
        </Row>
      }
    >
      {members}
      <Row justify="center">
        <Button>Load More</Button>
      </Row>
    </Card>
  );
};
export default Members;
