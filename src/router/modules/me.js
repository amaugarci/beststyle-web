const Me = () => import('@/views/me/index.vue')
const Layout = () => import('@/layout/index.vue')

export default [
  {
    path: '/me',
    component: Layout,
    name: 'my info',
    children: [
      {
        path: '',
        name: 'me',
        component: Me,
        meta: {
          title: 'My Info',
          affix: true,
        },
      },
    ],
  },
]
