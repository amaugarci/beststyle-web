const Training = () => import('@/views/usertraining/index.vue')
const Material = () => import('@/views/usermaterial/index.vue')
const Check = () => import('@/views/usercheck/index.vue')
const Character = () => import('@/views/usercharacter/index.vue')
const Layout = () => import('@/layout/user.vue')

export default [
  {
    path: '/usertraining',
    component: Layout,
    children: [
      {
        path: '',
        name: 'usertraining',
        component: Training,
        meta: {
          title: 'usertraining',
          affix: true,
        },
      }
    ]
  },
  {
    path: '/usercheck',
    component: Layout,
    children: [
      {
        path: '',
        name: 'usercheck',
        component: Check,
        meta: {
          title: 'usercheck',
          affix: true,
        },
      }
    ]
  },
  {
    path: '/usermaterial',
    component: Layout,
    children: [
      {
        path: '',
        name: 'usermaterial',
        component: Character,
        meta: {
          title: 'usermaterial',
          affix: true,
        },
      },
    ]
  },
  {
    path: '/usercharacter',
    component: Layout,
    children: [
      {
        path: '',
        name: 'usercharacter',
        component: Material,
        meta: {
          title: 'usercharacter',
          affix: true,
        },
      }
    ]
  }
]
