<template>
<div>
  <div class="handlebox">
        <el-row>
            <el-col :span="9">
                <div class="iptbox">
                    <span class="label">手机号码</span>
                    <el-input v-model="listQuery.keyword" placeholder="请输入手机号" class="ipt" clearable></el-input>
                    <el-button type="primary" class="btnsea" @click="gosearch">搜索</el-button>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="tabsel">
                    <span class="label">只看</span>
                    <div class="selbox" :class="{on:tabcur==1}" @click="tabChange(1)"><i class="icon"></i>交押金并授权的商家</div>
                    <div class="selbox last" :class="{on:tabcur==2}" @click="tabChange(2)"><i class="icon"></i>未交押金仅签写合同商家</div>
                </div>
            </el-col>
        </el-row>
    </div>
    <el-table :data="list" v-loading="listLoading" class="mytable-scrollbar">
      <el-table-column label="ID" prop="id" width="100"></el-table-column>
      <el-table-column label="手机号" prop="user_mobile"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <span v-if="scope.row.pay_status==1 && scope.row.is_sign==0" style="color:#42BF00;">已授权缴纳押金未签写合同</span>
          <span v-if="scope.row.confirm_status==1 && scope.row.is_sign==0" style="color:#42BF00;">已授权缴纳押金未签写合同</span>
          <span v-if="scope.row.pay_status==1 && scope.row.is_sign==1" style="color:#42BF00;">已授权缴纳押金</span>
          <span v-if="scope.row.pay_status==0 && scope.row.is_sign==1" style="color:#B1B1B1;">未交押金仅签写合同商家</span>
        </template>
      </el-table-column>
      <el-table-column label="押金金额" prop="vip_money"></el-table-column>
      <el-table-column label="订单号" prop="vip_order_no"></el-table-column>
      <el-table-column label="押金缴纳时间">
        <template slot-scope="scope">
          <span v-if="scope.row.pay_time!=null">{{scope.row.pay_time|parseDateFull}}</span>
          <span v-if="scope.row.confirm_time!=null && scope.row.confirm_status==1">{{scope.row.confirm_time|parseDateFull}}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建日期" prop="create_at"></el-table-column>
      <!-- <el-table-column label="操作">
          <template slot-scope="scope">
              <el-button type="text" @click="handleClick(scope.row.id)">删除</el-button>
          </template>
      </el-table-column> -->
    </el-table>
    <!-- 分页区域 -->
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
import { signList,delsign } from "@/api/vip";

export default {
  name: "signshop",
  data(){
    return{
      userform:[],
      list:[],
      listLoading: true,
      listQuery:{
        page: 1,
        limit: 10,
        keyword: "",
        way:""
      },
      total:0,
      pageshow:true,
      tabcur:0
    }
  },
  filters:{
    parseDateFull(time) {
      let date = new Date(time*1000);
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
  },
  methods:{
    init() {
        this.fetchData();
    },
    fetchData() {
        this.listLoading = true;
        signList(this.listQuery).then(res => {
            let data = res.data;
            this.list = data.data.data;
            this.total = data.data.total;
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
    tabChange(val){
      this.tabcur = val;
      this.listQuery.way = val;
      this.init();
    },
    gosearch(){
      this.listQuery.page = 1;
      this.fetchData();
    },
    handleClick(id){
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(() => {
          delsign(id).then((res)=>{
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
    }
  },
  created() {
    this.init();
  }
};
</script>

<style lang="less" scoped>
@import url('~@/assets/css/order.less');
</style>
