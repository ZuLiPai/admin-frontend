import request from '@/utils/request'

export async function getUsers(params = {}) {
  return request({
    url: 'users/',
    method: 'get',
    params: params,
  })
}

export async function switchUser(id, state) {
  if (state) {
    return request({
      url: `users/${id}/disable/`,
      method: 'get',
    })
  } else {
    return request({
      url: `users/${id}/enable/`,
      method: 'get',
    })
  }
}

export async function getUser(id) {
  return request({
    url: `users/${id}/`,
    method: 'get',
  })
}

export async function getAvatar(id) {
  return request({
    url: `users/${id}/avatar/`,
    method: 'get',
  })
}
export async function updateUser(id, data) {
  return request({
    url: `users/${id}/`,
    method: 'put',
    data: data,
  })
}

export async function getAddresses(id) {
  return request({
    url: `users/${id}/addresses/`,
    method: 'get',
  })
}

export async function createAddress(id, data) {
  return request({
    url: `users/${id}/addresses/`,
    method: 'post',
    data: data,
  })
}

export async function updateAddress(id, addressid, data) {
  return request({
    url: `users/${id}/addresses/${addressid}/`,
    method: 'put',
    data: data,
  })
}

export async function deleteAddress(id, addressid) {
  return request({
    url: `users/${id}/addresses/${addressid}/`,
    method: 'delete',
  })
}
