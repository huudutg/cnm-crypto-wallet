import { Metadata } from "src/utils/types";
import { url } from "src/utils/url";
import { AXIOS } from "./config";
import { parseError } from "./errors";

export type PermissionRequest = {
  readonly manifest?: string;
  readonly repo?: string;
  readonly branch?: string;
  readonly user?: string;
  readonly group?: string;
  readonly group_info?: { name: string };
  readonly permission?: Permission;
  readonly role?: string;
  readonly request_type: "ADD" | "REMOVE";
  readonly reviewer?: string;
  readonly reason?: string;
  readonly request_user?: string;
  readonly status?: "OPEN" | "REJECTED" | "APPROVED";
  readonly created_at?: string;
  readonly updated_at?: string;
  readonly reviewer_comment?: string;
};

export type Request = {
  readonly type: string;
  readonly ticket_id: string;
  readonly requested_user: string;
  readonly reason: string;
  readonly status: string;
  readonly created_at: string;
  readonly updated_at: string;
};

export type Permission = {
  readonly uuid?: string;
  readonly repo?: string;
  readonly reference?: string;
  readonly label?: string;
  readonly name: string;
  readonly action?: string;
  readonly force?: boolean;
  readonly exclusive?: boolean;
  readonly min?: number;
  readonly max?: number;
  readonly created_at?: string;
  readonly updated_at?: string;
};

export type ListRequestsRequest = {};
export type ListRequestsResponse = {
  _items: Request[];
  _range: Metadata;
};

export type ListPermissionResponse = {
  _items: Permission[];
  _range: Metadata;
};
export type GetRequestRequest = {
  id: string | string[] | undefined;
};
export type GetRequestResponse = PermissionRequest;

export type GetLogsRequestRequest = {};
export type GetLogsRequestResponse = any;
export type CreatePermissionRequestResponse = { code: number; id: string };
export type ApproveRequestResponse = { code: number };
type ApproveRequestRequest = {
  id: string | string[] | undefined;
};
export type RejectRequestResponse = { code: number };
type RejectRequestRequest = {
  id: string | string[] | undefined;
  reason: string;
};
export type VerifyRequestResponse = { code: number };
type VerifyRequestRequest = {
  id: string | string[] | undefined;
};
interface IRequestService {
  listRequests(_: ListRequestsRequest): Promise<ListRequestsResponse>;
  listPermissions(): Promise<ListPermissionResponse>;
  getRequest(_: GetRequestRequest): Promise<PermissionRequest>;
  createPermissionRequest(
    req: PermissionRequest
  ): Promise<CreatePermissionRequestResponse>;
  ApproveRequest(req: ApproveRequestRequest): Promise<RejectRequestResponse>;
  RejectRequest(req: RejectRequestRequest): Promise<RejectRequestResponse>;
  VerifyRequest(req: VerifyRequestRequest): Promise<VerifyRequestResponse>;
}

class RequestService implements IRequestService {
  private readonly client = AXIOS;

  async listRequests(_: ListRequestsRequest): Promise<ListRequestsResponse> {
    try {
      const res: any = await this.client.get(url.REQUESTS);
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

  async listPermissions(): Promise<ListPermissionResponse> {
    try {
      const res: any = await this.client.get(url.PERMISSIONS);
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
  async getRequest(req: GetRequestRequest): Promise<GetRequestResponse> {
    try {
      const res: any = await this.client.get(
        url.REQUEST_PERMISSIONS + `/${req.id}`
      );
      return res?.data?.info as PermissionRequest;
    } catch (err) {
      throw parseError(err);
    }
  }
  async createPermissionRequest(
    req: PermissionRequest
  ): Promise<CreatePermissionRequestResponse> {
    try {
      const res = await this.client.post(url.REQUEST_PERMISSIONS, req);
      return res.data as CreatePermissionRequestResponse;
    } catch (err) {
      throw parseError(err);
    }
  }
  async ApproveRequest(
    req: ApproveRequestRequest
  ): Promise<ApproveRequestResponse> {
    try {
      const res: any = await this.client.post(
        url.RPC_PERMISSIONS + `/${req.id}/approve`
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
        url.RPC_PERMISSIONS + `/${req.id}/reject`,
        { reviewer_comment: req.reason }
      );
      // console.log("res", res);, res);
      return res?.data as RejectRequestResponse;
    } catch (err) {
      throw parseError(err);
    }
  }
  async VerifyRequest(
    req: VerifyRequestRequest
  ): Promise<VerifyRequestResponse> {
    try {
      const res: any = await this.client.post(
        url.RPC_PERMISSIONS + `/${req.id}/verify`
      );
      // console.log("res", res);, res);
      return res?.data as VerifyRequestResponse;
    } catch (err) {
      throw parseError(err);
    }
  }
}

const NewPermissionService = (): IRequestService => new RequestService();

export default NewPermissionService;
