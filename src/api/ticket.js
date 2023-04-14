import request from '@/utils/request'

export async function getAllTickets() {
  return request({
    url: `tickets/`,
    method: 'get',
  })
}

export async function getTicketMessage(id) {
  return request({
    url: `tickets/${id}/`,
    method: 'get',
  })
}

export async function closeTicket(id) {
  return request({
    url: `tickets/${id}/`,
    method: 'patch',
  })
}
