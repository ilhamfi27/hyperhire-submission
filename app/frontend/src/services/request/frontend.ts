import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const r = () => {
  const u =
    typeof window === 'undefined'
      ? process.env.BASE_URL
      : window.location.origin;
  const baseURL = `${u}/api`;
  const r = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });

  const get = <T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>,
  ): Promise<R> => r.get(url, config);
  const del = <T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>,
  ): Promise<R> => r.delete(url, config);
  const post = <T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>,
  ): Promise<R> => r.post(url, data, config);
  const put = <T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>,
  ): Promise<R> => r.put(url, data, config);

  return {
    get: get,
    post: post,
    put: put,
    delete: del,
  };
};

export const frontRequest = r();
