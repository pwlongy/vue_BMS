import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    // 首页
    path: '/',
    component: () => import("@/views/index.vue"),
    children: [
      {
        path: "",
        redirect: "/home"
      },
      {
        path: '/home',
        component: () => import("@/views/home/home.vue"),
      },
      {
        path: '/archive',
        component: () => import("@/views/archive/archive.vue")
      },
      {
        path: '/label',
        component: () => import("@/views/label/label.vue")
      },
      {
        path: '/life',
        component: () => import("@/views/life/life.vue")
      },
      {
        path: '/note',
        component: () => import("@/views/note/note.vue")
      },
      {
        path: '/tourism',
        component: () => import("@/views/tourism/tourism.vue")
      }

    ]
  },
  { // 登录
    path: '/login',
    component: () => import("@/views/login/login.vue")
  },
  { // 详情
    path: '/detail',
    component: () => import("@/views/detail/detail.vue")
  },
  { // 写文档
    path: '/create',
    component: () => import("@/views/creation/creation.vue")
  },
]

const router = new VueRouter({
  routes
})

export default router
