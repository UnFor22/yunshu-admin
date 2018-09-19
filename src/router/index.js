import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const components = {
  login: ()=>import('@/views/login/login.vue'),
  layout: ()=>import('@/views/layout/layout'),
  index: ()=>import('@/views/index/index'),
  users: ()=>import('@/views/users/users'),
  update: ()=>import('@/views/testUploadDemo/testUploadDemo'),
  userEdit: ()=>import('@/views/userEdit/userEdit'),
  addUser: ()=>import('@/views/addUser/addUser'),
  catalogList: ()=>import('@/views/catalog/catalogList'),
  addCatalog: ()=>import('@/views/catalog/addCatalog'),
  changePassword: ()=>import('@/views/changePassword/changePassword'),
  bookList: ()=>import('@/views/book/bookList'),
  addBook: ()=>import('@/views/book/addBook'),
  swiperList: ()=>import('@/views/swiper/swiperList'),
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
            component: components.index
          },
          {
            path: 'users',
            meta: {
              title: '用户管理'
            },
            component: components.users
          },
          {
            path: 'update',
            meta: {
              title: '图片上传'
            },
            component: components.update
          },
          {
            path: 'userEdit',
            meta: {
              title: '修改个人信息'
            },
            component: components.userEdit,
          },
          {
            path: 'addUser',
            meta: {
              title: '添加管理员'
            },
            component: components.addUser
          },
          {
            path: 'catalogList',
            meta: {
              title: '分类列表'
            },
            component: components.catalogList
          },
          {
            path: 'addCatalog',
            meta: {
              title: '添加分类'
            },
            component: components.addCatalog
          },
          {
            path: 'changePassword',
            meta: {
              title: '修改密码'
            },
            component: components.changePassword
          },
          {
            path: 'bookList',
            meta: {
              title: '图书列表'
            },
            component: components.bookList
          },
          {
            path: 'addBook',
            meta: {
              title: '添加图书'
            },
            component: components.addBook
          },
          {
            path: 'swiperList',
            meta: {
              title: '轮播图列表'
            },
            component: components.swiperList
          }
      ]
    }
  ]
})
export default router