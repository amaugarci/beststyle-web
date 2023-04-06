
import { createRouter, createWebHistory } from 'vue-router'

import login from './modules/login'
import training from './modules/training'
import Check from './modules/check'
import Material from './modules/material'
import Character from './modules/character'
import User from './modules/user'
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    ...login,
    ...training,
    ...Check,
    ...Material,
    ...Character,
    ...User,
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
  // const publicPages = ['/login'];
  // const authRequired = !publicPages.includes(to.path);
  // const auth = useAuthStore();
  // if(auth.user==null&&auth.token){
  //   auth.fetchUser();
  // }
  // if (authRequired && !auth.token) {
  //     auth.returnUrl = to.name;
  //     return '/login';
  // }
  // const rechager = ['/recharge','/withdrawal'];
  // const bankrequired = rechager.includes(to.path);
  // if(bankrequired&&(auth.user==null)){
  //   return '/me';
  // }else if(bankrequired&&(auth.user.bank==null)){
  //   auth.returnUrl = to.name;
  //   return '/bank';
  // }
});
export default router
