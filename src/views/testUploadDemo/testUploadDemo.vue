<template>
    <div>
        <h1>表单上传测试页</h1>
        <!-- <h2>传统表单上传</h2>
        <div>
            <form action="https://upload-z1.qiniup.com" method="post" enctype="multipart/form-data">
                <input type="file" name="file">
                <br>
                <input type="text" name="token" v-model="token">
                <br>
                <button>提交</button>
            </form>
        </div> --> 
        <!-- <uploadCom @success='uploadImg'></uploadCom>
        <div style="border:1px solid #000">
            <img :src="imgData" alt="">
        </div> -->
        <checkBoxCom v-model="myCheckBox"></checkBoxCom>
        <!-- <h2>ajax上传图片</h2>
        <input type="file" @change="handleChange">
        <img :src="imgData" alt=""> -->
    </div>
</template>

<script>
    import checkBoxCom from '@/components/checkbox-com'
    import axios from 'axios'
    import uploadCom from '../../components/upload-com.vue'  
    export default {
        name: 'index',
        components: {
            uploadCom,
            checkBoxCom
        },
        data () {
            return {
                token: '',
                imgData: '',
                myCheckBox: ''
            }
        },
        methods: {
            getToken(){
                axios.get('http://upload.yaojunrong.com/getToken').then(res => {
                    console.log(res)
                    this.token = res.data.data
                })
            },
            handleChange(event){
                let file = event.target.files[0] 
                let formData = new FormData()
                formData.append('file', file, file.name)
                formData.append('token', this.token)

                axios.post('https://upload-z1.qiniup.com', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then(res => {
                    this.imgData = res.data.url
                })
            },
            uploadImg(url){
                this.imgData = url
            }
        },
        created(){
            this.getToken()
        }
    }
</script>

<style scoped>

</style>