import {
  CheckSquareOutlined,
  CloseSquareOutlined,
  CodeSandboxOutlined,
  ForkOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React from "react";

import { REQUEST } from "src/utils/consts";
const MenuCreate = ({ activeTab, setActiveTab, children }: any) => {
  return (
    <Layout className="layout">
      <Layout.Sider width="100%" breakpoint="lg" collapsible theme="light">
        <Menu
          mode="inline"
          selectedKeys={[activeTab]}
          defaultOpenKeys={["permissions"]}
        >
          <Menu.ItemGroup>
            <Menu.Item
              icon={<CheckSquareOutlined />}
              onClick={() => setActiveTab(REQUEST.permission)}
              key={REQUEST.permission}
            >
              <a>Request for Permission</a>
            </Menu.Item>
            <Menu.Item
              icon={<CloseSquareOutlined />}
              onClick={() => setActiveTab(REQUEST.revokePermission)}
              key={REQUEST.revokePermission}
            >
              <a>Request to revoke Permission</a>
            </Menu.Item>
            <Menu.Item
              icon={<CodeSandboxOutlined />}
              onClick={() => setActiveTab(REQUEST.createRepo)}
              key={REQUEST.createRepo}
            >
              <a>Request to create a Repo</a>
            </Menu.Item>
            <Menu.Item
              icon={<UsergroupAddOutlined />}
              onClick={() => setActiveTab(REQUEST.createGroup)}
              key={REQUEST.createGroup}
            >
              <a>Request to create a Group</a>
            </Menu.Item>
            <Menu.Item
              icon={<ForkOutlined />}
              onClick={() => setActiveTab(REQUEST.createBranch)}
              key={REQUEST.createBranch}
            >
              <a>Request to create a Branch</a>
            </Menu.Item>
          </Menu.ItemGroup>
        </Menu>
      </Layout.Sider>
      {children}
    </Layout>
  );
};

export default MenuCreate;
