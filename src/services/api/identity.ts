import { AXIOS, redirectToLoginPage } from "./config";
import { parseError } from "./errors";

export const logout = async () => {
  try {
    // await AXIOS.post(
    //   (window as any).env.IDENTITY_API_URL + "/v1/rpc/auth/logout"
    // );
    localStorage.removeItem("token");
    localStorage.removeItem("avatar");
    localStorage.removeItem("id");
    redirectToLoginPage();
  } catch (e) {
    throw parseError(e);
  }
};
