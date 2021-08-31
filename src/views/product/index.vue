<template>
<div>
    <div class="handlebox">
        <el-row>
            <el-col :span="3">
                <el-button style="color: #FFF;background-color: #ff9d00;border-color: #ff9d00;" icon="el-icon-plus" @click="AqueryForm">添加产品</el-button>
            </el-col>
            <el-col :span="9">
                <div class="iptbox">
                    <span class="label">商品名称</span>
                    <el-input v-model="listQuery.keyword" placeholder="请输入商品名称" class="ipt" clearable></el-input>
                    <el-button type="primary" class="btnsea" @click="goSearch">搜索</el-button>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="iptbox">
                    <span class="label">商品分类</span>
                    <el-select v-model="listQuery.category_id" @change="dataFilters" placeholder="请选择商品分类" style="width: 150px">
                        <el-option name="selected" value="" label="所有分类"></el-option>
                        <el-option name="selected" :value="item.category_id" :label="item.title" v-for="item in clist" :key="item.category_id"></el-option>
                    </el-select>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="iptbox">
                    <span class="label">产品分类</span>
                    <el-select v-model="listQuery.product_type" @change="dataFilter" placeholder="请选择产品分类" style="width: 150px">
                        <el-option name="selected" :value="-1" label="所有产品分类"></el-option>
                        <el-option name="selected" :value="0" label="日常商品"></el-option>
                        <el-option name="selected" :value="1" label="活动商品"></el-option>
                        <el-option name="selected" :value="2" label="签约商品"></el-option>
                        <el-option name="selected" :value="3" label="赠送商品"></el-option>
                    </el-select>
                </div>
            </el-col>
        </el-row>
    </div>
    <el-table :data="list" v-loading="listLoading" class="mytable-scrollbar">
        <el-table-column label="ID" prop="id" width="50"></el-table-column>
        <el-table-column label="商品标题" prop="title"></el-table-column>
        <el-table-column label="外部价格">
            <template slot-scope="scope">
                <span v-for="item in scope.row.sku_arr.slice(0,1)" :key="item.sku_id">{{item.price}}</span>
            </template>
        </el-table-column>
        <el-table-column label="内部价格">
            <template slot-scope="scope">
                <span v-for="item in scope.row.sku_arr.slice(0,1)" :key="item.sku_id">{{item.history_price}}</span>
            </template>
        </el-table-column>
        <el-table-column label="分类" prop="category_name"></el-table-column>
        <el-table-column label="产品分类">
            <template slot-scope="scope">
                <span v-if="scope.row.product_type==0">日常商品</span>
                <span v-if="scope.row.product_type==1">活动商品</span>
                <span v-if="scope.row.product_type==2">签约商品</span>
                <span v-if="scope.row.product_type==3">赠送商品</span>
            </template>
        </el-table-column>
        <el-table-column label="规格">
            <template slot-scope="scope">
                <span v-for="item in scope.row.sku_arr.slice(0,1)" :key="item.sku_id">{{item.size}}</span>
            </template>
        </el-table-column>
        <el-table-column label="起拍数量" prop="buy_over"></el-table-column>
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
                <el-button type="text" style="color: #EC9A17;" @click="handleClick(scope.row,'edit')">编辑</el-button>
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
import { classList,prolist,delpro } from '@/api/classlist'
export default {
    name:"product",
    data(){
        return {
            clist:[],
            list:[],
            listLoading: true,
            listQuery:{
                page: 1,
                limit: 10,
                keyword: "",
                category_id:"",
                product_type:-1
            },
            total:0,
            pageshow:true
        }
    },
    methods:{
        init() {
            this.getclist();
            this.fetchData();
        },
        getclist(){
            classList().then(res => {
                if(res.data.code==200){
                    this.clist = res.data.data;
                }
            })
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
                this.$router.push({name:"productsEdit",params:{data:data}});
            }else if(type=="del"){
                this.onDel(data);
            }
        },
        AqueryForm(){
            this.$router.push({name:"productsEdit"});
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
        },
        dataFilters() {
            this.listQuery.page = 1;
            this.fetchData();
        },
        dataFilter(val) {
            if(val.toString()!=""){
                this.listQuery.page = 1;
                this.fetchData();
            }
        }
    },
    created() {
        this.init();
    }
}
</script>
<style lang="less">
@import url('~@/assets/css/order.less');
</style>