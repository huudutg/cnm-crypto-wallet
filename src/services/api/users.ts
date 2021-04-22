import { useAuth } from "src/context/auth";
import { Metadata } from "src/utils/types";
import { url } from "src/utils/url";
import { AXIOS } from "./config";
import { parseError } from "./errors";
import { Group } from "./groups";
import { Permission } from "./permission";
import { Repository } from "./repositories";

export type User = {
  readonly id: string;
  readonly uuid: string;
  readonly _account_id?: string;
  readonly name?: string;
  readonly email?: string;
  readonly username?: string;
  readonly avatar?: string;
  readonly is_lead?: boolean;
  readonly groups?: Group[];
  readonly user_permissions?: Permission[];
  readonly repo?: Repository[];
};

export type ListUsersRequest = {
  name: string;
};
export type ListUsersResponse = {
  _items: User[];
  _range: Metadata;
};
export type GetUserRequest = {};
export type GetUserResponse = User;

export type GetLogsUserRequest = {};
export type GetLogsUserResponse = any;

interface IUserService {
  listUsers(req: ListUsersRequest): Promise<ListUsersResponse>;
  getUser(_: GetUserRequest): Promise<GetUserResponse>;
}

class UserService implements IUserService {
  private readonly client = AXIOS;

  async listUsers(req: ListUsersRequest): Promise<ListUsersResponse> {
    try {
      const res: any = await this.client.get(url.USERS);
      for (const item of res.data.items) {
        item.value = item.name;
        item.key = item.id;
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

  async getUser(req: GetUserRequest): Promise<GetUserResponse> {
    const { user } = useAuth();

    try {
      const res: any = await this.client.get(url.USERS + `/${user.id}`);
      return res;
    } catch (err) {
      throw parseError(err);
    }
  }
}

const NewUserService = (): IUserService => new UserService();

export default NewUserService;
