/* Layout */
import Layout from '@/layout'
export const superAuthRouter = {
  path: '/system',
  component: Layout,
  redirect: '/system/userInfo',
  name: 'System',
  meta: { title: '系统管理', icon: 'user' },
  children: [
    {
      path: 'UserInfo',
      component: () => import('@/views/system/userInfo'),
      name: 'userInfo',
      meta: { title: '个人信息' }
    },
    {
      path: 'UserList',
      name: 'UserList',
      component: () => import('@/views/system/userList'),
      meta: { title: '用户列表' }
    },
    {
      path: 'Posts',
      name: 'Posts',
      component: () => import('@/views/system/posts'),
      meta: { title: '职位列表' }
    }
  ]
}
