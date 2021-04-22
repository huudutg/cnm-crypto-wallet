import React, { useEffect, useState } from "react";
import { Card, Row, Col, Input, Button, Table, Space, Typography } from "antd";
import Link from "next/link";

interface BranchProps {
  readonly id: string;
  readonly dataSource?: string[];
}
const filterDataSource = (arr: string[] | undefined, query: string) => {
  return arr?.filter((el: string) => {
    return el.toLowerCase().indexOf(query.toLowerCase()) !== -1;
  });
};

const Branch = (props: BranchProps) => {
  const [dataSource, setDataSource] = useState<any>();
  const [dataSourceFiltered, setDataSourceFiltered] = useState<any>();
  const columns = [
    {
      title: "Branches",
      sorter: (a: any, b: any) => a.localeCompare(b),
      render: (record: any) => (
        <Link href={`/repositories/details?id=${record}`}>{record}</Link>
      ),
    },
    {
      title: "Revision",
      dataIndex: "revision",
    },
    {
      title: "Action",
      render: (record: any) => (
        <Space size="middle">
          <Typography.Text type={"danger"} className={"table-action"}>
            Delete
          </Typography.Text>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    setDataSourceFiltered(props.dataSource);
  }, [props.dataSource]);

  return (
    <Card title="Branches">
      <Row justify="space-between">
        <Col span={12}>
          <Input.Search
            className="filter"
            placeholder="Find branches"
            onChange={(e) => {
              setDataSourceFiltered(
                filterDataSource(dataSource, e.target.value)
              );
            }}
            enterButton
          />
        </Col>
        <Col>
          <Button type="primary">
            <Link href="/requests">
              <a>+ New Branch</a>
            </Link>
          </Button>
        </Col>
      </Row>
      <br />
      <Table
        dataSource={dataSourceFiltered}
        columns={columns}
        scroll={{ x: 1000 }}
      />
    </Card>
  );
};

export default Branch;
