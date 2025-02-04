import request from '@/utils/request'

export async function getItems(params = {}) {
  return request({
    url: 'items/',
    method: 'get',
    params: params,
  })
}

export async function getItem(id) {
  return request({
    url: `items/${id}/`,
    method: 'get',
  })
}

export async function updateItem(id, data) {
  return request({
    url: `items/${id}/`,
    method: 'put',
    data: data,
  })
}

export async function createItem(data) {
  return request({
    url: 'items/',
    method: 'post',
    data: data,
  })
}

export async function getItemImages(id) {
  return request({
    url: `items/${id}/images/`,
    method: 'get',
  })
}

export async function createItemImage(id, data) {
  return request({
    url: `items/${id}/images/`,
    method: 'post',
    data: data,
  })
}

export async function deleteAllItemImages(id) {
  return request({
    url: `items/${id}/images/`,
    method: 'delete',
  })
}
