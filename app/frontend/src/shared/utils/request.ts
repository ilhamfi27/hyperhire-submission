import { NextRequest } from 'next/server';

export const getCookieFromReq = (req: NextRequest, cookieKey: string) => {
  const cookie = req.cookies.get(cookieKey);
  if (!cookie) return null;
  return cookie;
};
