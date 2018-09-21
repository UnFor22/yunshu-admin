<template>
    <div>
        <h2>添加分类</h2>
        <div class="form-wrap">
            <el-form :model="formData" size="small" label-width="80px" label-position="left">
            <el-form-item label="分类名">
                <el-input v-model="formData.title"></el-input>
            </el-form-item>     
            <el-form-item label="分类头图">
                <uploadImg v-model="formData.icon" style="float:left"></uploadImg>
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
                    title: '',
                    icon: ''
                },
            }
        },
        methods: {
            handleClick(){
                this.$axios.post('/category',this.formData).then(res => {
                    if(res.code == 200){
                        console.log(res)
                        this.$message.success(res.msg)
                    }
                })  
            }
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
        width: 600px;
        margin-left: 10px;
    }
</style>