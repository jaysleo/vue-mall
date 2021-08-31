<template>
<div>
    <div class="handlebox">
        <el-row>
            <el-col :span="14">
                <div class="iptbox">
                    <span class="label">手机号</span>
                    <el-input v-model="listQuery.keyword" placeholder="请输入手机号" class="ipt" clearable></el-input>
                    <el-button type="primary" class="btnsea" @click="goSearch">搜索</el-button>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="tabs">
                    <span :class="{on:tabcur==1}" @click="tabchange(1)">最近进入<i class="icon"></i></span>
                    <span :class="{on:tabcur==2}" @click="tabchange(2)">授权即将到期<i class="icon"></i></span>
                    <span :class="{on:tabcur==3}" @click="tabchange(3)">最早进入<i class="icon"></i></span>
                </div>
            </el-col>
        </el-row>
    </div>
    <el-table :data="list" v-loading="listLoading" class="mytable-scrollbar">
        <el-table-column label="ID" prop="id" width="100"></el-table-column>
        <el-table-column label="用户名" prop="username"></el-table-column>
        <el-table-column label="手机号" prop="mobile"></el-table-column>
        <el-table-column label="授权时间" prop="vip_time" :formatter="dateFormatter"></el-table-column>
    </el-table>
  <div>
    <el-pagination layout="total, sizes, prev, pager, next, jumper" :page-sizes="[10, 20, 50, 100,500]" :page-size="listQuery.limit" :total="total" :current-page.sync="listQuery.page" @size-change="changeSize" @current-change="fetchPage" @prev-click="fetchPrev" @next-click="fetchNext"></el-pagination>
  </div>
</div>
</template>

<script>
import { vipList } from '@/api/vip';
export default {
    name:"alisign",
    data(){
        return {
            list:[],
            listLoading: true,
            listQuery:{
                page: 1,
                limit: 10,
                keyword: "",
                way:""
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
            vipList(this.listQuery).then(res => {
                let data = res.data;
                this.list = data.data.data;
                this.total = data.data.total;
                // if(this.listQuery.keyword!=""){
                //     this.list = this.list.filter((item)=>{return item.mobile==this.listQuery.keyword});
                //     this.total = this.list.length;
                // }
                this.listLoading = false;
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
        tabchange(value){
            this.tabcur = value;
            this.listQuery.way = value;
            this.init();
        },
        dateFormatter (row, column) {
            let datetime = row.vip_time;
            if(datetime){
                let date = new Date(datetime*1000);
                let y = date.getFullYear();
                let MM = date.getMonth() + 1;
                MM = MM < 10 ? "0" + MM : MM;
                let d = date.getDate();
                d = d < 10 ? "0" + d : d;
                let h = date.getHours();
                h = h < 10 ? "0" + h : h;
                let m = date.getMinutes();
                m = m < 10 ? "0" + m : m;
                let s = date.getSeconds();
                s = s < 10 ? "0" + s : s;
                return y + "-" + MM + "-" + d + " " + h + ":" + m + ":" + s;
            }
            return '';
        },
        handleClick(row) {
            console.log(row);
            this.dialogVisible = true;
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