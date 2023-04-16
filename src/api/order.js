import request from '@/utils/request'

export function getOrderList(params) {
  return request({
    url: '/orders/',
    method: 'get',
    params,
  })
}

export function getOrderDetail(id) {
  return request({
    url: `/orders/${id}/`,
    method: 'get',
  })
}
