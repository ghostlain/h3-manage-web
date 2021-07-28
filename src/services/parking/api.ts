// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

export async function getParkTree() {
  return request<{data: API.AreaNode[]}>('/api/parking/get', {
    method: 'GET'
  })
}

export async function getArea(id: string) {
  return request<{data: API.ParkArea}>('/api/parking/area/' + id, {
    method: 'GET'
  })
}