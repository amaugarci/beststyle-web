const Recharge = () => import('@/views/recharge/index.vue')
const Withdrawal = () => import('@/views/withdrawal/index.vue')
const News = () => import('@/views/news/index.vue')
const Changepassword = () => import('@/views/changepassword/index.vue')
export default [
  {
    path: '/recharge',
    name: 'recharge',
    component: Recharge,
  },
  {
    path: '/withdrawal',
    name: 'withdrawal',
    component: Withdrawal,
  },
  {
    path: '/news',
    name: 'news',
    component: News,
  },
  {
    path: '/changepassword',
    name: 'changepassword',
    component: Changepassword,
  },
]
