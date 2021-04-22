import { Tag } from "antd";
import React from "react";

import { Permission } from "src/services/api/permission";

export const renderItemUser = (user: any) => ({
  value: user.name,
  key: user.id,
  isgroup: user.isgroup ? "group" : "user",
  label: (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          whiteSpace: "nowrap",
          width: "340px",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {user.name}
      </div>

      <span>
        {user.isgroup ? (
          <Tag color="magenta">group</Tag>
        ) : (
          <Tag color="lime">user</Tag>
        )}
      </span>
    </div>
  ),
});

export const renderItemPermission = (perm: Permission) => ({
  value: perm.name,
  key: perm.uuid,
  info: perm,
  label: (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div>
        <b>{perm.name} </b>
      </div>
      <div style={{ color: "gray" }}>
        {"("}
        {perm.label || "-"}, {perm.action || "-"}
        {", "}
        {perm.force?.toString()}, {perm.exclusive?.toString()}
        {", "}
        {perm.min?.toString()}, {perm.max?.toString()}
        {")"}
      </div>
    </div>
  ),
});

export const renderItemBranch = (branch: string) => ({
  value: branch,
  key: branch,
  label: <div>{branch}</div>,
});
