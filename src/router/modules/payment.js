const Recharge = () => import('@/views/recharge/index.vue')
const Withdrawal = () => import('@/views/withdrawal/index.vue')
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
  }
]
