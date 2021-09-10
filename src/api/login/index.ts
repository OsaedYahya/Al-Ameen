import axiosInstance from "../../apiServices/axiosService";

import APIConstants from "./projectsEndpoint";

const Login = async (UserName: string, Password: string) => {
  return axiosInstance.post(`${APIConstants.LOGIN}`, {
    UserName,
    Password
  });
};

export default {
  Login
};
