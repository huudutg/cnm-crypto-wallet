export const { CLIENT_ENV = "dev" } = process.env;

export const envInfo: any = {
  dev: {
    // BASE_URL: "http://localhost:8080/wearos-ci-tool",
    BASE_URL: "https://api-wearosci.stg.cdgfossil.com/wearos-ci-tool",
  },
};
export const url: any = {
  USERS: "/v1/rest/users",
  AUDIT: "/v1/rest/audit",
  REPOS: "/v1/rest/repos",
  ROLES: "/v1/rest/roles",
  DEPARTMENTS: "/v1/rest/departments",
  PERMISSIONS: "/v1/rest/permissions",
  GROUPS: "/v1/rest/groups",
  MANIFESTS: "/v1/rest/manifests",
  REQUEST_PERMISSIONS: "/v1/rest/requests/permissions",
  REQUESTS: "/v1/rest/requests",
  REQUEST_REPOS: "/v1/rest/requests/repos",
  REQUEST_GROUPS: "/v1/rest/requests/groups",
  REQUEST_BRANCHES: "/v1/rest/requests/branches",
  RPC_PERMISSIONS: "/v1/rpc/requests/permissions",
  RPC_GROUPS: "/v1/rpc/requests/groups",
  RPC_BRANCHES: "/v1/rpc/requests/branches",
  RPC_REPOS: "/v1/rpc/requests/repos",
};
