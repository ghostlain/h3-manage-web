// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

export async function getParkTree() {
  return request<{data: API.ParkArea[]}>('/api/parking/get', {
    method: 'GET'
  })
}
