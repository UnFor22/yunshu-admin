<template>
    <div class="layout">
        <div class="header ml-200">
            <h1 class="title">云书后台操作系统
              <div class="header-user">
              <el-dropdown @command="handlecommand">
                <el-button class="user">
                  <img class="user-img" :src="$store.state.userinfo.avatar" alt="">
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="1">修改个人信息</el-dropdown-item>
                  <el-dropdown-item command="2">修改密码 </el-dropdown-item>
                  <el-dropdown-item command="3">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
            </h1>
            
        </div>
        <div class="side-bar">
            <el-menu
            :router='true'
            background-color="#233a4b"
            text-color="#fff">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>用户管理</span>
        </template>
        <el-menu-item-group> 
          <el-menu-item index="/layout/index">首页</el-menu-item>
          <el-menu-item index="/login">登录页</el-menu-item>
          <el-menu-item index="/layout/addUser">添加管理员</el-menu-item> 
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>分类管理</span>
          </template> 
          <el-menu-item-group> 
            <el-menu-item index="/layout/catalogList">分类列表</el-menu-item>
            <el-menu-item index="/layout/addCatalog">添加分类</el-menu-item>
          </el-menu-item-group> 
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-document"></i>
          <span>管理员用户</span>
        </template>
        <el-menu-item-group> 
          <el-menu-item index="/layout/users">管理员列表</el-menu-item> 
          <el-menu-item index="/layout/changePassword">修改密码</el-menu-item>            
          <el-menu-item index="/layout/userEdit">修改个人信息</el-menu-item>
        </el-menu-item-group> 
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-setting"></i>
          <span>图书管理</span>
        </template>
        <el-menu-item-group> 
          <el-menu-item index="/layout/bookList">图书列表</el-menu-item>
          <el-menu-item index="/layout/addBook">添加图书</el-menu-item>
        </el-menu-item-group> 
      </el-submenu>
      <el-submenu index="5">
        <template slot="title">
          <i class="el-icon-setting"></i>
          <span>轮播图管理</span>
        </template>
        <el-menu-item-group> 
          <el-menu-item index="/layout/swiperList">轮播图列表</el-menu-item>
        </el-menu-item-group> 
      </el-submenu>
    </el-menu>
        </div>
        <div class="main-content ml-200">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
      computed: {
        ...mapState(['userinfo'])
      },
      methods:{
        handlecommand(command){
          if(command == 1){
            this.$router.push('/layout/userEdit')
          }else if(command == 2){
            this.$router.push('/layout/changePassword')
          }else if(command == 3){
            this.$axios.get('/logout').then(res => {
              console.log(res)
              if(res.code == 200){
                this.$message.success(res.msg)
                this.$router.push("/")
              }
            })
          }
        }
      }
  };
</script>

<style scoped lang = 'scss'>
.layout {
  .title {
    text-align: center;
    font-weight: 400;
    line-height: 60px;
    color: #f1f1f1;
    height: 60px;
    border-bottom: 1px solid #f1f1f1;
    background: #233a4b;
    font-size: 20px;
  }
  .ml-200 {
    margin-left: 200px;
    .header-user{
      float: right;
      .user{
        margin: 0;
        padding: 0;
        background: #233a4b;
        border: none;
      }
    }
    
  }
  .user-img {
    width: 56px;
    height: 56px;
    border-radius:50%; 
  }
  .side-bar {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      width: 200px;
      padding-top: 80px;
      background: #233a4b;

      /deep/ { 
      .el-menu {
        border-right: none;
      }
      }
  }
  .main-content{
      padding: 15px;
  }
}
</style>