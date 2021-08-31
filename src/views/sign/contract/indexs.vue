<template>
<div>
    <div class="handlebox">
        <el-row>
            <el-col :span="9">
                <div class="iptbox">
                    <span class="label">ID/手机号</span>
                    <el-input v-model="input" placeholder="请输入" class="ipt" clearable></el-input>
                    <el-button type="primary" class="btnsea">搜索</el-button>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="tabsel">
                    <span class="label">类型</span>
                    <div class="selbox on"><i class="icon"></i>已上传营业执照</div>
                    <div class="selbox"><i class="icon"></i>未上传营业执照</div>
                    <div class="selbox"><i class="icon"></i>已上传合同附件</div>
                    <div class="selbox"><i class="icon"></i>未上传合同附件</div>
                </div>
            </el-col>
        </el-row>
    </div>
    <el-table :data="list" v-loading="listLoading" class="mytable-scrollbar">
        <el-table-column label="ID" prop="id" width="100"></el-table-column>
        <el-table-column label="手机号码" prop="title" width="210"></el-table-column>
        <el-table-column label="签约时间" prop="update_at"></el-table-column>
        <el-table-column label="营业执照" prop="update_at"></el-table-column>
        <el-table-column label="合同附件" prop="update_at"></el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button type="text" style="color: #ff9d00;" @click="handleClick(scope.row)">上传营业执照</el-button>
                <el-button type="text" @click="handleClick(scope.row)">上传合同附件</el-button>
            </template>
        </el-table-column>
  </el-table>
  <div>
      <el-pagination layout="total, sizes, prev, pager, next, jumper" :page-sizes="[10, 20, 50, 100,500]" :page-size="listQuery.limit" :total="total" :current-page.sync="listQuery.page"
      @size-change="changeSize" @current-change="fetchPage" @prev-click="fetchPrev" @next-click="fetchNext"></el-pagination>
    </div>
</div>
</template>

<script>
import { articlelist,del_article } from '@/api/article';
export default {
    name:"contract",
    data(){
        return {
            input:"",
            list:[],
            listLoading: true,
            listQuery:{
                page: 1,
                limit: 10,
                tag:"contract"
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
            articlelist(this.listQuery).then(res => {
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
        handleClick(row) {
            console.log(row);
            this.dialogVisible = true;
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