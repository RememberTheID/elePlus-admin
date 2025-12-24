
export const base = [
  {
    path: '/home',
    name: 'home',
    meta: {
      title: '首页',
      icon: 'majesticons:home-line'
    },
    component: () => import('@/views/base/home/index.vue'),
  },
  {
    path: 'component',
    name: 'component',
    component: () => import('@/layout/parentView.vue'),
    meta: {
      title: '组件',
      icon: 'material-symbols:travel-luggage-and-bags-outline'
    },
    children: [
      {
        path: 'dynamicPage/:id',
        name: 'dynamicPage',
        meta: {
          title: '动态路由页面动态路由页面动态路由页面',
          icon: 'material-symbols:travel-luggage-and-bags-outline',
          hidMenu: true
        },
        component: () => import('@/views/base/components/dynamicPage.vue'),
      },
      {
        path: 'baseForm',
        name: 'baseForm',
        meta: {
          title: 'Form表单',
          icon: 'material-symbols:travel-luggage-and-bags-outline'
        },
        component: () => import('@/views/base/components/baseForm.vue'),
      },
      {
        path: 'baseTable',
        name: 'baseTable',
        meta: {
          title: 'Table表格',
          icon: 'material-symbols:travel-luggage-and-bags-outline'
        },
        component: () => import('@/views/base/components/baseTable.vue'),
      },
    ]
  },
]
export const baseRouter = {
  path: '/',
  name: 'base',
  component: () => import('@/layout/index.vue'),
  redirect: '/home',
  meta: {
    title: '首页',
  },
  children: base,
};