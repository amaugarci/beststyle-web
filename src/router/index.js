
import { createRouter, createWebHistory } from 'vue-router'

import login from './modules/login'
import training from './modules/training'
import Check from './modules/check'
import Material from './modules/material'
import Character from './modules/character'
import blocked from './modules/blocked'
import User from './modules/user'
import {useAuthStore} from '@/pinia/modules/useAuthStore';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    ...login,
    ...blocked,
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
  const publicPages = ['/login','/blocked'];
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
