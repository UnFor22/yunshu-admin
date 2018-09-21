<template>
    <div>
        <h2>修改图书信息</h2>
        <div class="form-wrap">
            <el-form :model="formData" size="small" label-width="80px" label-position="left">
            <el-form-item label="作者">
                <el-input v-model="formData.author"></el-input>
            </el-form-item>
            <el-form-item label="书籍头图">
                <uploadImg v-model="formData.img" style="float:left"></uploadImg>
            </el-form-item>
            <el-form-item label="Index">
                <template>
                    <el-input-number v-model="formData.index" :min="1" :max="1000" size="large" label="Index"></el-input-number>
                </template>
            </el-form-item>
            <el-form-item label="标题">
                <el-input v-model="formData.title"></el-input>
            </el-form-item>
            <el-form-item label="描述">
                <el-input type="textarea" v-model="formData.desc"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button size="small" type='primary' @click="handleClick">保存更改</el-button>
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
                    author: '',
                    img: '',
                    index: '',
                    title: '',
                    desc: '',
                    type: '',
                    _id: this.$route.query.id
                },
                
            }
        },
        methods: {
            getFormData(){
                this.$axios.get(`/book/${this.$route.query.id}`).then(res => {
                    console.log(res)
                    console.log(this.formData._id)
                    this.formData = res.data
                })
            },
            handleClick() {
                this.$axios.put('/book',this.formData).then(res=>{
                    console.log(res)
                    if(res.code == 200){
                        let userInfo = res.data  
                        this.$message.success(res.msg)
                    }
                })
            }
        },
        created() {
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
        width: 600px;
        margin-left: 10px;
    }
</style>