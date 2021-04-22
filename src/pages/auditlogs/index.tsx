import {
  Card,
  Col,
  Input,
  Layout,
  Modal,
  PageHeader,
  Row,
  Table,
  Tag,
} from "antd";
import React, { useEffect, useState } from "react";
import JSONTree from "react-json-tree";

import NewLogService, { Log } from "src/services/api/logs";
import { LIMIT } from "src/utils/consts";
import { Metadata, theme } from "src/utils/types";

const logSvc = NewLogService();

const filterDataSource = (arr: DataSource[] | undefined, query: string) => {
  return arr?.filter((el: DataSource) => {
    return (
      el.object?.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
      el.action?.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
      el.created_at?.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
      el.user?.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  });
};

type DataSource = Log & { key: string };

const Logs = ({ setActiveTab }: { setActiveTab: Function }) => {
  const [total, setTotal] = useState<number>(1);
  const [dataSource, setDataSource] = useState<DataSource[]>();
  const [loading, setloading] = useState<boolean>(true);
  const [dataSourceFiltered, setDataSourceFiltered] = useState<DataSource[]>();
  const [metadata, setMetadata] = useState<Metadata>({
    limit: LIMIT,
    offset: 0,
  });
  const statusToColor: any = {
    ["Create Request"]: "green",
    ["Reject Request"]: "volcano",
    ["Approve Request"]: "geekblue",
    ["Approve Request Successfully"]: "lime",
    ["Update Request"]: "cyan",
  };
  const titleCase = (s: string) =>
    s
      .replace(/^[-_]*(.)/, (_, c) => c.toUpperCase()) // Initial char (after -/_)
      .replace(/[-_]+(.)/g, (_, c) => " " + c.toUpperCase()); // First char after each -/_

  useEffect(() => {
    setActiveTab("auditlogs");
    setloading(true);
    logSvc
      .listLogs({ page: metadata.offset, limit: metadata.limit })
      .then((resp) => {
        console.log("%c resp listLogs", "color: blue;", resp);
        setDataSource(
          resp.items.map((el: Log) => ({
            ...el,
            created_at: el.created_at?.slice(0, 19).replace("T", " "),
            key: el.created_at,
            object: titleCase(el.object),
          }))
        );
        setloading(false);
        setTotal(resp.total);
      });
  }, [metadata]);

  useEffect(() => {
    setDataSourceFiltered(dataSource);
  }, [dataSource]);
  const handleItemClick = (record: Log) => {
    console.log(
      "%c JSON.parse",
      "color: blue;",
      JSON.parse(record["column:data"] as string)
    );
    console.log("%c record", "color: blue;", record);
    Modal.info({
      title: "Object data:",
      width: "70%",
      content: (
        <div>
          <JSONTree
            theme={theme}
            invertTheme={false}
            data={JSON.parse(record["column:data"] as string)}
          />
        </div>
      ),
      onOk() {},
    });
  };

  const columns: any = [
    {
      title: "User",
      key: "user",
      sorter: (a: Log, b: Log) => a.user.localeCompare(b.user),
      render: (record: Log) => <div>{record.user}</div>,
    },
    {
      title: "Object",
      key: "object",
      render: (record: Log) => (
        <a href="#" onClick={(event: any) => handleItemClick(record)}>
          {record.object}
        </a>
      ),
      sorter: (a: Log, b: Log) => a.object.localeCompare(b.object),
    },
    {
      title: "Action",
      sorter: (a: Log, b: Log) => a.action.localeCompare(b.action),
      render: (record: Log) => (
        <Tag color={statusToColor[record.action]}>{record.action}</Tag>
      ),
    },
    {
      title: "Created Date",
      sorter: (a: Log, b: Log) => a.created_at.localeCompare(b.created_at),
      render: (record: Log) => (
        <div className="create_at">{record.created_at}</div>
      ),
    },
  ];

  return (
    <Layout>
      <PageHeader
        title="Audit Logs Board"
        className="layout-header"
        onBack={() => window.history.back()}
        breadcrumb={{
          routes: [
            {
              path: "index",
              breadcrumbName: "Logs",
            },
          ],
        }}
      />
      <Layout.Content className="layout-content">
        <Card title="List of logs">
          <Row justify="space-between">
            <Col span={12}>
              <Input.Search
                className="filter"
                placeholder="Find a group"
                onSearch={() => {}}
                onChange={(e) => {
                  setDataSourceFiltered(
                    filterDataSource(dataSource, e.target.value)
                  );
                }}
                enterButton
              />
            </Col>
          </Row>
          <br />
          <Table
            dataSource={dataSourceFiltered}
            loading={loading}
            columns={columns}
            scroll={{ x: 1000 }}
            pagination={{
              total: total,
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

export default Logs;
