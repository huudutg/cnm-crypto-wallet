import { Metadata } from "src/utils/types";
import { AXIOS } from "./config";
import { parseError } from "./errors";
import { User } from "src/services/api/users";
import { url } from "src/utils/url";
import { Permission } from "./permission";

export type Group = {
  readonly id: string;
  readonly url?: string;
  readonly name: string;
  readonly description?: string;
  readonly department?: string;
  readonly members: User[];
  readonly leaders?: User[];
  readonly subgroups?: Group[];
  readonly permissions?: Permission[];
  readonly created_at?: string;
  readonly updated_at?: string;
  key?: string;
  value?: string;
  isgroup?: string;
};
export type GroupRequest = {
  readonly group_name: string;
  readonly reason: string;
  readonly department?: string;
  readonly members: User[];
  readonly leaders: User[];
  readonly subgroups: Group[];
  readonly request_user?: string;
  readonly reviewer?: string;
  readonly status?: "OPEN" | "REJECTED" | "APPROVED";
  readonly created_at?: string;
  readonly updated_at?: string;
  readonly reviewer_comment?: string;
};
export type CreateRequestGroupRequest = {
  readonly group_name: string;
  readonly reason: string;
  readonly members: User[];
  readonly leaders: User[];
  readonly subgroups: Group[];
};
export type CreateRequestGroupResponse = { code: number; id: string };
export type ListGroupsRequest = {};
export type ListGroupsResponse = {
  _items: Group[];
  _range: Metadata;
};
export type GetGroupResponse = Group;

export type GetLogsGroupRequest = {};
export type GetLogsGroupResponse = any;

export type ApproveRequestResponse = { code: number };
type ApproveRequestRequest = {
  id: string | string[] | undefined;
};
type GetGroupRequest = {
  id: string | string[] | undefined;
};

export type GetRequestRequest = {
  id: string | string[] | undefined;
};
export type GetRequestResponse = GroupRequest;

export type RejectRequestResponse = { code: number };
type RejectRequestRequest = {
  id: string | string[] | undefined;
  reason: string;
};

interface IGroupService {
  listGroups(_: ListGroupsRequest): Promise<ListGroupsResponse>;
  getGroup(_: GetGroupRequest): Promise<GetGroupResponse>;
  createGroupRequest(
    req: CreateRequestGroupRequest
  ): Promise<CreateRequestGroupResponse>;
  getRequest(_: GetRequestRequest): Promise<GetRequestResponse>;
  ApproveRequest(req: ApproveRequestRequest): Promise<RejectRequestResponse>;
  RejectRequest(req: RejectRequestRequest): Promise<RejectRequestResponse>;
  // getGroup(_: GetGroupRequest): Promise<GetGroupResponse>;
}

class GroupService implements IGroupService {
  private readonly client = AXIOS;

  async listGroups(req: ListGroupsRequest): Promise<ListGroupsResponse> {
    try {
      const res: { data: { items: Group[] } } = await this.client.get(
        url.GROUPS
      );
      for (const item of res.data.items) {
        // item.value = item.name;
        // item.key = item.id;
        item.isgroup = "true";
      }
      return {
        _items: res.data.items,
        _range: {
          total: 2,
          limit: 10,
          offset: 0,
        },
      };
    } catch (err) {
      throw parseError(err);
    }
  }

  async getGroup(req: GetGroupRequest): Promise<GetGroupResponse> {
    try {
      const res: { data: { info: Group } } = await this.client.get(
        url.GROUPS + `/${req.id}`
      );
      console.log("%c res.data.info", "color: blue;", res.data.info);
      return res.data.info as GetGroupResponse;
    } catch (err) {
      throw parseError(err);
    }
  }

  async createGroupRequest(
    req: CreateRequestGroupRequest
  ): Promise<CreateRequestGroupResponse> {
    try {
      const res = await this.client.post(url.REQUEST_GROUPS, req);
      return res.data as CreateRequestGroupResponse;
    } catch (err) {
      throw parseError(err);
    }
  }
  async getRequest(req: GetRequestRequest): Promise<GetRequestResponse> {
    try {
      const res: any = await this.client.get(url.REQUEST_GROUPS + `/${req.id}`);
      // console.log("res", res);, res);
      return res?.data?.info as GetRequestResponse;
    } catch (err) {
      throw parseError(err);
    }
  }
  async ApproveRequest(
    req: ApproveRequestRequest
  ): Promise<ApproveRequestResponse> {
    try {
      const res: any = await this.client.post(
        url.RPC_GROUPS + `/${req.id}/approve`
      );
      // console.log("res", res);, res);
      return res?.data as ApproveRequestResponse;
    } catch (err) {
      throw parseError(err);
    }
  }
  async RejectRequest(
    req: RejectRequestRequest
  ): Promise<RejectRequestResponse> {
    try {
      const res: any = await this.client.post(
        url.RPC_GROUPS + `/${req.id}/reject`,
        { reviewer_comment: req.reason }
      );
      // console.log("res", res);, res);
      return res?.data as RejectRequestResponse;
    } catch (err) {
      throw parseError(err);
    }
  }
}

const NewGroupService = (): IGroupService => new GroupService();

export default NewGroupService;
