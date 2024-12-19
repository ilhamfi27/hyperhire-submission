export const JWT_SECRET = process.env.JWT_SIGNATURE ?? 'jwt_secret';
export const JWT_EXPIRY_SECONDS = 60 * 60 * 24 * 7; // 1 week

export const DEFAULT_PAGE_LIMIT = 10;
export const MAX_PAGE_LIMIT = 100;

export const DEFAULT_SORT_BY = 'createdAt';

export const API_PREFIX = '/api/v1';

export const SLUG_SEPARATOR = '-';
export const COOKIE_NAME = 'admin_menu_access_token';
