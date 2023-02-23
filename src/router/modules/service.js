const Service = () => import('@/views/service/index.vue')
const Layout = () => import('@/layout/index.vue')

export default [
  {
    path: '/service',
    component: Layout,
    name: 'Service',
    children: [
      {
        path: '',
        name: 'service',
        component: Service,
        meta: {
          title: 'Service',
          affix: true,
        },
      },
    ],
  },
]
