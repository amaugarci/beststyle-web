const Character = () => import('@/views/character/index.vue')
const Layout = () => import('@/layout/index.vue')

export default [
  {
    path: '/character',
    component: Layout,
    children: [
      {
        path: '',
        name: 'character',
        component: Character,
        meta: {
          title: 'character',
          affix: true,
        },
      },
    ],
  }
]
