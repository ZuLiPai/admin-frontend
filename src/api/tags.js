import request from '@/utils/request'

export function getTags() {
  return request({
    url: '/tags/',
    method: 'get',
  })
}

export async function getTagByItem(id) {
  return request({
    url: `/items/${id}/tags/`,
    method: 'get',
  })
}
export function addTags(id, data) {
  return request({
    url: `/items/${id}/tags/`,
    method: 'post',
    data: data,
  })
}
