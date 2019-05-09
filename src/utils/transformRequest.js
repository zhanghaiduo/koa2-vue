import qs from 'qs'
export function transform() {
  return function(data) { // 解决传递数组变成对象的问题
    Object.keys(data).forEach((key) => {
      if ((typeof data[key]) === 'object') {
        data[key] = JSON.stringify(data[key]) // 这里必须使用内置JSON对象转换
      }
    })
    data = qs.stringify(data) // 这里必须使用qs库进行转换
    return data
  }
}
