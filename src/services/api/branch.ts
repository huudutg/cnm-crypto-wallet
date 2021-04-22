import { Metadata } from "src/utils/types";
import { url } from "src/utils/url";
import { AXIOS } from "./config";
import { parseError } from "./errors";
import { Manifest } from "src/services/api/manifests";

export type Branch = {
  readonly id: string;
  readonly name: string;
  readonly created_at?: string;
  readonly updated_at?: string;
};

export type BranchRequest = {
  readonly repo?: string;
  readonly manifest?: string;
  readonly branch: string;
  readonly revision?: string;
  readonly reason?: string;
  readonly request_user?: string;
  readonly reviewer?: string;
  readonly status?: "OPEN" | "REJECTED" | "APPROVED";
  readonly created_at?: string;
  readonly updated_at?: string;
  readonly reviewer_comment?: string;
};
export type CreateRequestBranchRequest = {
  repo?: string;
  manifest?: string;
  readonly branch?: string;
  readonly revision?: string;
  readonly reason?: string;
};
export type CreateRequestBranchResponse = { code: number; id: string };
export type ListBranchesRequest = {
  id: string | string[] | undefined;
};
export type ListBranchesResponse = {
  _items: string[];
  _range: Metadata;
};
export type GetBranchRequest = {};
export type GetBranchResponse = BranchRequest;

export type GetLogsBranchRequest = {};
export type GetLogsBranchResponse = any;
export type ApproveRequestResponse = { code: number };
type ApproveRequestRequest = {
  id: string | string[] | undefined;
};
export type GetRequestRequest = {
  id: string | string[] | undefined;
};
export type GetRequestResponse = BranchRequest;
export type RejectRequestResponse = { code: number };
type RejectRequestRequest = {
  id: string | string[] | undefined;
  reason: string;
};
interface IBranchService {
  listBranches(req: ListBranchesRequest): Promise<ListBranchesResponse>;
  createBranchRequest(
    req: CreateRequestBranchRequest
  ): Promise<CreateRequestBranchResponse>;
  // getGroup(_: GetGroupRequest): Promise<GetGroupResponse>;
  ApproveRequest(req: ApproveRequestRequest): Promise<ApproveRequestResponse>;
  getRequest(_: GetRequestRequest): Promise<GetRequestResponse>;
  RejectRequest(req: RejectRequestRequest): Promise<RejectRequestResponse>;
}

class BranchService implements IBranchService {
  private readonly client = AXIOS;

  async listBranches(req: ListBranchesRequest): Promise<ListBranchesResponse> {
    try {
      const uri = encodeURIComponent(req.id as string);
      const res: any = await this.client.get(url.REPOS + `/${uri}/branches`);
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
  async createBranchRequest(
    req: CreateRequestBranchRequest
  ): Promise<CreateRequestBranchResponse> {
    try {
      const res = await this.client.post(url.REQUEST_BRANCHES, req);
      return res.data as CreateRequestBranchResponse;
    } catch (err) {
      throw parseError(err);
    }
  }
  async ApproveRequest(
    req: ApproveRequestRequest
  ): Promise<ApproveRequestResponse> {
    try {
      const res: any = await this.client.post(
        url.RPC_BRANCHES + `/${req.id}/approve`
      );
      console.log("res ApproveRequest BRCH", res);
      return res?.data as ApproveRequestResponse;
    } catch (err) {
      throw parseError(err);
    }
  }
  async getRequest(req: GetRequestRequest): Promise<GetRequestResponse> {
    try {
      const res: any = await this.client.get(
        url.REQUEST_BRANCHES + `/${req.id}`
      );
      // // console.log("res", res);, res);
      return res?.data?.info as GetRequestResponse;
    } catch (err) {
      throw parseError(err);
    }
  }
  async RejectRequest(
    req: RejectRequestRequest
  ): Promise<RejectRequestResponse> {
    try {
      const res: any = await this.client.post(
        url.RPC_BRANCHES + `/${req.id}/reject`,
        { reviewer_comment: req.reason }
      );
      // // console.log("res", res);, res);
      return res?.data as RejectRequestResponse;
    } catch (err) {
      throw parseError(err);
    }
  }
}

const NewBranchService = (): IBranchService => new BranchService();

export default NewBranchService;
