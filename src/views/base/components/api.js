import { request } from "@/utils/request";
export const getList = (params) => {
  return request({
    url: '/api/list',
    method: 'get',
    params
  })
}