import { Button, Form, Input, notification, Select } from "antd";
import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";

import NewGroupService, {
  CreateRequestGroupRequest,
  Group,
} from "src/services/api/groups";
import { User } from "src/services/api/users";
import { validateMessages } from "./validate";

const groupSvc = NewGroupService();
interface Props {
  listUsers: any;
  listGroups: Group[];
}

const CreateGroup = (props: Props) => {
  const [form] = Form.useForm();
  const router = useRouter();
  const [listLeaders, setListLeaders] = useState<any>([]);
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);

    const members: User[] = [];
    for (let item of values.members) {
      members.push({ id: item });
    }
    const leaders: User[] = [];
    for (let item of values.leaders) {
      leaders.push({ id: item });
    }
    const subGroup: any[] = [];
    for (let item of values.groups) {
      subGroup.push({ id: item });
    }
    const request: CreateRequestGroupRequest = {
      group_name: values.group_name,
      reason: values.reason,
      members,
      leaders,
      subgroups: subGroup,
    };
    console.log("%c request", "color: blue;", request);
    groupSvc
      .createGroupRequest(request)
      .then((resp) => {
        router.push(`/requests/details?id=${resp.id}`);

        notification["success"]({
          message: "Request have been sent",
        });
      })
      .catch((error) => {
        notification["error"]({
          message: error.message || "Send request failed",
        });
      });
  };
  return (
    <Form
      form={form}
      layout="vertical"
      className="form-permission"
      onFinish={onFinish}
      validateMessages={validateMessages}
    >
      <div className="title-wrap">
        <span className="title">Request to create a Group</span>
      </div>
      <Form.Item
        name="group_name"
        label="Name"
        rules={[
          { required: true },
          () => ({
            validator(_, value) {
              const expression = /^[0-9a-zA-Z_-]*$/;
              const regex = new RegExp(expression);
              if (value.match(regex)) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error(
                  "Name can contain letters (a-z), numbers (0-9), and charecters (-_/)."
                )
              );
            },
          }),
        ]}
      >
        <Input placeholder="Name of group" />
      </Form.Item>
      <Form.Item name="members" label="Members" rules={[{ required: true }]}>
        <Select
          mode="multiple"
          placeholder="Choose members"
          style={{ width: "100%" }}
          onChange={(value, options) => {
            setListLeaders(options);
          }}
        >
          {props.listUsers.map((item: any) => (
            <Select.Option {...item} value={item.id}>
              {item.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="leaders"
        label="Leaders"
        rules={[
          { required: true },
          () => ({
            validator(_, value) {
              if (value.length < 3) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("Can't choose more than 2 leaders")
              );
            },
          }),
        ]}
      >
        <Select
          mode="multiple"
          placeholder="Choose leaders (max 2) "
          style={{ width: "100%" }}
        >
          {listLeaders.map((item: any) => (
            <Select.Option key={item.id} value={item.id}>
              {item.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item name="groups" label="Included Groups">
        <Select
          mode="multiple"
          placeholder="Choose sub-groups"
          style={{ width: "100%" }}
          onChange={(value, options) => {
            setListLeaders(options);
          }}
        >
          {props.listGroups.map((item: any) => (
            <Select.Option {...item} value={item.id}>
              {item.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item name="reason" label="Request Note">
        <Input.TextArea placeholder="I want to ..." />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateGroup;
