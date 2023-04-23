import request from '@/utils/request'

export async function getAllFinance(params) {
  return request({
    url: `finance/`,
    method: 'get',
    params: params,
  })
}
