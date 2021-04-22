import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  PageHeader,
  Button,
  Layout,
  Tabs,
  Card,
  Input,
  Row,
  Col,
  Skeleton,
} from "antd";
import { Router, useRouter } from "next/dist/client/router";
import _ from "lodash";

import NewRepositoryService, {
  Repository,
} from "src/services/api/repositories";
import Command from "src/components/command";
import BreadcrumbRender from "src/components/breadcrumbRender";
import Branch from "./branch";
import { useAuth } from "src/context/auth";
import NewBranchService, {
  ListBranchesResponse,
} from "src/services/api/branch";

const repositorySvc = NewRepositoryService();
const branchSvc = NewBranchService();

interface DetailProps {
  router: Router;
  setActiveTab: Function;
}

const Detail = (props: DetailProps) => {
  const [dataSource, setDataSource] = useState<Repository>();
  const [listBranches, setlistBranches] = useState<Array<string>>();
  const router = useRouter();
  const { user } = useAuth();
  const { id } = router.query;
  const folderName = dataSource?.name.substring(
    dataSource?.name.lastIndexOf("/") + 1,
    dataSource?.name.length
  );
  useEffect(() => {
    props.setActiveTab("repositories");
    id &&
      repositorySvc
        .getRepository({ id: id })
        .then((resp: Repository) => {
          console.log("%c resp getRepository", "color: blue;", resp);
          setDataSource(resp);
        })
        .catch((err) => {
          console.log("%c err", "color: red;", err);
        });
    id &&
      branchSvc
        .listBranches({ id: id })
        .then((resp: ListBranchesResponse) => {
          console.log("%c resp listBranches", "color: blue;", resp);
          setlistBranches(resp._items);
        })
        .catch((err) => {
          console.log("%c err", "color: red;", err);
        });
  }, [id]);

  return (
    <Layout>
      <PageHeader
        title="Repository Detail"
        className="layout-header"
        onBack={() => window.history.back()}
        breadcrumb={{
          routes: [
            {
              path: "/repositories",
              breadcrumbName: "Repositories",
            },
            {
              path: "/",
              breadcrumbName: "Detail",
            },
          ],
        }}
        breadcrumbRender={BreadcrumbRender}
      />
      <Layout.Content className="layout-content">
        {dataSource ? (
          <Row gutter={24}>
            <Col span={24}>
              <Card
                title={
                  <div style={{ fontSize: "20px" }}>{dataSource?.name}</div>
                }
                extra={
                  <Button>
                    <Link href={`/repositories/accesses?id=${id}`}>
                      View Accesses
                    </Link>
                  </Button>
                }
              >
                <Tabs defaultActiveKey="1">
                  <Tabs.TabPane tab="HTTP" key="1">
                    <Command
                      title="Clone with commit-msg hook"
                      value={
                        `git clone "https://${user.id}@gerrit-pre.cdgfossil.com/a/${dataSource?.name}" && (cd "${folderName}" && mkdir -p .git/hooks && curl -Lo ` +
                        "`git rev-parse --git-dir`" +
                        `/hooks/commit-msg https://${user.id}@gerrit-pre.cdgfossil.com/tools/hooks/commit-msg; chmod +x ` +
                        "`git rev-parse --git-dir`" +
                        `/hooks/commit-msg)`
                      }
                    />

                    <Command
                      title="Clone"
                      value={`git clone "https://${user.id}@gerrit-pre.cdgfossil.com/a/${dataSource?.name}"`}
                    />
                  </Tabs.TabPane>
                  <Tabs.TabPane tab="REPO" key="2">
                    <Command
                      title="Clone"
                      value={`git clone "${dataSource?.name}"`}
                    />
                  </Tabs.TabPane>
                  <Tabs.TabPane tab="SSH" key="3">
                    <Command
                      title="Clone with commit-msg hook"
                      value={`git clone "ssh://${user.id}@gerrit-pre.cdgfossil.com:5222/${dataSource?.name}" && scp -p -P 5222 ${user.id}@gerrit-pre.cdgfossil.com:hooks/commit-msg "${folderName}/.git/hooks/"`}
                    />

                    <Command
                      title="Clone"
                      value={`git clone "ssh://${user.id}@gerrit-pre.cdgfossil.com:5222/${dataSource?.name}"`}
                    />
                  </Tabs.TabPane>
                </Tabs>
                <div>
                  <div className="gr-label">{dataSource?.description}</div>
                  <Input.TextArea rows={4} />
                </div>
              </Card>
            </Col>
            <Col span={24} className="repository-detail__card">
              <Branch id={dataSource.name} dataSource={listBranches} />
            </Col>
          </Row>
        ) : (
          <Row gutter={[14, 21]}>
            <Col sm={24} md={24} xs={24}>
              <Skeleton paragraph={{ rows: 12 }} />
            </Col>
          </Row>
        )}
      </Layout.Content>
    </Layout>
  );
};

export default Detail;
