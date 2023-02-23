const Position = () => import('@/views/position/index.vue')
const Layout = () => import('@/layout/index.vue')

export default [
  {
    path: '/position',
    component: Layout,
    name: 'Position',
    children: [
      {
        path: '',
        name: 'position',
        component: Position,
        meta: {
          title: 'Position',
          affix: true,
        },
      },
    ],
  },
]
