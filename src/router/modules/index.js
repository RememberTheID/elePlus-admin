import { baseRouter } from "./base";
import { sysRouter } from "./sys";
const baseNotPage = {
  path: '/:pathMatch(.*)*',
  name: 'NotFound',
  component: () => import('@/layout/index.vue'),
  redirect: '/404',
  children: [{
    meta: {
      title: 'ErrorPage',
      hideBreadcrumb: true,
      hideTarget: true,
    },
    path: '/404',
    name: 'notPage',
    component: () => import('@/views/sys/errorPage/notPage.vue'),
  }]
}
export default [baseRouter, sysRouter, baseNotPage];