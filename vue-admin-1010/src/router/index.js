import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '柠檬鞋城后台首页', icon: 'dashboard' }
    }]
  },

  {
    path: '/manufacturer',
    component: Layout,
    redirect: '/manufacturer/table',
    name: 'manufacturer',
    meta: { title: '厂商管理', icon: 'example' },
    children: [
      {
        path: 'list',
        name: 'BsManufacturerList',
        component: () => import('@/views/bs/manufacturer/list'),
        meta: { title: '厂商列表', icon: 'table'}
      },
      {
        path: 'create',
        name: 'BsManufacturerCreate',
        component: () => import('@/views/bs/manufacturer/save'),
        meta: { title: '添加厂商' ,icon: 'user'}
      },
      {
        path: 'edit/:id',
        name: 'BsManufacturerEdit',
        component: () => import('@/views/bs/manufacturer/save'),
        meta: { title: '编辑厂商', noCache: true },
        hidden: true
      }
    ]
  },

  {
    path: '/subject',
    component: Layout,
    redirect: '/subject/list',
    name: '商品分类管理',
    meta: { title: '商品分类管理', icon: 'example' },
    children: [
      {
        path: 'list',
        name: '商品分类列表',
        component: () => import('@/views/bs/subject/list'),
        meta: { title: '商品分类列表', icon: 'tree' }
      },
      {
        path: 'save',
        name: '添加商品分类',  
        component: () => import('@/views/bs/subject/save'),
        meta: { title: '添加商品分类', icon: 'nested' }
      }
    ]
  },
  {
    path: '/shoe',
    component: Layout,
    redirect: '/shoe/list',
    name: '商品管理',
    meta: { title: '商品管理', icon: 'example' },
    children: [
      {
        path: 'list',
        name: '商品列表',
        component: () => import('@/views/bs/shoe/list'),
        meta: { title: '商品列表', icon: 'table' }
      },
      {
        path: 'info',
        name: '添加商品',  
        component: () => import('@/views/bs/shoe/info'),
        meta: { title: '添加商品', icon: 'tree' }
      },
      {
        path: 'info/:id',
        name: 'BsShoeInfoEdit',
        component: () => import('@/views/bs/shoe/info'),
        meta: { title: '编辑商品基本信息', noCache: true },
        hidden: true
      },
      {
        path: 'publish/:id',
        name: 'BsShoePublishEdit',
        component: () => import('@/views/bs/shoe/publish'),
        meta: { title: '发布商品', noCache: true },
        hidden: true
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
