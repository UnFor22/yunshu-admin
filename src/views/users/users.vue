<template>
    <div class="user-manage">
        <!-- <div class="breadcrumb">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to='{ path: "/laout/index"}'>首页</el-breadcrumb-item>
                <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div> -->
        <h2>用户管理</h2>
        <el-table :data = 'tableData'>
            <el-table-column
                prop='nickname'
                label='姓名'
                width='150'> 
            </el-table-column>
            <el-table-column
                prop='createdTime'
                label='日期'
                width='150'>  
            </el-table-column>
            <el-table-column
                prop='desc'
                label='个性签名'
                width='300'>    
            </el-table-column>
            <el-table-column
                prop='data'
                label='用户头像'
                width='120'>   
                <template slot-scope="scope"> 
                    <img :src="scope.row.avatar" class="avatar" alt="">
                </template>
            </el-table-column>
            <el-table-column label="操作" width="180">
                <template slot-scope="scope">
                    <el-button @click="handleDetails" size="small" type="primary">
                        查看详细
                    </el-button>
                    <el-button @click="handleDelete(scope.row._id)" size="small" type="danger">
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            background
            layout="prev, pager, next"
            :page-size= '6'
            @current-change="pageChange"
            :total="count">
        </el-pagination>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                tableData: [],
                count: 0,
                size: 6,
                page: 1
            }
        },
        methods: {
            getData () {
                this.$axios.get('/user', {pn: this.page, size:this.size}).then(res => {
                    if(res.code == 200){
                        this.count = res.count
                        this.tableData = res.data
                    }
                })
            },
            handleDetails () {
                this.$router.push('/layout/userDetails')
            },
            handleDelete (id) {    
                this.$confirm('此操作将删除一位管理员, 是否继续?', '警告', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios.post('/user/delete',{userIds: [id]}).then(res => {               
                        this.$message.success(res,msg)
                        this.getData()
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });
            },
            pageChange(page){
                this.page = page
                this.getData()
            }
        },
        created() {
            this.getData()
        }
    }
</script>

<style scoped lang='scss'>
    h2 {
        font-weight: 400;
        color: #666;
        margin-bottom: 20px;
    }
.user-manage {
    // .breadcrumb{
    //     margin-bottom: 20px;
    // }
    .avatar {
        width: 60px;
        height: 60px;
    }
}
</style>