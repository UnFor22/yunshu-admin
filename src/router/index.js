import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const components = {
  login: ()=>import('@/views/login/login.vue'),
  layout: ()=>import('@/views/layout/layout'),
  index: ()=>import('@/views/index/index'),
  users: ()=>import('@/views/users/users'),
  update: ()=>import('@/views/testUploadDemo/testUploadDemo'),
  userEdit: ()=>import('@/views/userEdit/userEdit')
}

const router =  new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: components.login
    },
    {
      path: '/layout',
      component: components.layout,
      redirect: '/layout/index',
      meta: {
        title: '首页'
      },
      children:[
          {
            path: 'index',
            component: components.index,
          },
          {
            path: 'users',
            meta: {
              title: '用户管理'
            },
            component: components.users,
          },
          {
            path: 'update',
            meta: {
              title: '图片上传'
            },
            component: components.update,
          },
          {
            path: 'userEdit',
            meta: {
              title: '修改个人信息'
            },
            component: components.userEdit,
          }
      ]
    }
  ]
})
export default router