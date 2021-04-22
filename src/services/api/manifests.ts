import { Metadata } from "src/utils/types";
import { url } from "src/utils/url";
import { AXIOS } from "./config";
import { parseError } from "./errors";
import { Repository } from "./repositories";

export type Manifest = {
  readonly ID?: string;
  readonly name: string;
  readonly description?: string;
  readonly created_at: string;
  readonly updated_at?: string;
  readonly key?: string;
  readonly value?: string;
  readonly repos?: Repository[];
};

export type ListManifestsRequest = {};
export type ListManifestsResponse = {
  _items: Manifest[];
  _range: Metadata;
};
export type GetManifestRequest = {
  id: string | string[] | undefined;
};
export type GetManifestResponse = Manifest;

export type GetLogsManifestRequest = {};
export type GetLogsManifestResponse = any;

interface IManifestService {
  listManifests(_: ListManifestsRequest): Promise<ListManifestsResponse>;
  getManifest(_: GetManifestRequest): Promise<GetManifestResponse>;
}

class ManifestService implements IManifestService {
  private readonly client = AXIOS;

  async listManifests(_: ListManifestsRequest): Promise<ListManifestsResponse> {
    try {
      const res: any = await this.client.get(url.MANIFESTS);
      for (const item of res.data.items) {
        item.value = item.name;
        item.key = item.ID;
        delete item.ID;
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

  async getManifest(req: GetManifestRequest): Promise<GetManifestResponse> {
    try {
      const res: any = await this.client.get(url.MANIFESTS + `/${req.id}`);
      return res.data.info as GetManifestResponse;
    } catch (err) {
      throw parseError(err);
    }
  }
}

const NewManifestService = (): IManifestService => new ManifestService();

export default NewManifestService;
