import { request } from 'umi';

export async function currentUser(options?: Record<string, any>) {
  return request<API.CurrentUser>('/api/currentUser', {
    method: 'GET',
    ...(options || {}),
  });
}



export async function listRoles(options?: Record<string, any>) {
  return request<API.ApiResponse<API.SysRole[]>>('/api/sysRole/list', {
    method: 'GET',
    ...(options || {}),
  });
}
