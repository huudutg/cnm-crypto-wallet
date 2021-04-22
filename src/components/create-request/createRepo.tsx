import { Button, Form, Input, notification } from "antd";
import { useRouter } from "next/dist/client/router";
import React from "react";

import NewRepositoryService, {
  RequestRepoRequest,
} from "src/services/api/repositories";
import { validateMessages } from "./validate";

interface Props {}
const repoSvc = NewRepositoryService();
/* eslint-disable no-template-curly-in-string */
const CreateRepo = (props: Props) => {
  const router = useRouter();
  const [form] = Form.useForm();
  const onFinish = (values: RequestRepoRequest) => {
    repoSvc
      .createRequestRepo(values)
      .then((resp) => {
        console.log("%c respcreateRequestRepo", "color: blue;", resp);
        router.push(`/requests/details?id=${resp.id}`);
        notification["success"]({
          message: "Request have been sent",
        });
        // form.resetFields();
      })
      .catch((error) => {
        console.log("%c errorcreateRequestRepo", "color: blue;", error);
        notification["error"]({
          message: error.message,
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
        <span className="title">Request to create a Repo</span>
        <hr />
      </div>
      <Form.Item
        name="repo"
        label="Name"
        rules={[
          { required: true },
          () => ({
            validator(_, value) {
              const expression = /^[/0-9a-z_-]*$/;
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
        <Input placeholder="Name of repo" />
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

export default CreateRepo;
