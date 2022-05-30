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
export const constantRoutes = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  // 首页
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '柠檬鞋城后台首页', icon: 'dashboard' }
    }]
  }]
/**
 * 动态路由
 */
export const asyncRoutes = [

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
      },
      {
        path: 'list1',
        name: '商品分类(详情)',
        component: () => import('@/views/bs/subject/list1'),
        meta: { title: '厂商列表', icon: 'table'}
      },
      {
        path: 'create',
        name: '添加商品分类',
        component: () => import('@/views/bs/subject/save1'),
        meta: { title: '添加厂商' ,icon: 'user'}
      },
      {
        path: 'edit/:id',
        name: '编辑商品分类',
        component: () => import('@/views/bs/subject/save1'),
        meta: { title: '编辑厂商', noCache: true },
        hidden: true
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
  {
    path: '/sta',
    component: Layout,
    redirect: '/sta/create',
    name: '统计分析',
    meta: { title: '统计分析', icon: 'example' },
    children: [
      {
        path: 'create',
        name: '生成数据',
        component: () => import('@/views/sta/create'),
        meta: { title: '生成数据', icon: 'table' }
      },
      {
        path: 'show',
        name: '图表显示',
        component: () => import('@/views/sta/show'),    
        meta: { title: '图表显示', icon: 'tree' }
      }
    ]
  },

  {
    path: '/acl',
    component: Layout,
    redirect: '/acl/user/list',
    name: '权限管理',
    meta: { title: '权限管理', icon: 'chart' },
    children: [
      {
        path: 'user/list',
        name: '用户管理',
        component: () => import('@/views/acl/user/list'),
        meta: { title: '用户管理' }
      },
      {
        path: 'role/list',
        name: '角色管理',
        component: () => import('@/views/acl/role/list'),
        meta: { title: '角色管理' }
      },
      {
        path: 'role/form',
        name: '角色添加',
        component: () => import('@/views/acl/role/form'),
        meta: { title: '角色添加' },
        hidden: true
      },
      {
        path: 'role/update/:id',
        name: '角色修改',
        component: () => import('@/views/acl/role/form'),
        meta: { title: '角色修改' },
        hidden: true
      },
      {
        path: 'role/distribution/:id',
        name: '角色权限',
        component: () => import('@/views/acl/role/roleForm'),
        meta: { title: '角色权限' },
        hidden: true
      },
      {
        path: 'menu/list',
        name: '菜单管理',
        component: () => import('@/views/acl/menu/list'),
        meta: { title: '菜单管理' }
      },
      {
        path: 'user/add',
        name: '用户添加',
        component: () => import('@/views/acl/user/form'),
        meta: { title: '用户添加' },
        hidden: true
      },
      {
        path: 'user/update/:id',
        name: '用户修改',
        component: () => import('@/views/acl/user/form'),
        meta: { title: '用户修改' },
        hidden: true
      },
      {
        path: 'user/role/:id',
        name: '用户角色',
        component: () => import('@/views/acl/user/roleForm'),
        meta: { title: '用户角色' },
        hidden: true
      }

    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// export default new Router({
//   // mode: 'history', //后端支持可开
//   scrollBehavior: () => ({ y: 0 }),
//   routes: constantRouterMap
// })

export default router
