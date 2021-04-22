import React, { useEffect, useState } from "react";
import Link from "next/link";
import _ from "lodash";
import { Col, Table, Input, Button, Layout, Row, Card, PageHeader } from "antd";
import { useRouter } from "next/router";

import { Metadata } from "src/utils/types";
import { LIMIT } from "src/utils/consts";
import NewRepositoryService, {
  Repository,
} from "src/services/api/repositories";

const repositorySvc = NewRepositoryService();

const filterDataSource = (arr: Repository[] | undefined, query: string) => {
  return arr?.filter((el: Repository) => {
    return (
      el.name.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
      el.created_at.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  });
};

interface RepositoriesProps {
  setActiveTab: Function;
}

const Repositories = (props: RepositoriesProps) => {
  const [dataSource, setDataSource] = useState<any>();
  const [dataSourceFiltered, setDataSourceFiltered] = useState<Repository[]>();
  const [metadata, setMetadata] = useState<Metadata>({
    total: 0,
    limit: LIMIT,
    offset: 0,
  });
  const router = useRouter();

  const columns = [
    {
      title: "Repository Name",
      key: "name",
      sorter: (a: Repository, b: Repository) => a.name.localeCompare(b.name),
      render: (record: Repository) => (
        <Link href={`/repositories/details?id=${record.id}`}>{record.id}</Link>
      ),
    },
    {
      title: "Description",
      key: "description",
      dataIndex: "description",
    },
    {
      title: "Created at",
      key: "created_at",
      dataIndex: "created_at",
    },
  ];
  useEffect(() => {
    setDataSourceFiltered(dataSource);
  }, [dataSource]);

  useEffect(() => {
    props.setActiveTab("repositories");

    repositorySvc
      .listRepositories({})
      .then((resp) => {
        console.log("resp listRepositories", resp);

        setDataSource(
          resp._items.map((el) => ({
            ...el,
            created_at: el.created_at?.slice(0, 19).replace("T", " "),
            key: el.id,
          }))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Layout>
      <PageHeader
        title="Repositories Board"
        className="layout-header"
        subTitle="Listing all the repositories on Gerrit"
        onBack={() => window.history.back()}
        breadcrumb={{
          routes: [
            {
              path: "index",
              breadcrumbName: "Repository",
            },
          ],
        }}
      />
      <Layout.Content className="layout-content">
        <Card title="List of Repositories">
          <Row justify="space-between">
            <Col span={12}>
              <Input.Search
                className="filter"
                placeholder="Find a repository"
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
                <Link href="/repositories/new">
                  <a>+ New Repository</a>
                </Link>
              </Button>
            </Col>
          </Row>
          <br />
          <Table
            dataSource={dataSourceFiltered}
            columns={columns}
            loading={!dataSource}
            scroll={{ x: 1000 }}
            pagination={{
              total: dataSourceFiltered?.length,
              onChange: (page: number, pageSize?: number) => {
                setMetadata({ limit: pageSize || LIMIT, offset: page });
              },
              pageSize: metadata?.limit,
            }}
          />
        </Card>
      </Layout.Content>
    </Layout>
  );
};

export default Repositories;
