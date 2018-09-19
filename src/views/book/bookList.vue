<template>
    <div>
        <h2>图书列表</h2>
        <el-table
            :data="tableData"
            style="width: 100%"
            class="table-wrap">
            <el-table-column
            label="头图"
            width="170">
            <template slot-scope="scope">
                <img :src="scope.row.img" class="avatar" alt="">
            </template>
            </el-table-column>
            <el-table-column
            label="作者"
            width="140">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.author }}</span>
            </template>
            </el-table-column>
            <el-table-column
            label="创建日期"
            width="240">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
            </template>
            </el-table-column>
            <el-table-column
            label="Index"
            width="180">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.index }}</span>
            </template>
            </el-table-column>
            <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
        data() {
            return {
                tableData: [],
                count: 10,
                size: 10,
                page: 1
            }
        },
        methods: {
            getData () {
                this.$axios.get('/book',{pn: this.page, size:this.size}).then(res => {
                    console.log(res)
                    if(res.code == 200){
                        this.tableData = res.data
                    }
                })
                this.count = (this.tableData.length) / this.size + 1
            },
            handleEdit(index, row) {
                console.log(index, row);
            },
            handleDelete(index, row) {
                this.$confirm('此操作将永久删除该文件，是否继续？','提示',{
                    confirmButtonText:'确定',
                    cancelButtonText:'取消',
                    type: 'warning',
                    center: true
                }).then(()=>{
                    this.$axios.delete(`/book/:${this.tableData._id}`).then(res=>{
                        if(res.code == 200){
                            this.getData()
                            this.$message({
                                type:'success',
                                message: res.msg
                            })
                        }
                    })
                }).catch(()=>{
                    this.$message({
                        type:'info',
                        message: '已取消删除'
                    })
                })
            }, 
            pageChange(page){
                 this.page = page
            }         
        },
        created() {
            this.getData()
        },
        watch: {
            pn(){
                this.getData()
            }
        }
    }
</script>

<style scoped lang = 'scss'>
    h2 {
        font-weight: 400;
        margin-bottom: 20px;
    }
    .avatar {
        width: 60px;
        height: 80px;
    }
</style>
<style>
    .el-table {
        text-align: center;
    }
    .el-table th > .cell {
        text-align: center
    }
</style>
