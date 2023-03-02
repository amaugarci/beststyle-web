const Home = () => import('@/views/home/index.vue')
const Layout = () => import('@/layout/index.vue')
const Symbol = () => import('@/views/symbol/index.vue')

export default [
  {
    path: '/home',
    component: Layout,
    name: 'Home',
    children: [
      {
        path: '',
        name: 'home',
        component: Home,
        meta: {
          title: 'front page',
          affix: true,
        },
      },
    ],
  },
  {
    path: '/symbol/:id',
    component: Symbol,
    name: 'symbol',
  },
]
