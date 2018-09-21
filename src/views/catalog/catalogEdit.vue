<template>
    <div>
        <h2>修改分类</h2>
        <el-form :model="formData" class="form-wrap" size="small" label-width="80px" label-position="left">
            <el-form-item label="标题">
                <el-input v-model="formData.title"></el-input>
            </el-form-item>
            <el-form-item label="分类头图" class="form-img">
                <!-- <el-input v-model="formData.icon"></el-input> -->
                <upload-img v-model="formData.icon"></upload-img>
            </el-form-item>
            <el-form-item label="Index">
                <template>
                    <el-input-number v-model="formData.index" :min="1" :max="1000" size="large" label="Index"></el-input-number>
                </template>
            </el-form-item>
            <el-form-item>
                <el-button size="small" type='primary' @click="handleClick">保存更改</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                formData:{  
                    title: '',
                    icon: '',
                    index: ''
                }
            }
        },
        methods:{
            getFormData(){
                this.$axios.get(`/category/${this.$route.query.id}`).then(res => {
                    // console.log(res)
                    this.formData = res.data
                })
            }, 
            handleClick(){
                this.$axios.put(`/category/${this.$route.query.id}`,this.formData).then(res => {
                    if(res.code == 200) {
                        this.$message.success(res.msg)
                        this.$router.push('/layout/catalogList')
                    }
                })
            }
        },
        created () {
            this.getFormData()
        }
    }
</script>

<style scoped>
    h2 {
        font-weight: 400;
        color: #666;
        margin-bottom: 20px;
    }
    .form-wrap {
        margin-left: 10px;
        width: 600px;
    }
</style>