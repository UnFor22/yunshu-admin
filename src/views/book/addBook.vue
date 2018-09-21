<template>
    <div>
        <h2>添加图书</h2>
        <el-form ref="form" :model="formData" label-width="80px" class="form-600" label-position="left"> 
            <el-form-item label="书籍地址">
                <el-input v-model="formData.url"></el-input>
            </el-form-item>
            <el-form-item label="作者">
                <el-input v-model="formData.author"></el-input>
            </el-form-item>
            <el-form-item label="书籍头图">
                <el-switch
                    v-model="value3"
                    active-text="手动上传"
                    inactive-text="图片地址">
                </el-switch>
                <upload-img v-if="value3" v-model="formData.img"></upload-img>
                <el-input v-else v-model="formData.img"></el-input>
            </el-form-item>
            <el-form-item label="分类">
                <el-select v-model="formData.typeId" placeholder="请选择">
                    <el-option
                        v-for="(item, index) in categoryData"
                        :key="index"
                        :label="item.title"
                        :value="item._id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleSubmit">立即上传</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                formData: {
                    url: '',
                    author: '',
                    img: '',
                    typeId: '',    
                },
                value3: true,
                categoryData: []
            }
        },
        methods: {
            async getCategoryData(){
                const res = await this.$axios.get('/category')
                this.categoryData = res.data
            },
            handleSubmit() {
                this.$axios.post('/book',this.formData).then(res => {
                    if(res.code == 200){
                        console.log(res)
                        this.$message.success(res.msg)
                        this.$router.push('/layout/bookList')
                    }
                })
            },
        },
        created() {
            this.getCategoryData()
        },
    }
</script>

<style scoped>
    h2 {
        font-weight: 400;
        color: #666;
        margin-bottom: 20px;
    }
    .form-600{
        width: 600px;
    }
</style>