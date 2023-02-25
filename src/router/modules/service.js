const Service = () => import('@/views/service/index.vue')
const Layout = () => import('@/layout/index.vue')

export default [
  {
    path: '/service',
    component: Service,
    name: 'Service'
  },
]
