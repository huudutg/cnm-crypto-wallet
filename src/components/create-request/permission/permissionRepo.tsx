import { AutoComplete, Button, Form, Input, Select } from "antd";
import React, { useState } from "react";

import { Permission } from "src/services/api/permission";
import { User } from "src/services/api/users";
import {
  renderItemBranch,
  renderItemPermission,
  renderItemUser,
} from "./renderItemAutoComplete";

const { Option } = Select;

const PermissionRepo = ({
  reqPermission,
  setReqPermission,
  listUsers,
  listRoles,
  listGroups,
  listPermissions,
  listBranches,
}: any) => {
  const usersAndGroups = [...listUsers, ...listGroups];
  const [type, setType] = useState<string>("role");

  const options = [...usersAndGroups.map((user: User) => renderItemUser(user))];
  const optionsPermission = [
    ...listPermissions.map((perm: Permission) => renderItemPermission(perm)),
  ];
  const optionsBranch = [
    ...listBranches.map((branch: string) => renderItemBranch(branch)),
  ];
  return (
    <>
      <Form.Item name={["req", "role"]} label="Role(Permission)">
        <Input.Group compact>
          <Form.Item
            label="Select"
            name={["req", "roleperm"]}
            rules={[{ required: true }]}
            noStyle
          >
            <Select
              style={{ width: "22%" }}
              placeholder="Select type"
              onSelect={(opt: string) => {
                setType(opt);
              }}
            >
              <Option value="role">Role</Option>
              <Option value="permission">Permission</Option>
            </Select>
          </Form.Item>

          {type === "role" ? (
            <Form.Item
              name={["req", "rolepermvalue"]}
              label="Role"
              rules={[{ required: true }]}
              noStyle
            >
              <AutoComplete
                style={{ width: "78%" }}
                options={listRoles}
                onChange={() => {
                  setReqPermission({ ...reqPermission, role: "" });
                }}
                onSelect={(_, option: any) => {
                  setReqPermission({ ...reqPermission, role: option.value });
                }}
                filterOption={(inputValue, option) =>
                  option!.value
                    .toLowerCase()
                    .indexOf(inputValue.toLowerCase()) !== -1
                }
              />
            </Form.Item>
          ) : (
            <Form.Item name={["req", "rolepermvalue"]} noStyle>
              <AutoComplete
                style={{ width: "78%" }}
                options={type ? optionsPermission : []}
                onChange={() => {
                  setReqPermission({ ...reqPermission, role: "" });
                }}
                onSelect={(_, option: any) => {
                  console.log("%c option", "color: blue;", option);
                  setReqPermission({
                    ...reqPermission,
                    permission: option.info,
                  });
                }}
                filterOption={(inputValue, option) =>
                  option!.value
                    .toLowerCase()
                    .indexOf(inputValue.toLowerCase()) !== -1
                }
              />
              <div className="notations">
                Note: <b>Name</b> (Label, Action, Force, Exclusive, Min, Max)
              </div>
            </Form.Item>
          )}
        </Input.Group>
      </Form.Item>
      <Form.Item name={["req", "role"]} label="Branch">
        <Input.Group compact>
          {type === "role" ? (
            <Form.Item
              style={{ width: "100%" }}
              name={["req", "branch"]}
              noStyle
            >
              <Input defaultValue="*" />
            </Form.Item>
          ) : (
            <>
              <Form.Item
                label="Branch prefix"
                name={["req", "prefix"]}
                rules={[{ required: true }]}
                noStyle
              >
                <Select
                  style={{ width: "26%" }}
                  placeholder="Select type"
                  id="branch-select"
                >
                  <Option value="refs/heads/">refs/heads/</Option>
                  <Option value="refs/for/">refs/for/</Option>
                  <Option value="refs/for/refs/heads/">
                    refs/for/refs/heads/
                  </Option>
                  <Option value="refs/">refs/</Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="Branch name"
                name={["req", "branch"]}
                rules={[
                  () => ({
                    validator(_, value) {
                      const expression = /^[/0-9a-z_-]*$/;
                      const regex = new RegExp(expression);
                      if (value.match(regex)) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "Name can contain letters (a-z), numbers (0-9), and charecters (- / _)."
                        )
                      );
                    },
                  }),
                ]}
                noStyle
              >
                <AutoComplete
                  style={{ width: "74%" }}
                  options={optionsBranch}
                  onChange={() => {
                    setReqPermission({ ...reqPermission, role: "" });
                  }}
                  onSelect={(_, option: any) => {
                    console.log("%c option", "color: blue;", option);
                    setReqPermission({ ...reqPermission, role: option.value });
                  }}
                />
              </Form.Item>
            </>
          )}
        </Input.Group>
      </Form.Item>
      <Form.Item
        name={["req", "user"]}
        label="Request for"
        rules={[{ required: true }]}
      >
        <AutoComplete
          style={{ width: "100%" }}
          options={options}
          onChange={() => {
            setReqPermission({ ...reqPermission, user: "" });
          }}
          onSelect={(_, option: any) => {
            setReqPermission({
              ...reqPermission,
              user: option.key,
              reqfor: option.isgroup,
            });
          }}
          filterOption={(inputValue, option) =>
            option!.value.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1
          }
        />
      </Form.Item>
      <Form.Item name={["req", "note"]} label="Request Note">
        <Input.TextArea placeholder="I want to ..." />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </>
  );
};

export default PermissionRepo;
