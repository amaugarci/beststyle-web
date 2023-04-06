const Material = () => import('@/views/material/index.vue')
const Layout = () => import('@/layout/index.vue')

export default [
  {
    path: '/material',
    component: Layout,
    children: [
      {
        path: '',
        name: 'material',
        component: Material,
        meta: {
          title: 'material',
          affix: true,
        },
      },
    ],
  }
]
