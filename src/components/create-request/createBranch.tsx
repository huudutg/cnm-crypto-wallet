import { AutoComplete, Button, Form, Input, notification, Radio } from "antd";
import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";

import NewBranchService, {
  CreateRequestBranchRequest,
} from "src/services/api/branch";
import { Manifest } from "src/services/api/manifests";
import { Repository } from "src/services/api/repositories";
import { validateMessages } from "./validate";

interface Props {
  listRepos: Repository[];
  listManifests: Manifest[];
}
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const branchSvc = NewBranchService();

const CreateBranch = (props: Props) => {
  const [type, setType] = useState<string>("repository");
  const [form] = Form.useForm();
  const [targetID, setTargetID] = useState<string>("");
  const router = useRouter();
  const { typereq, name } = router.query;
  const onFinish = (values: CreateRequestBranchRequest) => {
    values =
      type === "repository"
        ? { ...values, repo: targetID }
        : { ...values, manifest: targetID };
    console.log("values", values);
    if (values.repo || values.manifest) {
      branchSvc
        .createBranchRequest(values)
        .then((resp) => {
          console.log("resp createBranchRequest", resp);
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
    } else {
      notification["error"]({
        message: "Invalid request",
      });
    }
  };
  useEffect(() => {
    if (typereq && name) {
      setType(typereq as string);
      setTargetID(name as string);
    }
  }, []);
  return (
    <Form
      form={form}
      layout="vertical"
      className="form-permission"
      onFinish={onFinish}
      validateMessages={validateMessages}
    >
      <div className="title-wrap">
        <span className="title">Request to create a Branch</span>
      </div>
      <Form.Item name="type">
        <Radio.Group
          buttonStyle="solid"
          defaultValue={typereq || type}
          value={type}
        >
          <Radio.Button
            onClick={() => setType("repository")}
            style={{ width: "100px", textAlign: "center" }}
            value="repository"
          >
            Repository
          </Radio.Button>
          <Radio.Button
            style={{ width: "100px", textAlign: "center" }}
            value="manifest"
            onClick={() => setType("manifest")}
          >
            Manifest
          </Radio.Button>
        </Radio.Group>
      </Form.Item>
      {type == "repository" ? (
        <Form.Item
          name={["req", "repoName"]}
          label="Repo Name"
          rules={[{ required: true }]}
        >
          <AutoComplete
            style={{ width: "100%" }}
            options={props.listRepos as any}
            onChange={() => {
              setTargetID("");
            }}
            onSelect={(_, option: any) => {
              setTargetID(option.id);
            }}
            filterOption={(inputValue, option) =>
              option!.value.toLowerCase().indexOf(inputValue.toLowerCase()) !==
              -1
            }
          />
        </Form.Item>
      ) : (
        <Form.Item
          name={["req", "manifestName"]}
          initialValue={targetID}
          label="Manifest Name"
          rules={[{ required: true }]}
        >
          <AutoComplete
            style={{ width: "100%" }}
            options={props.listManifests as any}
            onChange={() => {
              setTargetID("");
            }}
            onSelect={(_, option: any) => {
              console.log("%c option", "color: blue;", option);
              setTargetID(option.name);
            }}
            filterOption={(inputValue, option) =>
              option!.value.toLowerCase().indexOf(inputValue.toLowerCase()) !==
              -1
            }
          />
        </Form.Item>
      )}
      <Form.Item
        name="branch"
        label="Branch Name"
        rules={[
          { required: true },
          () => ({
            validator(_, value) {
              const expression = /^[0-9a-z_-]*$/;
              const regex = new RegExp(expression);
              if (value.match(regex)) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error(
                  "Name can contain letters (a-z), numbers (0-9), and charecters (- and _)."
                )
              );
            },
          }),
        ]}
      >
        <Input />
      </Form.Item>
      {type == "repository" && (
        <Form.Item
          name="revision"
          label="Initial Revision"
          rules={[
            () => ({
              validator(_, value: any) {
                const expression = /^[0-9a-z]*$/;
                const regex = new RegExp(expression);
                if (value === undefined || value.match(regex)) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error(
                    "Initial Revision can contain letters (a-z), numbers (0-9)"
                  )
                );
              },
            }),
          ]}
        >
          <Input defaultValue="" />
        </Form.Item>
      )}
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

export default CreateBranch;
