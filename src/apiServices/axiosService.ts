import axios from "axios";
import Config from "react-native-config";

const axiosInstance = axios.create({
  baseURL: Config.API_HOST,
  headers: { "content-type": "application/json", "accept-language": "en" },
});

export default axiosInstance;
