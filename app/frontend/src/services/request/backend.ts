import { getPath } from '@/shared/utils/path';
import axios, { AxiosResponse } from 'axios';
import { NextRequest } from 'next/server';

const r = () => {
  const baseURL = process.env.BACKEND_URL ?? 'http://localhost:1321/api/v1';
  const r = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });

  const getAuthTokenHeader = (request: NextRequest) => {
    const cookie = request.headers.get('cookie');
    const header = request.headers.get('authorization');

    if (!header) {
      return {
        Cookie: cookie,
      };
    }
    return {
      Authorization: header ?? '',
    };
  };

  const advancedGet = <T = any, R = AxiosResponse<T>>(
    request: NextRequest,
  ): Promise<R> =>
    r.get(getPath(request.url), {
      headers: getAuthTokenHeader(request),
    });

  const advancedPost = async <T = any, R = AxiosResponse<T>, D = any>(
    request: NextRequest,
    data?: D,
  ): Promise<R> => {
    data = data ?? (await request.json());
    return r.post(getPath(request.url), data, {
      headers: getAuthTokenHeader(request),
    });
  };

  const advancedPut = async <T = any, R = AxiosResponse<T>, D = any>(
    request: NextRequest,
    data?: D,
  ): Promise<R> => {
    data = data ?? (await request.json());
    return r.put(getPath(request.url), data, {
      headers: getAuthTokenHeader(request),
    });
  };

  const advancedDel = <T = any, R = AxiosResponse<T>>(
    request: NextRequest,
  ): Promise<R> =>
    r.delete(getPath(request.url), {
      headers: getAuthTokenHeader(request),
    });

  return {
    get: advancedGet,
    post: advancedPost,
    put: advancedPut,
    delete: advancedDel,
  };
};

export const backRequest = r();
