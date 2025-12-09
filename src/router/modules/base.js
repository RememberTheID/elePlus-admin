
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
    path: '/about',
    name: 'about',
    meta: {
      title: '关于',
      icon: 'material-symbols:travel-luggage-and-bags-outline'
    },
    // component: () => import('@/views/base/about/index.vue'),
    children: [
      {
        path: '/about/1',
        name: 'about1',
        meta: {
          title: '关于1',
          icon: 'material-symbols:travel-luggage-and-bags-outline'
        },
        component: () => import('@/views/base/about/1.vue'),
      },
      {
        path: '/about/2',
        name: 'about2',
        meta: {
          title: '关于2',
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