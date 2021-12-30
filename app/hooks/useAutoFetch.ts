import axios, { AxiosRequestConfig } from 'axios';
import { useEffect, useReducer, useRef } from 'react';

// State & hook output
interface State<T> {
  status: 'init' | 'fetching' | 'error' | 'fetched';
  data?: T;
  error?: string;
}

interface Cache<T> {
  [url: string]: T;
}

// discriminated union type
type Action<T> =
  | { type: 'request' }
  | { type: 'success'; payload: T }
  | { type: 'failure'; payload: string };

function useFetch<T = unknown>(
  url?: string,
  options?: AxiosRequestConfig,
): {
  state: State<T>;
  refetch: () => void;
} {
  const cache = useRef<Cache<T>>({});
  const cancelRequest = useRef<boolean>(false);

  const initialState: State<T> = {
    status: 'init',
    error: undefined,
    data: undefined,
  };

  // Keep state logic separated
  const fetchReducer = (state: State<T>, action: Action<T>): State<T> => {
    switch (action.type) {
      case 'request':
        return { ...initialState, status: 'fetching' };
      case 'success':
        return { ...initialState, status: 'fetched', data: action.payload };
      case 'failure':
        return { ...initialState, status: 'error', error: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(fetchReducer, initialState);

  useEffect(() => {
    if (!url) {
      return;
    }

    const fetchData = async () => {
      dispatch({ type: 'request' });

      try {
        const response = await axios(url, options);
        cache.current[url] = response.data;

        dispatch({ type: 'success', payload: response.data });
      } catch (error) {
        dispatch({ type: 'failure', payload: error.message });
      }
    };

    fetchData();

    return () => {
      cancelRequest.current = true;
    };
  }, [url]);

  const refetch = async () => {
    dispatch({ type: 'request' });
    try {
      const response = await axios(url, options);
      cache.current[url] = response.data;

      dispatch({ type: 'success', payload: response.data });
    } catch (error) {
      dispatch({ type: 'failure', payload: error.message });
    }
  };

  return { state: state, refetch: refetch };
}

export default useFetch;
