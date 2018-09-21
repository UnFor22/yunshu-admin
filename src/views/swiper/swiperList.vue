<template>
    <div>
        <h2>轮播图列表</h2>
        <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
                label="头图"
                width="150">
                <template slot-scope="scope">
                    <img :src="scope.row.img" class="avatar" alt="">
                </template>
                </el-table-column>
                <el-table-column
                label="类名"
                width="140">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.sort }}</span>
                </template>
                </el-table-column>
                <el-table-column
                label="index"
                width="150">
                <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.index }}</span>
                </template>
                </el-table-column>
                <el-table-column
                label="标题"
                width="220">
                <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.title }}</span>
                </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                        size="mini"
                        @click="handleList(scope.$index, scope.row)">详情</el-button>
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
            size: 6,
            page: 1
            }
    },
    methods: {
        getTableData(){
            this.$axios.get('/swiper',{pn: this.page, size:this.size}).then(res => {
                console.log(res)
                this.count = res.count
                this.tableData = res.data
            })
        },
        handleEdit(index, row) {
            console.log(index, row);
        },
        handleDelete(index, row) {
            console.log(index, row);
        },
        pageChange(page){
            this.page = page
            this.getTableData()
        }      
    },
    created(){
        this.getTableData()
    },
    // watch: {
    //     pn(){
    //         this.getTableData()
    //     }
    // }
  }
</script>
<style scoped lang='scss'>
    h2 {
        font-weight: 400;
        color: #666;
        margin-bottom: 20px;
    }
    .avatar {
        width: 52px;
        height: 75px;
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