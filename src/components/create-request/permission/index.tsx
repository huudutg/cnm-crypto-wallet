import { AutoComplete, Form, notification, Radio } from "antd";
import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";

import NewBranchService from "src/services/api/branch";
import { Group } from "src/services/api/groups";
import { Manifest } from "src/services/api/manifests";
import NewPermissionService, {
  Permission,
  PermissionRequest,
} from "src/services/api/permission";
import NewRoleService from "src/services/api/roles";
import { validateMessages } from "../validate";
import PermissionRepo from "./permissionRepo";

interface Props {
  type: "ADD" | "REMOVE";
  listUsers: any;
  listRepos: any;
  listGroups: Group[];
  listManifests: Manifest[];
}
const roleSvc = NewRoleService();
const permissionSvc = NewPermissionService();
const branchSvc = NewBranchService();

type RequestPermission = {
  repo: string;
  user: string;
  role?: string;
  reqfor: string;
  permission?: Permission;
};

const PermissionRequestComponent = (props: Props) => {
  const [form] = Form.useForm();
  const [type, setType] = useState<string>("repository");
  const [reqPermission, setReqPermission] = useState<RequestPermission>({
    repo: "",
    user: "",
    role: "",
    reqfor: "",
    permission: undefined,
  });
  const [listRoles, setListRoles] = useState<any>([]);
  const [listBranches, setListBranches] = useState<string[]>([]);
  const [listPermissions, setListPermissions] = useState<Array<Permission>>([]);
  const router = useRouter();

  const onFinish = (values: any) => {
    console.log("%c reqPermission", "color: pink;", reqPermission);
    const prefix =
      values.req.roleperm === "permission" ? values.req.prefix : "";
    const branch = values.req.branch || "*";

    const initialReq: PermissionRequest = {
      branch: prefix + branch,
      request_type: props.type,
      reason: values.req.note || "",
    };

    const typeRolePerm: PermissionRequest =
      values.req.roleperm === "permission"
        ? {
            ...initialReq,
            permission: reqPermission.permission,
          }
        : {
            ...initialReq,
            role: reqPermission.role,
          };

    const typeReq: PermissionRequest =
      type === "manifest"
        ? {
            ...typeRolePerm,
            manifest: reqPermission.repo,
          }
        : {
            ...typeRolePerm,
            repo: reqPermission.repo,
          };
    const request: PermissionRequest =
      reqPermission.reqfor === "user"
        ? { ...typeReq, user: reqPermission.user }
        : { ...typeReq, group: reqPermission.user };

    console.log("%c values", "color: red;", values);
    console.log("Request: ", request);

    permissionSvc
      .createPermissionRequest(request)
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
  useEffect(() => {
    roleSvc.listRoles({}).then((repos) => {
      setListRoles(repos._items);
    });

    permissionSvc.listPermissions().then((repos) => {
      setListPermissions(repos._items);
    });
  }, []);

  useEffect(() => {
    reqPermission.repo &&
      branchSvc.listBranches({ id: reqPermission.repo }).then((repos) => {
        setListBranches(repos._items);
      });
  }, [reqPermission.repo]);

  return (
    <Form
      form={form}
      layout="vertical"
      className="form-permission"
      onFinish={onFinish}
      initialValues={{ type }}
      validateMessages={validateMessages}
    >
      <div className="title-wrap">
        <span className="title">
          Request for {props.type === "REMOVE" ? "revoke" : ""} Permission
        </span>
        <hr />
      </div>
      <Form.Item name="type">
        <Radio.Group buttonStyle="solid" value={type}>
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
            options={props.listRepos}
            onChange={() => {
              setReqPermission({ ...reqPermission, repo: "" });
            }}
            onSelect={(_, option: any) => {
              setReqPermission({
                ...reqPermission,
                repo: option.id,
              });
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
          label="Manifest Name"
          rules={[{ required: true }]}
        >
          <AutoComplete
            style={{ width: "100%" }}
            options={props.listManifests as any}
            onChange={() => {
              setReqPermission({ ...reqPermission, repo: "" });
            }}
            onSelect={(_, option: any) => {
              setReqPermission({ ...reqPermission, repo: option.value });
            }}
            filterOption={(inputValue, option) =>
              option!.value.toLowerCase().indexOf(inputValue.toLowerCase()) !==
              -1
            }
          />
        </Form.Item>
      )}

      <PermissionRepo
        type={type}
        reqPermission={reqPermission}
        setReqPermission={(value: any) => setReqPermission(value)}
        listRepos={props.listRepos}
        listUsers={props.listUsers}
        listRoles={listRoles}
        listGroups={props.listGroups}
        listPermissions={listPermissions}
        listBranches={listBranches}
      />
    </Form>
  );
};

export default PermissionRequestComponent;
