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

export async function getComments(params) {
  return request({
    url: `/comments/`,
    method: 'get',
    params: params,
  })
}

export async function deleteComment(id) {
  return request({
    url: `/comments/${id}/`,
    method: 'delete',
  })
}

export async function updateOrder(id, data) {
  return request({
    url: `/orders/${id}/`,
    method: 'patch',
    data: data,
  })
}

export async function getOrderComments(id) {
  return request({
    url: `/orders/${id}/comments`,
    method: 'get',
  })
}
