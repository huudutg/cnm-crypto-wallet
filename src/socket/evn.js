
const { CLIENT_ENV = "dev" } = process.env;

const envInfo = {
  dev: {
    BASE_URL: "http://localhost:5000",
    // BASE_URL: "https://test-app1332.herokuapp.com/",
    // BASE_URL: "http://192.168.1.4:8001/"
  },
};

export const { BASE_URL } = envInfo[CLIENT_ENV];


