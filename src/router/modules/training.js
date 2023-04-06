const Training = () => import('@/views/training/index.vue')
const Layout = () => import('@/layout/index.vue')

export default [
  {
    path: '/training',
    component: Layout,
    children: [
      {
        path: '',
        name: 'training',
        component: Training,
        meta: {
          title: 'training',
          affix: true,
        },
      },
    ],
  }
]
