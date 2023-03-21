const Recharge = () => import('@/views/recharge/index.vue')
const Bank = () => import('@/views/bank/index.vue')
const BankEdit = () => import('@/views/bankedit/index.vue')
const Withdrawal = () => import('@/views/withdrawal/index.vue')
const Transaction = () => import('@/views/transaction/index.vue')
export default [
  {
    path: '/bank',
    name: 'bank',
    component: Bank,
  },
  {
    path: '/bankedit',
    name: 'bankedit',
    component: BankEdit,
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
  },
  {
    path: '/transaction',
    name: 'transaction',
    component: Transaction,
  }
]
