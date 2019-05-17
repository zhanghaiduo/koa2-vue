import request from '@/utils/request'
export function getList(data) {
  return request({
    url: '/api/posts_list',
    method: 'post',
    data
  })
}
export function del(data) {
  return request({
    url: '/api/superAuth/posts_del',
    method: 'post',
    data
  })
}
export function save(data) {
  const url = data.id ? '/api/superAuth/posts_update' : '/api/superAuth/posts_create'
  return request({
    url: url,
    method: 'post',
    data
  })
}
export function update(data) {
  return request({
    url: '/api/superAuth/posts_update',
    method: 'post',
    data
  })
}
export function detail(data) {
  return request({
    url: '/api/superAuth/posts_detail',
    method: 'post',
    data
  })
}
