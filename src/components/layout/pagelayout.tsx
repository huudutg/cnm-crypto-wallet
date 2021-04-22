import React, { ReactNode } from "react";
import Link from "next/link";
import {
  ProfileOutlined,
  MailOutlined,
  FolderOutlined,
  TeamOutlined,
  AppstoreOutlined,
  TagsOutlined,
  SettingOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";

import Header from "./header";
import { useAuth } from "src/context/auth";

const PageLayout = ({
  activeTab,
  children,
}: {
  activeTab: string;
  children: ReactNode;
}) => {
  const { user } = useAuth();

  return user.id === "" || !user?.id ? (
    <>{children}</>
  ) : (
    <Layout className={"layout"}>
      <Header />
      <Layout>
        <Layout.Sider width={200} breakpoint="lg" collapsible theme="light">
          <Menu
            mode="inline"
            selectedKeys={[activeTab]}
            defaultOpenKeys={["permissions"]}
          >
            <Menu.ItemGroup>
              <Menu.Item key="repositories" icon={<FolderOutlined />}>
                <Link href={"/repositories"}>
                  <a>Repositories</a>
                </Link>
              </Menu.Item>
              <Menu.Item key="manifests" icon={<ProfileOutlined />}>
                <Link href={"/manifests"}>
                  <a>Manifests</a>
                </Link>
              </Menu.Item>
              <Menu.Item key="groups" icon={<TeamOutlined />}>
                <Link href={"/groups"}>
                  <a>Groups</a>
                </Link>
              </Menu.Item>
              <Menu.Item key="departments" icon={<AppstoreOutlined />}>
                <Link href={"/departments"}>
                  <a>Departments</a>
                </Link>
              </Menu.Item>
              <Menu.Item key="requests" icon={<MailOutlined />}>
                <Link href={"/requests"}>
                  <a>Requests</a>
                </Link>
              </Menu.Item>
              <Menu.Item key="roles" icon={<TagsOutlined />}>
                <Link href={"/roles"}>
                  <a>Roles</a>
                </Link>
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item key="auditlogs" icon={<FileTextOutlined />}>
                <Link href={"/auditlogs"}>
                  <a>Audit logs</a>
                </Link>
              </Menu.Item>
              <Menu.Item key="profile" icon={<SettingOutlined />}>
                <Link href={"/profile"}>
                  <a>Settings</a>
                </Link>
              </Menu.Item>
            </Menu.ItemGroup>
          </Menu>
        </Layout.Sider>
        {children}
      </Layout>
    </Layout>
  );
};

export default PageLayout;
