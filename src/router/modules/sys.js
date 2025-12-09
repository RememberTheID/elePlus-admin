export const sysRouter = {
  path: '/login',
  name: 'login',
  component: () => import('@/views/sys/login/index.vue'),
  meta: {
    title: '登录',
  },
};