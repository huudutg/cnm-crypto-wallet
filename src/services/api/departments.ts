import { Metadata } from "src/utils/types";
import { url } from "src/utils/url";
import { AXIOS } from "./config";
import { parseError } from "./errors";
import { Group } from "src/services/api/groups";

export type Department = {
  readonly id: string;
  readonly name: string;
  readonly groups: Group[];
  readonly created_at?: string;
  readonly updated_at?: string;
  readonly description: string;
};

export type ListDepartmentsRequest = {};
export type ListDepartmentsResponse = {
  _items: Department[];
  _range: Metadata;
};
export type GetDepartmentRequest = {};
export type GetDepartmentResponse = Department | null;

export type GetLogsDepartmentRequest = {};
export type GetLogsDepartmentResponse = any;

interface IDepartmentService {
  listDepartments(_: ListDepartmentsRequest): Promise<ListDepartmentsResponse>;
  getDepartment(_: GetDepartmentRequest): Promise<GetDepartmentResponse>;
}

class DepartmentService implements IDepartmentService {
  private readonly client = AXIOS;

  async listDepartments(
    req: ListDepartmentsRequest
  ): Promise<ListDepartmentsResponse> {
    try {
      const res: { data: { items: Department[] } } = await this.client.get(
        url.DEPARTMENTS
      );
      console.log("%c res.data", "color: blue;", res.data);
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

  async getDepartment(
    req: GetDepartmentRequest
  ): Promise<GetDepartmentResponse> {
    try {
      return null;
    } catch (err) {
      throw parseError(err);
    }
  }
}

const NewDepartmentService = (): IDepartmentService => new DepartmentService();

export default NewDepartmentService;
