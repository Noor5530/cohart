import { AxiosRequestConfig } from "axios";
import { useReducer, useRef } from "react";
import { apiClient as axios } from "services/client";
import { logOutRequest } from "../store/actions/userActions";
import { LogOutRequestEnum } from "../models/actions/user";
import { useDispatch } from "react-redux";
// State & hook output
interface State<T> {
  status: "init" | "fetching" | "error" | "fetched";
  data?: T;
  error?: string;
}

interface Cache<T> {
  [url: string]: T;
}

// discriminated union type
type Action<T> =
  | { type: "request" }
  | { type: "success"; payload: T }
  | { type: "failure"; payload: string };

function useFetch<T = unknown>(
  url?: string,
  options?: AxiosRequestConfig
): {
  state: State<T>;
  refetch: (data?: AxiosRequestConfig) => void;
  onSearch: (data?: AxiosRequestConfig) => void;
} {
  const cache = useRef<Cache<T>>({});
  const cancelRequest = useRef<boolean>(false);
  const reduxDispatch = useDispatch();
  const initialState: State<T> = {
    status: "init",
    error: undefined,
    data: undefined,
  };

  // Keep state logic separated
  const fetchReducer = (state: State<T>, action: Action<T>): State<T> => {
    switch (action.type) {
      case "request":
        return { ...initialState, status: "fetching" };
      case "success":
        return {
          ...initialState,
          status: "fetched",
          data: action.payload,
        };
      case "failure":
        return {
          ...initialState,
          status: "error",
          error: action.payload,
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(fetchReducer, initialState);

  const refetch = async (data?: AxiosRequestConfig = undefined) => {
    dispatch({ type: "request" });
    const temp = { ...options };
    temp.data = data?.data ? data?.data : options.data;
    try {
      const response = await axios(url, temp);
      cache.current[url] = response.data;

      if (cancelRequest.current) {
        return;
      }

      dispatch({ type: "success", payload: response.data });
    } catch (error) {
      if (cancelRequest.current) {
        return;
      }

      dispatch({ type: "failure", payload: error.message });
    }
  };

  const onSearch = async (data?: AxiosRequestConfig = undefined) => {
    dispatch({ type: "request" });
    const temp = { ...options };
    temp.data = data?.data ? data?.data : options.data;
    try {
      const response = await axios(url, temp);

      cache.current[url] = response.data;

      if (cancelRequest.current) {
        return;
      }

      dispatch({
        type: "success",
        payload: {
          ...response.data,
          searchKey: JSON.parse(response.config.data).search_key,
        },
      });
    } catch (error: any) {
      if (error?.response?.status == 401) {
        reduxDispatch(logOutRequest(LogOutRequestEnum.tokenExpire));
        dispatch({ type: "failure", payload: LogOutRequestEnum.tokenExpire });
        return;
      }
      if (cancelRequest.current) {
        return;
      }

      dispatch({ type: "failure", payload: error.message });
    }
  };
  return { state: state, refetch: refetch, onSearch: onSearch };
}

export default useFetch;
