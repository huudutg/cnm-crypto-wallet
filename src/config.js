import Axios, { AxiosError, AxiosResponse } from "axios";

export let AXIOS = Axios.create({
  // withCredentials: true,
  baseURL: "http://localhost:5000/",
  headers: {
    "content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  timeout: 500000,
});

// AXIOS.interceptors.response.use(
//   (response: AxiosResponse<any>): Promise<AxiosResponse<any>> => {
//     return Promise.resolve(response);
//   },
//   async (error: AxiosError<any>): Promise<AxiosResponse<any>> => {
//     if (isSessionExpiredError(error)) {
//       console.log("error", error);
//       localStorage.removeItem("id");
//       localStorage.removeItem("avatar");
//       redirectToLoginPage();
//     }
//     return Promise.reject(error);
//   }
// );

// const isSessionExpiredError = (error: AxiosError<any>): boolean => {
//   if (error.response && error.response.status === 401) {
//     return true;
//   }
//   return false;
// };

// export const redirectToLoginPage = () => {
//   if (!window) return;
//   const url = window.location.href;
//   if (url.indexOf("localhost") !== -1) {
//     window.location.href =
//       url.substr(0, window.location.href.indexOf("localhost") + 14) + "/login";
//   } else {
//     window.location.href = "/login";
//   }

//   // window.location.href =
//   //   (window as any).env.LOGIN_URL + encodeURIComponent(window.location.href);
// };

// export const doAxiosRequestIntercept = () => {
//   AXIOS.interceptors.request.use(
//     async (config) => {
//       return createConfig(config);
//     },
//     (error) => {
//       console.log("errordoAxiosRequestIntercept", error);
//       Promise.reject(error);
//     }
//   );
// };

const createConfig = async (config) => {
  const token = localStorage.getItem("token");
  const mConfig = {
    ...config,
    data: {
      ...config.data,
    },
    // headers: {
    //   Authorization: `Bearer ${token}`,
    // },
  };
  return mConfig;
};
