
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
    path: '/component',
    name: 'component',
    meta: {
      title: '组件',
      icon: 'material-symbols:travel-luggage-and-bags-outline'
    },
    children: [
      {
        path: '/component/baseForm',
        name: 'baseForm',
        meta: {
          title: 'Form表单',
          icon: 'material-symbols:travel-luggage-and-bags-outline'
        },
        component: () => import('@/views/base/about/1.vue'),
      },
      {
        path: '/component/baseTable',
        name: 'baseTable',
        meta: {
          title: 'Table表格',
          icon: 'material-symbols:travel-luggage-and-bags-outline'
        },
        component: () => import('@/views/base/about/2.vue'),
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