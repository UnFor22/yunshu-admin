<template>
    <div>
        <h2>分类列表<i title="添加分类" class="el-icon-circle-plus-outline" ></i></h2>
        <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      label="头像"
      width="140">
      <template slot-scope="scope">
        <img :src="scope.row.icon" alt="">
      </template>
    </el-table-column>
    <el-table-column
      label="类名"
      width="120">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.title }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column
      label="index"
      width="100">
      <template slot-scope="scope">
        <span>{{ scope.row.index }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="typeId"
      width="230">
      <template slot-scope="scope">
        <span>{{ scope.row._id }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="书的数量"
      width="140">
      <template slot-scope="scope">
        <span>{{ scope.row.books.length }}</span>
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
            :page-size= '8'
            @current-change="pageChange"
            :total="count">
        </el-pagination>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                count:0,
                tableData: [],
                pn:1,
                page:1
            }
        },
        methods: {
            getLists() {
                this.$axios.get('/category',{pn: this.page, size:this.size}).then(res => {
                    // console.log(res)
                    this.count = res.count
                    this.tableData = res.data
                })
            },
            handleEdit(index, row) {
                let id = row._id
                this.$router.push(`/layout/catalogEdit?id=${id}`)
            },
            handleList(index, row) {
                let id = row._id
                this.$router.push(`/index/onCatalog?id=${id}`)
            },
            handleDelete(index, row) {
                this.$confirm('此操作将永久删除该文件，是否继续？','提示',{
                    confirmButtonText:'确定',
                    cancelButtonText:'取消',
                    type: 'warning',
                    // center: true
                }).then(()=>{
                    // console.log(row._id)
                    this.$axios.delete(`/category/${row._id}`).then(res=>{
                        // console.log(res)
                        if(res.code == 200){
                            this.getLists()
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
                this.getLists()
            }
        },
        created() {
            this.getLists()
        },
        watch:{
            pn(){
                this.getLists()
            }
        }
    }
</script>

<style scoped lang='scss'>
    h2 {
        font-weight: 400;
        color: #666;
        margin-bottom: 20px;
    }
    img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
    }
    h2 {
        i {
            margin-left: 20px;
            font-size: 20px;
            color: #333;
            vertical-align: middle;
        }
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
