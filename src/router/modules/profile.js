const Rechargehistory = () => import('@/views/rechargehistory/index.vue')
const Withdrawalhistory = () => import('@/views/withdrawalhistory/index.vue')
const News = () => import('@/views/news/index.vue')
const Changepassword = () => import('@/views/changepassword/index.vue')
export default [
  {
    path: '/rechargehistory',
    name: 'rechargehistory',
    component: Rechargehistory,
  },
  {
    path: '/withdrawalhistory',
    name: 'withdrawalhistory',
    component: Withdrawalhistory,
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
