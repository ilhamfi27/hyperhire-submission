import { backRequest } from '@/services/request/backend';
import awaitToError from '@/shared/utils/await-to-error';
import { apiErrorResponse } from '@/shared/utils/response';
import { AxiosError, AxiosResponse } from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const [err, res] = await awaitToError<AxiosError, AxiosResponse>(
    backRequest.get(request),
  );

  if (err) {
    return apiErrorResponse(err);
  }

  return NextResponse.json(res.data);
}

export async function PUT(request: NextRequest) {
  const body = await request.json();
  const [err, res] = await awaitToError<AxiosError, AxiosResponse>(
    backRequest.put(request, body),
  );

  if (err) {
    return apiErrorResponse(err);
  }

  return NextResponse.json(res.data);
}

export async function DELETE(request: NextRequest) {
  const [err, res] = await awaitToError<AxiosError, AxiosResponse>(
    backRequest.delete(request),
  );

  if (err) {
    return apiErrorResponse(err);
  }

  return NextResponse.json(res.data);
}
