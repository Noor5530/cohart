import AsyncStorage from "@react-native-community/async-storage";
import axios, { AxiosInstance } from "axios";
import ApiConfig from "config/api-config";

const apiClient: AxiosInstance = axios.create({
  baseURL: ApiConfig.BASE_URL,
  responseType: "json",
  headers: {
    "Content-Type": "application/json",
  },
});
apiClient.interceptors.request.use(async function (config) {
  const token = await AsyncStorage.getItem("token");
  config.headers.Authorization = "Bearer " + token;
  console.log("apiConfig", `${config?.baseURL}${config.url}`, config?.params ? config?.params : config?.data);

  return config;
});
export { apiClient };

