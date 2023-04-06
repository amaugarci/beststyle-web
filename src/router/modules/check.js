const Check = () => import('@/views/check/index.vue')
const Layout = () => import('@/layout/index.vue')

export default [
  {
    path: '/check',
    component: Layout,
    children: [
      {
        path: '',
        name: 'check',
        component: Check,
        meta: {
          title: 'check',
          affix: true,
        },
      },
    ],
  }
]
