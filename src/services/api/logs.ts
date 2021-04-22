import { Metadata } from "src/utils/types";
import { url } from "src/utils/url";
import { AXIOS } from "./config";
import { parseError } from "./errors";

export type Log = {
  readonly user: string;
  readonly object: string;
  readonly action: string;
  readonly "column:data"?: string;
  readonly created_at: string;
};

export type ListLogsRequest = {
  page?: number;
  limit?: number;
};
export type ListLogsResponse = {
  items: Log[];
  total: number;
  page?: number;
  limit?: number;
};
export type GetLogRequest = {
  id: string;
};
export type GetLogResponse = Log;

export type GetLogsLogRequest = {};
export type GetLogsLogResponse = any;

interface ILogService {
  listLogs(req: ListLogsRequest): Promise<ListLogsResponse>;
  getLog(_: GetLogRequest): Promise<GetLogResponse>;
}

class LogService implements ILogService {
  private readonly client = AXIOS;

  async listLogs(req: ListLogsRequest): Promise<ListLogsResponse> {
    try {
      const res: any = await this.client.get(
        url.AUDIT + `?page=${req.page}&limit=${req.limit}`
      );
      console.log("%c res", "color: blue;", res);
      return res.data as ListLogsResponse;
    } catch (err) {
      throw parseError(err);
    }
  }

  async getLog(req: GetLogRequest): Promise<GetLogResponse> {
    const Logs = {
      1: {
        id: "1",
        name: "archive/fossil/android",
        description: "intergrate with project: All, android, ...",
        inheriting: {
          id: "1",
          name: "All-project",
        },
        branches: [
          {
            id: "1",
            name: "refs/tmp",
            revision: "b46b95a040b9301b5d507800362e80bd26a3f2c6",
          },
          {
            id: "2",
            name: "refs/meta/config",
            revision: "b46b95a040b9301b5d507800362e80bd26a3f2c6",
          },
        ],
      },
      2: {
        id: "1",
        name: "archive/fossil/android",
        description: "intergrate with project: All, android, ...",
        branches: [
          {
            id: "1",
            name: "refs/meta/config",
            revision: "b46b95a040b9301b5d507800362e80bd26a3f2c6",
          },
          {
            id: "2",
            name: "refs/meta/config",
            revision: "b46b95a040b9301b5d507800362e80bd26a3f2c6",
          },
        ],
      },
    };
    try {
      return (Logs as any)[req.id];
    } catch (err) {
      throw parseError(err);
    }
  }
}

const NewLogService = (): ILogService => new LogService();

export default NewLogService;
