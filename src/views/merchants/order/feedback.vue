<template>
<div>
    <div class="handlebox">
        <el-row>
            <el-col :span="13">
                <div class="iptbox">
                    <span class="label">ID/用户ID</span>
                    <el-input v-model="listQuery.keyword" placeholder="请输入" class="ipt" clearable></el-input>
                    <el-button type="primary" class="btnsea" @click="goSearch">搜索</el-button>
                </div>
            </el-col>
            <el-col :span="11">
                <div class="tabs">
                    <span :class="{on:tabcur==1}" @click="tabchange(1)">日期从新到旧<i class="icon"></i></span>
                    <span :class="{on:tabcur==2}" @click="tabchange(2)">日期从旧到新<i class="icon"></i></span>
                </div>
            </el-col>
        </el-row>
    </div>
    <el-table :data="list" v-loading="listLoading" class="mytable-scrollbar">
        <el-table-column label="ID" prop="id" width="100"></el-table-column>
        <el-table-column label="用户">
            <template slot-scope="scope">
                <el-image :src="scope.row.user_avatar" style="width:50px;height:50px;border-radius:50%;">
                    <div slot="error" class="image-slot">
                        <i class="el-icon-picture-outline"></i>
                    </div>
                </el-image>
            </template>
        </el-table-column>
        <el-table-column label="意见标题" prop="title"></el-table-column>
        <el-table-column label="意见反馈" prop="content"></el-table-column>
        <el-table-column label="反馈时间" prop="create_at"></el-table-column>
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
import { suggestList } from '@/api/Order'
export default {
    name:"feedbacks",
    data(){
        return {
            list:[],
            listLoading: true,
            listQuery:{
                page: 1,
                limit: 10,
                keyword: "",
                sort:""
            },
            total:0,
            tabcur:0
        }
    },
    methods:{
        init() {
            this.fetchData();
        },
        fetchData() {
            this.listLoading = true;
            suggestList(this.listQuery).then(res => {
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
        goSearch(){
            this.listQuery.page = 1;
            this.fetchData();
        },
        tabchange(index){
            this.tabcur = index;
            if(index==1){
                this.listQuery.sort = "desc";
            }else{
                this.listQuery.sort = "asc";
            }
            this.init();
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