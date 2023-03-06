
import { createRouter, createWebHashHistory } from 'vue-router'

import login from './modules/login'
import home from './modules/home'
import position from './modules/position'
import payment from './modules/payment'
import service from './modules/service'
import information from './modules/information'
import me from './modules/me'
import profile from './modules/profile'
import {useAuthStore} from '@/pinia/modules/useAuthStore';
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/me',
    },
    ...login,
    ...home,
    ...position,
    ...service,
    ...information,
    ...me,
    ...profile,
    ...payment,
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { left: 0, top: 0 }
    }
  },
})
router.beforeEach(async (to) => {
  const publicPages = ['/login'];
  const authRequired = !publicPages.includes(to.path);
  const auth = useAuthStore();
  if(auth.user==null&&auth.token){
    auth.fetchUser();
  }
  if (authRequired && !auth.token) {
      auth.returnUrl = to.name;
      return '/login';
  }
});
export default router
