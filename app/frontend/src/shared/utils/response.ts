import { AxiosError } from 'axios';
import { NextResponse } from 'next/server';

export const apiErrorResponse = <T extends AxiosError>(err: T) => {
  return NextResponse.json(
    { error: err.response?.data },
    { status: err?.response?.status },
  );
};
