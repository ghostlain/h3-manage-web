// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

export async function getParkTree() {
  return request<API.ApiResponse<API.AreaNode[]>>('/api/parking/get', {
    method: 'GET'
  })
}

export async function getAreaById(id: string) {
  return request<API.ApiResponse<API.ParkArea>>(`/api/parking/area/${id}`, {
    method: 'GET'
  })
}

export async function addArea(area: any) {
  return request<API.ApiResponse<any>>('/api/parking/area/', {
    method: 'POST',
    requestType: 'json',
    data: area,
  })
}

export async function updateArea(id: string, area: any) {
  return request<API.ApiResponse<any>>(`/api/parking/area/${id}`, {
    method: 'POST',
    requestType: 'json',
    data: area,
  })
}

export async function deleteAreaById(id: string) {
  return request<API.ApiResponse<any>>(`/api/parking/area/${id}`, {
    method: 'DELETE'
  })
}
