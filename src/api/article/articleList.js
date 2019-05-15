import request from '@/utils/request'
export function getList(data) {
  return request({
    url: '/api/article_list',
    method: 'post',
    data
  })
}
export function create(data) {
  return request({
    url: '/api/article_create',
    method: 'post',
    data
  })
}
export function del(data) {
  return request({
    url: '/api/article_del',
    method: 'post',
    data
  })
}
export function update(data) {
  return request({
    url: '/api/article_update',
    method: 'post',
    data
  })
}
export function detail(data) {
  return request({
    url: '/api/article_detail',
    method: 'post',
    data
  })
}
