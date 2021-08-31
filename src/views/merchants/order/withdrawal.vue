<template>
<div>
    <div class="handlebox">
        <el-row>
            <el-col :span="24">
                <div class="iptbox">
                    <span class="label">订单号</span>
                    <el-input v-model="listQuery.keyword" placeholder="请输入" class="ipt" clearable></el-input>
                    <el-button type="primary" class="btnsea" @click="goSearch">搜索</el-button>
                </div>
            </el-col>
        </el-row>
    </div>
    <el-table :data="list" v-loading="listLoading" class="mytable-scrollbar">
        <el-table-column label="ID" prop="id" width="100"></el-table-column>
        <el-table-column label="订单号" prop="withdraw_order_no"></el-table-column>
        <el-table-column label="金额" prop="money"></el-table-column>
        <el-table-column label="银行卡号" prop="bank_number"></el-table-column>
        <el-table-column label="申请时间">
            <template slot-scope="scope">{{scope.row.create_at}}</template>
        </el-table-column>
        <el-table-column label="状态">
            <template slot-scope="scope">
                <span v-if="scope.row.confirm_status==0" style="color: #FF0000;">待审核</span>
                <span v-if="scope.row.confirm_status==1" style="color: #42BF00;">已通过</span>
                <span v-if="scope.row.confirm_status==2" style="color:#B1B1B1;">未通过</span>
            </template>
        </el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button type="text" @click="handleClick(scope.row.id)">审核</el-button>
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
  <el-dialog title="确认审核" :visible.sync="dialogVisible">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label="审核状态" prop="status">
            <el-select v-model="ruleForm.status" placeholder="请选择">
                <el-option label="通过" value="1"></el-option>
                <el-option label="未通过" value="2"></el-option>
            </el-select>
        </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onAudit('ruleForm')">确 定</el-button>
    </div>
    </el-dialog>
</div>
</template>

<script>
import { withdrawList,changeWithdraw } from '@/api/Order'
export default {
    name:"withdrawal",
    data(){
        return {
            list:[],
            listLoading: true,
            listQuery:{
                page: 1,
                limit: 10,
                keyword: ""
            },
            total:0,
            dialogVisible:false,
            ruleForm:{
                pid:0,
                status:""
            },
            rules: {
                status: [
                    { required: true, message: '请选择审核状态', trigger: 'change' }
                ]
            }
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
            withdrawList(this.listQuery).then(res => {
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
        handleClick(id){
            this.dialogVisible = true;
            this.ruleForm.pid = id;
            this.$nextTick(() => {
              if(this.$refs['ruleForm']){
                this.$refs['ruleForm'].resetFields();
              }
            })
        },
        onAudit(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    changeWithdraw(this.ruleForm.pid,this.ruleForm.status).then((res)=>{
                        if(res.data.code==200){
                            this.$message({
                                type: 'success',
                                message: res.data.message
                            });
                        }else{
                            this.$message({
                                type: 'error',
                                message: res.data.message
                            });
                        }
                    })
                    this.dialogVisible = false;
                } else {
                    return false;
                }
            });
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