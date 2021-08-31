<template>
<div>
    <div class="handlebox">
        <el-row>
            <el-col :span="24">
                <div class="iptbox">
                    <span class="label">手机号</span>
                    <el-input v-model="listQuery.keyword" placeholder="请输入手机号" class="ipt" clearable></el-input>
                    <el-button type="primary" class="btnsea" @click="goSearch">搜索</el-button>
                </div>
            </el-col>
        </el-row>
    </div>
    <el-table :data="list" v-loading="listLoading" class="mytable-scrollbar">
        <el-table-column type="index" width="100"></el-table-column>
        <el-table-column label="客户名称" prop="name"></el-table-column>
        <el-table-column label="付款金额" prop="money"></el-table-column>
        <el-table-column label="下单商品" prop="product_title"></el-table-column>
        <el-table-column label="手机号码" prop="mobile"></el-table-column>
        <el-table-column label="评论内容" prop="content"></el-table-column>
        <el-table-column label="评论时间" prop="update_at"></el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button type="text" @click="handleClick(scope.row.id)">删除</el-button>
            </template>
        </el-table-column>
  </el-table>
  <div>
    <el-pagination
      layout="total, sizes, prev, pager, next, jumper"
      :page-sizes="[10, 20, 50, 100,500]"
      :page-size="listQuery.limit"
      :total="total"
      :current-page.sync="listQuery.page"
      @size-change="changeSize"
      @current-change="fetchPage"
      @prev-click="fetchPrev"
      @next-click="fetchNext">
    </el-pagination>
  </div>
</div>
</template>

<script>
import { commitList,delcommit } from '@/api/Order'
export default {
    name:"OrderCommit",
    data(){
        return {
            list:[],
            listLoading: true,
            listQuery:{
                page: 1,
                limit: 10,
                keyword: ""
            },
            total:0
        }
    },
    methods:{
        init() {
            this.fetchData();
        },
        fetchData() {
            this.listLoading = true;
            commitList(this.listQuery).then(res => {
                let data = res.data;
                this.list = data.data.data;
                this.listLoading = false;
                this.total = data.data.total;
            })
        },
        fetchNext() {
            this.listQuery.page = this.listQuery.page + 1;
            this.fetchData();
        },
        fetchPrev() {
            this.listQuery.page = this.listQuery.page - 1;
            this.fetchData();
        },
        fetchPage(page) {
            this.listQuery.page = page;
            this.fetchData();
        },
        changeSize(limit) {
            this.listQuery.limit = limit;
            this.fetchData();
        },
        handleClick(id) {
            this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                delcommit(id).then((res)=>{
                    if(res.data.code==200){
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.init();
                    }else{
                        this.$message({
                            type: 'error',
                            message: res.data.message
                        });
                    }
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                });          
            });
        },
        goSearch(){
            this.listQuery.page = 1;
            this.fetchData();
        }
    },
    created(){
        this.init();
    }
}
</script>
<style lang="less">
@import url('~@/assets/css/order.less');
</style>