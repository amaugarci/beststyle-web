
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
  history: createWebHistory(),
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
  const rechager = ['/recharge','/withdrawal'];
  const bankrequired = rechager.includes(to.path);
  if(bankrequired&&(auth.user==null)){
    return '/me';
  }else if(bankrequired&&(auth.user.bank==null)){
    auth.returnUrl = to.name;
    return '/bank';
  }
});
export default router
