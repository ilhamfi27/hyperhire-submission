import { backRequest } from '@/services/request/backend';
import { COOKIE_NAME } from '@/shared/constants/global.constants';
import awaitToError from '@/shared/utils/await-to-error';
import { apiErrorResponse } from '@/shared/utils/response';
import { AxiosError, AxiosResponse } from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const [err, res] = await awaitToError<AxiosError, AxiosResponse>(
    backRequest.post(request, body),
  );

  if (err) {
    return apiErrorResponse(err);
  }

  // store token to cookie
  const token = res.data.accessToken;
  const expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);
  const secure = process.env.NODE_ENV === 'production';
  const sameSite = 'strict';
  const httpOnly = true;

  const response = NextResponse.json(res.data);
  response.cookies.set(COOKIE_NAME, token, {
    expires,
    secure,
    sameSite,
    httpOnly,
  });

  return response;
}
