import { backRequest } from '@/services/request/backend';
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

  return NextResponse.json(res.data);
}
