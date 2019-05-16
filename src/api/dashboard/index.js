import request from '@/utils/request'
export function getList(data) {
  return request({
    url: '/api/resume_list',
    method: 'post',
    data
  })
}
export function del(data) {
  return request({
    url: '/api/resume_del',
    method: 'post',
    data
  })
}
export function save(data) {
  console.log(data.id)
  const url = data.id ? '/api/resume_update' : '/api/resume_create'
  return request({
    url: url,
    method: 'post',
    data
  })
}
export function update(data) {
  return request({
    url: '/api/resume_update',
    method: 'post',
    data
  })
}
export function detail(data) {
  return request({
    url: '/api/resume_detail',
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

