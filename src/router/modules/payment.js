const Recharge = () => import('@/views/recharge/index.vue')
const Bank = () => import('@/views/bank/index.vue')
const Withdrawal = () => import('@/views/withdrawal/index.vue')
export default [
  {
    path: '/bank',
    name: 'bank',
    component: Bank,
  },
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
