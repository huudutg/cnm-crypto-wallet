import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Layout, PageHeader, Card, Row, Col, Input, Button, Table } from "antd";

import { Metadata } from "src/utils/types";
import { LIMIT } from "src/utils/consts";
import NewDepartmentService, { Department } from "src/services/api/departments";

const departmentSvc = NewDepartmentService();

const Departments = ({ setActiveTab }: { setActiveTab: Function }) => {
  const [page, setPage] = useState<number>(1);
  const [dataSource, setDataSource] = useState<any>();
  const [metadata, setMetadata] = useState<Metadata>({
    total: 0,
    limit: LIMIT,
    offset: 0,
  });

  useEffect(() => {
    setActiveTab("departments");
    departmentSvc.listDepartments({}).then((resp) => {
      setDataSource(
        resp._items.map((el: Department) => ({ ...el, key: el.id }))
      );
    });
  }, []);

  const columns = [
    {
      title: "Name",
      key: "name",
      sorter: (a: Department, b: Department) => a.name.localeCompare(b.name),
      render: (record: Department) => (
        <Link href={`/departments/details?id=${record.id}`}>{record.name}</Link>
      ),
    },
    {
      title: "Description",
      key: "description",
      sorter: (a: Department, b: Department) =>
        a.description.localeCompare(b.description),
    },
    // {
    //   title: "Description",
    //   key: "description",
    //   dataIndex: "description",
    // },
  ];

  return (
    <Layout>
      <PageHeader
        title="Departments Board"
        className="layout-header"
        onBack={() => window.history.back()}
        breadcrumb={{
          routes: [
            {
              path: "index",
              breadcrumbName: "Department",
            },
          ],
        }}
      />
      <Layout.Content className="layout-content">
        <Card title="List of Departments">
          <Row justify="space-between">
            <Col span={12}>
              <Input.Search
                className="filter"
                placeholder="Find a department"
                onSearch={() => {}}
                enterButton
              />
            </Col>
            <Col>
              <Button type="primary">
                <Link href="/deparments/new">
                  <a>+ New Departmemts</a>
                </Link>
              </Button>
            </Col>
          </Row>
          <br />
          <Table
            dataSource={dataSource}
            loading={!dataSource}
            columns={columns}
            scroll={{ x: 1000 }}
            pagination={{
              total: metadata?.total,
              onChange: setPage,
              pageSize: LIMIT,
            }}
          />
        </Card>
      </Layout.Content>
    </Layout>
  );
};

export default Departments;
