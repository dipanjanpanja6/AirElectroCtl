import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from 'constants';
import qs from 'query-string';
import { RootState } from 'store';
import { logout } from 'store/slices/auth';

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: 'omit',
  paramsSerializer(params) {
    return qs.stringify(params, { arrayFormat: 'bracket' });
  },
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) headers.set('Authorization', `Bearer ${token}`);
    if (!headers.get('Content-Type')) headers.set('Content-Type', 'application/json');
    headers.set('Accept', 'application/json');
    // temp fix for 304 error
    headers.set('If-None-Match', '');
    return headers;
  },
});
const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    console.log(result, 'logout');
    api.dispatch(logout());
  }
  return result;
};

// Define a service using a base URL and expected endpoints
export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  endpoints: builder => ({}),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {} = api;
export const {} = api.endpoints;
