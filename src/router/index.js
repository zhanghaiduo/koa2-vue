import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'form' }
    }]
  },
  // {
  //   path: '/Article',
  //   component: Layout,
  //   redirect: '/article/articleList',
  //   name: 'Article',
  //   meta: { title: '软文管理', icon: 'form' },
  //   children: [
  //     {
  //       path: 'ArticleList',
  //       component: () => import('@/views/article/articleList'),
  //       name: 'ArticleList',
  //       meta: { title: '软文列表' }
  //     },
  //     {
  //       path: 'ArticleType',
  //       name: 'ArticleType',
  //       component: () => import('@/views/article/articleType'),
  //       meta: { title: '软文类别' }
  //     }
  //   ]
  // },
  // {
  //   path: '/goods',
  //   component: Layout,
  //   redirect: '/goods/GoodsType',
  //   name: 'Goods',
  //   meta: { title: '商品管理', icon: 'example' },
  //   children: [
  //     {
  //       path: 'GoodsList',
  //       component: () => import('@/views/goods/goodsList'),
  //       name: 'GoodsList',
  //       meta: { title: '商品列表' }
  //     },
  //     {
  //       path: 'GoodsType',
  //       name: 'GoodsType',
  //       component: () => import('@/views/goods/goodsType'),
  //       meta: { title: '商品类别' }
  //     }
  //   ]
  // },
  {
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
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
