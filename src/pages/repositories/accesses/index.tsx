import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Layout, PageHeader, Button, Alert, Row, Col, Skeleton } from "antd";
import { Router, useRouter } from "next/dist/client/router";
import _ from "lodash";

import { Reference } from "../../../components/repositories/reference";
import BreadcrumbRender from "src/components/breadcrumbRender";
import NewRepositoryService, {
  Repository,
} from "src/services/api/repositories";

const repositorySvc = NewRepositoryService();

interface AccessesProps {
  router: Router;
  setActiveTab: Function;
}

const Accesses = (props: AccessesProps) => {
  const [dataSource, setDataSource] = useState<any>();
  const router = useRouter();
  const [info, setInfo] = useState<any>();
  const { id } = router.query;
  useEffect(() => {
    props.setActiveTab("repositories");
    id &&
      repositorySvc
        .getRepository({ id: id })
        .then((resp: Repository) => {
          setInfo(resp);
          let dict: any = {};
          console.time("forEach");

          resp.permissions.forEach((permission: any) => {
            if (!dict[permission.reference]) {
              dict[permission.reference] = {};
              dict[permission.reference][permission.name] = [permission];
            } else {
              if (!dict[permission.reference][permission.name]) {
                dict[permission.reference][permission.name] = [permission];
              } else {
                dict[permission.reference][permission.name].push(permission);
              }
            }
          });
          console.timeEnd("forEach");
          setDataSource(dict);
        })
        .catch((err) => {
          console.log("%c err", "color: red;", err);
        });
  }, [id]);

  return (
    <Layout>
      <PageHeader
        title={info?.name}
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
              breadcrumbName: "Access",
            },
          ],
        }}
        breadcrumbRender={BreadcrumbRender}
        extra={[
          <Button key="edit">
            <Link href={`/repositories/details?id=${id}`}>
              <a>View Detail</a>
            </Link>
          </Button>,
        ]}
      />
      <Layout.Content className="layout-content">
        <Row gutter={[0, 21]}>
          {info?.parent ? (
            <Col span={24}>
              <Alert
                message={
                  <div>
                    <span>Rights are inheriting from </span>
                    <Link href={`/repositories/accesses?id=${info?.parent}`}>
                      <a>{info?.parent}</a>
                    </Link>
                  </div>
                }
                type="info"
                showIcon
              />
            </Col>
          ) : null}
          <Col span={24}>
            {dataSource ? (
              <Reference dataSource={dataSource} />
            ) : (
              <Row gutter={[14, 21]}>
                <Col sm={24} md={24} xs={24}>
                  <Skeleton paragraph={{ rows: 12 }} />
                </Col>
              </Row>
            )}
          </Col>
        </Row>
      </Layout.Content>
    </Layout>
  );
};

export default Accesses;
