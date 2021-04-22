import { Metadata } from "src/utils/types";
import { url } from "src/utils/url";
import { AXIOS } from "./config";
import { parseError } from "./errors";
import { Permission } from "./permission";

export type Role = {
  readonly id: string;
  readonly name: string;
  readonly member?: number;
  readonly description?: string;
  readonly permission_ref?: Permission[];
  readonly created_at: string;
  readonly updated_at?: string;
};

export type ListRolesRequest = {};
export type ListRolesResponse = {
  _items: Role[];
  _range: Metadata;
};
export type GetRoleRequest = { id: string | string[] | undefined };
export type GetRoleResponse = Role;

export type GetLogsRoleRequest = {};
export type GetLogsRoleResponse = any;

interface IRoleService {
  listRoles(_: ListRolesRequest): Promise<ListRolesResponse>;
  getRole(_: GetRoleRequest): Promise<GetRoleResponse>;
  getLogsRole(_: GetLogsRoleRequest): Promise<GetLogsRoleResponse>;
}
class RoleService implements IRoleService {
  private readonly client = AXIOS;

  async listRoles(req: ListRolesRequest): Promise<ListRolesResponse> {
    try {
      const res: any = await this.client.get(url.ROLES);
      for (const item of res.data.items) {
        item.value = item.name;
      }
      return {
        _items: res.data.items,
        _range: {
          total: 4,
          limit: 10,
          offset: 0,
        },
      };
    } catch (err) {
      throw parseError(err);
    }
  }

  async getRole(req: GetRoleRequest): Promise<GetRoleResponse> {
    try {
      const res: any = await this.client.get(url.ROLES + `/${req.id}`);
      console.log("%c res getRole", "color: blue;", res);
      return res.data.info;
    } catch (err) {
      throw parseError(err);
    }
  }

  async getLogsRole(req: GetLogsRoleRequest): Promise<GetLogsRoleResponse> {
    try {
      return [
        {
          id: "1",
          user: "Si Nguyen (1001)",
          activity: "Added",
          member: "Trung Tran (1002)",
          datetime: "2021-01-06T05:05:05.891Z",
        },
        {
          id: "2",
          user: "Si Nguyen (1002)",
          activity: "Removed",
          member: "Trung Tran (1003)",
          datetime: "2020-01-06T05:05:05.891Z",
        },
        {
          id: "3",
          user: "Si Nguyen (1002)",
          activity: "Removed",
          member: "Trung Tran (1003)",
          datetime: "2020-01-06T05:05:05.891Z",
        },
        {
          id: "4",
          user: "Si Nguyen (1002)",
          activity: "Removed",
          member: "Trung Tran (1003)",
          datetime: "2020-01-06T05:05:05.891Z",
        },
        {
          id: "5",
          user: "Si Nguyen (1002)",
          activity: "Removed",
          member: "Trung Tran (1003)",
          datetime: "2020-01-06T05:05:05.891Z",
        },
        {
          id: "6",
          user: "Si Nguyen (1002)",
          activity: "Removed",
          member: "Trung Tran (1003)",
          datetime: "2020-01-06T05:05:05.891Z",
        },
        {
          id: "7",
          user: "Si Nguyen (1002)",
          activity: "Removed",
          member: "Trung Tran (1003)",
          datetime: "2020-01-06T05:05:05.891Z",
        },
        {
          id: "8",
          user: "Si Nguyen (1002)",
          activity: "Removed",
          member: "Trung Tran (1003)",
          datetime: "2020-01-06T05:05:05.891Z",
        },
        {
          id: "9",
          user: "Si Nguyen (1002)",
          activity: "Removed",
          member: "Trung Tran (1003)",
          datetime: "2020-01-06T05:05:05.891Z",
        },
        {
          id: "10",
          user: "Si Nguyen (1002)",
          activity: "Removed",
          member: "Trung Tran (1003)",
          datetime: "2020-01-06T05:05:05.891Z",
        },
        {
          id: "11",
          user: "Si Nguyen (1002)",
          activity: "Removed",
          member: "Trung Tran (1003)",
          datetime: "2020-01-06T05:05:05.891Z",
        },
      ];
    } catch (err) {
      throw parseError(err);
    }
  }
}

const NewRoleService = (): IRoleService => new RoleService();

export default NewRoleService;
