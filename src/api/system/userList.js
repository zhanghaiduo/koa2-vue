import request from '@/utils/request'
export function getList(data) {
  return request({
    url: '/api/superAuth/account_list',
    method: 'post',
    data
  })
}
export function del(data) {
  return request({
    url: '/api/superAuth/account_del',
    method: 'post',
    data
  })
}
export function save(data) {
  console.log(data.id)
  const url = data.id ? '/api/superAuth/account_update' : '/api/superAuth/account_create'
  return request({
    url: url,
    method: 'post',
    data
  })
}
export function update(data) {
  return request({
    url: '/api/superAuth/account_update',
    method: 'post',
    data
  })
}
export function detail(data) {
  return request({
    url: '/api/superAuth/account_detail',
    method: 'post',
    data
  })
}
export function getPosts(data) {
  return request({
    url: '/api/posts_list',
    method: 'post',
    data
  })
}

