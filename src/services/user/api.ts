import { request } from 'umi';

export async function currentUser(options?: Record<string, any>) {
  return request<API.CurrentUser>('/api/currentUser', {
    method: 'GET',
    ...(options || {}),
  });
}
