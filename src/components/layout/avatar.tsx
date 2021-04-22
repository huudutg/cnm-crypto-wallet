import React from "react";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Menu, Dropdown } from "antd";

import { logout } from "src/services/api/identity";
import { useAuth } from "src/context/auth";

const AvatarDropdown = () => {
  const { user } = useAuth();

  const onMenuClick = (event: { key: React.Key }) => {
    const { key } = event;
    switch (key) {
      case "logout":
        logout();
        break;
      case "profile":
        break;
    }
  };
  const menuHeaderDropdown = (
    <Menu selectedKeys={[]} onClick={onMenuClick}>
      <Menu.Item key="profile">
        <UserOutlined />
        <span>User profile</span>
      </Menu.Item>
      <Menu.Item key="logout">
        <LogoutOutlined />
        <span>Logout</span>
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menuHeaderDropdown}>
      <div>
        <Avatar
          size={36}
          gap={4}
          src={user?.avatar}
          alt="avatar"
          className="avatar"
        />
      </div>
    </Dropdown>
  );
};

export default AvatarDropdown;
