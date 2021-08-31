<template>
<div>
    <div class="handlebox">
        <el-row>
            <el-col :span="24">
                <div class="iptbox">
                    <span class="label">商品名称</span>
                    <el-input v-model="listQuery.keyword" placeholder="请输入" class="ipt" clearable></el-input>
                    <el-button type="primary" class="btnsea" @click="goSearch">搜索</el-button>
                </div>
            </el-col>
        </el-row>
    </div>
    <el-table :data="list" v-loading="listLoading" class="mytable-scrollbar">
        <el-table-column type="index" width="100"></el-table-column>
        <el-table-column label="商品名称" prop="title"></el-table-column>
        <el-table-column label="限购数量" prop="update_at"></el-table-column>
        <el-table-column label="剩余数量" prop="update_at"></el-table-column>
        <el-table-column label="积分兑换" prop="update_at"></el-table-column>
        <el-table-column label="规格">
            <template slot-scope="scope">
                <span v-for="item in scope.row.sku_arr.slice(0,1)" :key="item.sku_id">{{item.size}}</span>
            </template>
        </el-table-column>
        <el-table-column label="数量" prop="stock"></el-table-column>
        <el-table-column label="主图">
            <template slot-scope="scope">
                <div class="imgwrap">
                <el-image :src="item.domain+item.path.substr(1)" v-for="(item,index) in scope.row.pic_arr.slice(0,3)" :key="index" class="img">
                    <div slot="error" class="image-slot">
                        <i class="el-icon-picture-outline"></i>
                    </div>
                </el-image>
                </div>
            </template>
        </el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button type="text" style="color: #ff9d00;" @click="handleClick(scope.row,'edit')">编辑</el-button>
                <el-button type="text" @click="handleClick(scope.row.id,'del')">删除</el-button>
            </template>
        </el-table-column>
  </el-table>
  <div v-if="pageshow">
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
import { prolist,delpro } from '@/api/classlist'
export default {
    name:"welfare",
    data(){
        return {
            list:[],
            listLoading: true,
            listQuery:{
                page: 1,
                limit: 10,
                keyword: "",
                protype:2
            },
            total:0,
            pageshow:true
        }
    },
    methods:{
        init() {
            this.fetchData();
        },
        fetchData() {
            this.listLoading = true;
            prolist(this.listQuery).then(res => {
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
        handleClick(data,type) {
            if(type=="edit"){
                this.$router.push({name:"proadd",params:{data:data}});
            }else if(type=="del"){
                this.onDel(data);
            }
        },
        onDel(id){
            this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                delpro(id).then((res)=>{
                    if(res.data.code==200){
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.init();
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