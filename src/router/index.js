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
    path: '/login',
    component: () => import('@/views/login/index')

  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [{
      path: '/home',
      name: 'Home',
      component: () => import('@/views/home/index'),
      meta: { title: '主页', icon: 'iconfont icon-xuanzhongshangcheng' }
    }]
  },

  {
    path: '/course',
    component: Layout,
    redirect: '/course/index',
    meta: { title: '我的课程', icon: 'iconfont icon-kecheng' },
    children: [
      {
        path: 'index',
        name: 'Course',
        component: () => import('@/views/course/index'),
        meta: { title: '我的课程', icon: 'iconfont icon-kecheng' }
      },
      {
        path: 'coursedetail',
        name: 'CourseDetail',
        component: () => import('@/views/coursedetail/index'),
        meta: { title: '课程详情', icon: 'iconfont icon-kecheng' },
        hidden: true,
        children: [

        ]
      },
      {
        path: 'addcourse',
        name: 'AddCourse',
        component: () => import('@/views/course/AddCourse'),
        meta: { title: '添加课程', icon: 'iconfont icon-kecheng' },
        hidden: true
      },
      {
        path: 'editcourse',
        name: 'EditCourse',
        component: () => import('@/views/course/EditCourse'),
        meta: { title: '编辑课程', icon: 'iconfont icon-kecheng' },
        hidden: true
      }
    ]
  },
  {
    path: '/survey',
    component: Layout,
    redirect: '/survey/index',
    meta: { title: '我的问卷', icon: 'iconfont icon-wenjuan' },
    children: [
      {
        path: 'index',
        name: 'Survey',
        component: () => import('@/views/survey/index'),
        meta: { title: '我的问卷', icon: 'iconfont icon-wenjuan' }
      },
      {
        path: 'create',
        name: 'Survey Create',
        hidden: true,
        component: () => import('@/views/survey/create'),
        meta: { title: '创建问卷' }
      },
      {
        path: 'edit',
        name: 'Survey Edit',
        hidden: true,
        component: () => import('@/views/survey/edit'),
        meta: { title: '编辑问卷' }
      },
      {
        path: 'detail',
        name: 'Survey Detail',
        hidden: true,
        component: () => import('@/views/survey/detail'),
        meta: { title: '问卷详情' }
      },
      {
        path: 'result',
        name: 'Survey Result',
        hidden: true,
        component: () => import('@/views/survey/result'),
        meta: { title: '问卷结果' }
      }
    ]
  },
  {
    path: '/answer/:ids',
    component: () => import('@/views/survey/answer')
  },
  {
    path: '/complete/:ids',
    component: () => import('@/views/survey/complete')
  },
  // {
  //   path: '/collect',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Collect',
  //       component: () => import('@/views/collect/index'),
  //       meta: { title: '我的收藏', icon: 'iconfont icon-shoucang1' }
  //     }
  //   ]
  // },

  {
    path: '/analysis',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Analysis',
        component: () => import('@/views/analysis/index'),
        meta: { title: '我的分析', icon: 'iconfont icon-fenxi' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  mode: 'history', // require service support
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
