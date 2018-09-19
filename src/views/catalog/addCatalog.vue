<template>
    <div>
        <h2>添加管理员</h2>
        <div class="form-wrap">
            <el-form :model="formData" size="small" label-width="80px" label-position="left">
            <el-form-item label="分类名">
                <el-input v-model="formData.username"></el-input>
            </el-form-item>     
            <el-form-item label="分类头像">
                <uploadImg v-model="formData.avatar" style="float:left"></uploadImg>
            </el-form-item>    
            <el-form-item>
                <el-button  type='primary' @click="handleClick">提交</el-button>
            </el-form-item>
        </el-form>
        </div>
    </div>
</template>

<script>
    import uploadImg from '@/components/upload-com.vue'
    export default {
        components: {
            uploadImg
        },
        data () {
            return {
                formData: {
                    username: '',
                    avatar: ''
                },
            }
        },
        methods: {
            handleClick(){
                this.$axios.post('/category',this.formData).then(res => {
                    if(res.code == 200){
                        this.$message.success(res.msg)
                    }
                })  
            }
        }
    }
</script>

<style scoped>
    .form-wrap {
        width: 600px;
        margin-top: 20px;
    }
</style>