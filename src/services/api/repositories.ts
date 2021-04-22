import { Metadata } from "src/utils/types";
import { url } from "src/utils/url";
import { AXIOS } from "./config";
import { parseError } from "./errors";

export type Repository = {
  readonly id: string;
  readonly name: string;
  readonly description?: string;
  readonly state?: string;
  readonly parent?: string;
  readonly created_at: string;
  readonly updated_at: string;
  value?: string;
  permissions?: any;
  readonly reviewer_comment?: string;
  // readonly inheriting?: {
  //   id: string;
  //   name: string;
  // };
  // readonly branches?: Array<{
  //   id: string;
  //   name: string;
  //   revision: string;
  // }>;
};

export type RepoRequest = {
  readonly repo: string;
  readonly reason: string;
  readonly description?: string;
  readonly parent?: string;
  readonly reviewer?: string;
  readonly request_user?: string;
  readonly status?: "OPEN" | "REJECTED" | "APPROVED";
  readonly created_at?: string;
  readonly updated_at?: string;
  id?: string;
  readonly inheriting?: {
    id: string;
    name: string;
  };
  readonly branches?: Array<{
    id: string;
    name: string;
    revision: string;
  }>;
};

export type ListRepositoriesRequest = {};
export type ListRepositoriesResponse = {
  _items: Repository[];
  _range: Metadata;
};
export type GetRepositoryRequest = {
  id: string | string[] | undefined;
};
export type GetRepositoryResponse = Repository;

export type GetLogsRepositoryRequest = {};
export type GetLogsRepositoryResponse = any;
export type RequestRepoRequest = {
  readonly repo: string;
  readonly reason?: string;
};
export type createRequestRepoResponse = { code: number; id: string };
export type ApproveRequestResponse = { code: number };
type ApproveRequestRequest = {
  id: string | string[] | undefined;
};

export type GetRequestRequest = {
  id: string | string[] | undefined;
};
export type GetRequestResponse = RepoRequest;
export type RejectRequestResponse = { code: number };
type RejectRequestRequest = {
  id: string | string[] | undefined;
  reason: string;
};
interface IRepositoryService {
  listRepositories(
    _: ListRepositoriesRequest
  ): Promise<ListRepositoriesResponse>;
  getRepository(req: GetRepositoryRequest): Promise<GetRepositoryResponse>;
  createRequestRepo(
    req: RequestRepoRequest
  ): Promise<createRequestRepoResponse>;
  ApproveRequest(req: ApproveRequestRequest): Promise<ApproveRequestResponse>;
  getRequest(_: GetRequestRequest): Promise<GetRequestResponse>;
  RejectRequest(req: RejectRequestRequest): Promise<RejectRequestResponse>;
}

class RepositoryService implements IRepositoryService {
  private readonly client = AXIOS;

  async listRepositories(
    _: ListRepositoriesRequest
  ): Promise<ListRepositoriesResponse> {
    try {
      const res: any = await this.client.get(url.REPOS);
      // for (const item of res.data.items) {
      //   item.value = item.name;
      // }
      res.data.items.forEach((item: Repository) => (item.value = item.name));
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

  async getRepository(
    req: GetRepositoryRequest
  ): Promise<GetRepositoryResponse> {
    try {
      const uri = encodeURIComponent(req.id as string);
      const res: any = await this.client.get(url.REPOS + `/${uri}`);
      return res.data.info as GetRepositoryResponse;
    } catch (err) {
      throw parseError(err);
    }
  }

  async createRequestRepo(
    req: RequestRepoRequest
  ): Promise<createRequestRepoResponse> {
    try {
      const res = await this.client.post(url.REQUEST_REPOS, req);
      return res.data as createRequestRepoResponse;
    } catch (err) {
      throw parseError(err);
    }
  }
  async ApproveRequest(
    req: ApproveRequestRequest
  ): Promise<ApproveRequestResponse> {
    try {
      const res: any = await this.client.post(
        url.RPC_REPOS + `/${req.id}/approve`
      );
      return res?.data as ApproveRequestResponse;
    } catch (err) {
      throw parseError(err);
    }
  }
  async getRequest(req: GetRequestRequest): Promise<GetRequestResponse> {
    try {
      const res: any = await this.client.get(url.REQUEST_REPOS + `/${req.id}`);
      // console.log("res", res);, res);
      return res?.data.info as GetRequestResponse;
    } catch (err) {
      throw parseError(err);
    }
  }
  async RejectRequest(
    req: RejectRequestRequest
  ): Promise<RejectRequestResponse> {
    try {
      const res: any = await this.client.post(
        url.RPC_REPOS + `/${req.id}/reject`,
        { reviewer_comment: req.reason }
      );
      // console.log("res", res);, res);
      return res?.data as RejectRequestResponse;
    } catch (err) {
      throw parseError(err);
    }
  }
}

const NewRepositoryService = (): IRepositoryService => new RepositoryService();

export default NewRepositoryService;
