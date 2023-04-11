import request from '@/utils/request'

export function getBulletins() {
  return request({
    url: 'bulletins/',
    method: 'get',
  })
}

export function deleteBulletin(id) {
  return request({
    url: `bulletins/${id}/`,
    method: 'delete',
  })
}

export function createBulletin(data) {
  return request({
    url: 'bulletins/',
    method: 'post',
    data: {
      title: data.title,
      content: data.content || '',
      show_status: data.show_status || true,
      order: data.order || 1,
      image: data.image,
    },
  })
}

export function switchBulletin(id) {
  return request({
    url: `bulletins/${id}/show`,
    method: 'get',
  })
}
