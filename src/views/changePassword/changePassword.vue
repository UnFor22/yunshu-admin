<template>
    <div>
        <h2>修改密码</h2>
        <el-form :model="formData" status-icon ref="formData" label-width="100px" class="form-wrap" label-position="left">
            <el-form-item label="旧密码">
                <el-input type="password" v-model="formData.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="新密码">
                <el-input type="password" v-model="formData.new_password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码">
                <el-input type="password" v-model="formData.checkPassword" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('formData')">提交</el-button>
            </el-form-item>
          </el-form>
    </div>
</template>

<script>
    export default {
        data() {
          return { 
            formData: {
              password: '',
              new_password: '',
              checkPassword: ''
            },
        };
      },
    methods: {
      submitForm(formData) {
        if(this.formData.new_password != this.formData.checkPassword){
          this.$message.error('两次输入的密码不一样')
        }else{
          this.$axios.put('/user/password',this.formData).then(res => {
            // console.log(res)
            if (res.code == 200) {
              this.$message.success(res.msg)
            }else {
              this.$message.error(res.msg)
            }
          })
        }  
      },     
    }
  }  
</script>

<style scoped>
    h2 {
        font-weight: 400;
        color: #888;
    }
    .form-wrap {
        width: 600px;
        margin-top: 20px;
    }
</style>