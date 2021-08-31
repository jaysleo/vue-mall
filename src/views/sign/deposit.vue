<template>
<div>
  <div class="handlebox">
        <el-row>
            <el-col :span="24">
                <div class="iptbox">
                    <span class="label">用户ID</span>
                    <el-input v-model="listQuery.user_id" placeholder="请输入用户ID" class="ipt" clearable></el-input>
                    <el-button type="primary" class="btnsea" @click="goSearch">搜索</el-button>
                </div>
            </el-col>
        </el-row>
    </div>
    <el-table :data="list" v-loading="listLoading" class="mytable-scrollbar">
      <el-table-column label="ID" prop="id" width="100"></el-table-column>
      <el-table-column label="手机号" prop="mobile"></el-table-column>
      <el-table-column label="缴纳时间" prop="vip_time" :formatter="dateFormatter"></el-table-column>
      <el-table-column label="注册时间" prop="create_at"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" disabled v-if="scope.row.is_vip==1">授权</el-button>
          <el-button type="text" @click="handleClick(scope.row.id)" v-if="scope.row.is_vip==0">授权</el-button>
        </template>
      </el-table-column>
    </el-table>
</div>
</template>

<script>
import { getvipUser,userVip } from '@/api/vip';
export default {
  name: "signdeposit",
  data(){
    return{
      list:[],
      listLoading: true,
      listQuery:{
          user_id: ""
      },
      dialogVisible:false
    }
  },
  methods:{
    init() {
        this.fetchData();
    },
    fetchData() {
        this.listLoading = true;
        getvipUser(this.listQuery).then(res => {
          if(res.data.code==200){
            let newdata = [];
            let data = res.data;
            newdata.push(data.data);
            this.list = newdata;
            this.listLoading = false;
          }else{
            this.listLoading = false;
            this.$message({
              message: res.data.message,
              type: 'info'
            })
          }
        })
    },
    handleClick(id) {
      this.$confirm('确定是否授权?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          userVip(id).then((res)=>{
            if(res.data.code==200){
              this.$message({
                type: 'success',
                message: "授权成功"
              });
              this.list = [];
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
      this.fetchData();
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
    }
  },
  created(){
    this.listLoading = false;
  }
};
</script>

<style lang="less" scoped>
@import url('~@/assets/css/order.less');
</style>
