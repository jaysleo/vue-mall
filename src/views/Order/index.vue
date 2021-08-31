<template>
<div>
    <div class="handlebox">
        <el-row>
            <el-col :span="24">
                <div class="iptbox">
                    <span class="label">订单号</span>
                    <el-input v-model="listQuery.keyword" placeholder="请输入订单号" class="ipt" clearable></el-input>
                    <el-button type="primary" class="btnsea" @click="goSearch">搜索</el-button>
                </div>
            </el-col>
        </el-row>
    </div>
    <el-table :data="list" v-loading="listLoading" class="mytable-scrollbar">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-table :data="props.row.product_arr" border fit>
            <el-table-column label="商品名称">
              <template slot-scope="scope">{{scope.row.title}}</template>
            </el-table-column>
            <el-table-column label="图片" align="center">
              <template slot-scope="scope">
                <el-image :src="scope.row.images" style="width:80px;height:80px;">
                    <div slot="error" class="image-slot">
                        <i class="el-icon-picture-outline"></i>
                    </div>
                </el-image>
              </template>
            </el-table-column>
            <el-table-column label="价格">
              <template slot-scope="scope">{{scope.row.price}}</template>
            </el-table-column>
            <el-table-column label="规格">
              <template slot-scope="scope">{{scope.row.size}}</template>
            </el-table-column>
            <el-table-column label="数量">
              <template slot-scope="scope">{{scope.row.buy_number}}</template>
            </el-table-column>
            <el-table-column label="合计">
              <template slot-scope="scope">{{scope.row.total_price}}</template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column label="ID" prop="id" width="50"></el-table-column>
      <el-table-column label="订单号" prop="order_no" width="260"></el-table-column>
      <el-table-column label="用户">
        <template slot-scope="scope">
            <span v-if="scope.row.address">{{scope.row.address.name}}</span>
        </template>
      </el-table-column>
      <el-table-column label="手机号码">
        <template slot-scope="scope">
            <span v-if="scope.row.address">{{scope.row.address.tel}}</span>
        </template>
      </el-table-column>
      <el-table-column label="收货地址">
        <template slot-scope="scope">
            <span v-if="scope.row.address">{{scope.row.address.province}}{{scope.row.address.city}}{{scope.row.address.area}}{{scope.row.address.address}}</span>
        </template>
      </el-table-column>
      <el-table-column label="实付价格" prop="total_price"></el-table-column>
      <el-table-column label="订单状态">
        <template slot-scope="scope">
            <span style="color:#FF9D00;">{{scope.row.status|orderStatus}}</span>
        </template>
      </el-table-column>
      <el-table-column label="订单时间" prop="create_at"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" style="color: #EC9A17;" v-if="scope.row.status==2" @click="handleClick(scope.row.id,'edit')">发货</el-button>
          <el-button type="text" disabled v-else>发货</el-button>
                <!-- <el-button type="text" @click="handleClick(scope.row.id,'del')">删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <div>
      <el-pagination layout="total, sizes, prev, pager, next, jumper" :page-sizes="[10, 20, 50, 100,500]" :page-size="listQuery.limit" :total="total" :current-page.sync="listQuery.page"
      @size-change="changeSize" @current-change="fetchPage" @prev-click="fetchPrev" @next-click="fetchNext"></el-pagination>
    </div>
    <el-dialog title="发货" :visible.sync="dialogShow">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label="快递公司" prop="expreid">
          <el-select v-model="ruleForm.expreid" placeholder="请选择快递公司">
            <el-option v-for="(item,index) in exprelist" :key="index" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="快递单号" prop="number">
          <el-input v-model="ruleForm.number" autocomplete="off" placeholder="请输入快递单号" style="width:200px"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogShow = false">取 消</el-button>
        <el-button type="primary" @click="onDelivery">确 定</el-button>
      </div>
    </el-dialog>
</div>
</template>

<script>
import { OrderList,expressList,order2express,delOrder } from '@/api/Order';
export default {
  name: "order",
  data(){
    return{
      list:[],
      listLoading: true,
      listQuery:{
          page: 1,
          limit: 10,
          keyword:"",
          status:1
      },
      total:0,
      dialogShow:false,
      exprelist:[],
      ruleForm:{
        expreid:"",
        number:""
      },
      rules: {
        expreid: [
          { required: true, message: '请选择快递公司', trigger: 'change' }
        ],
        number: [
            { required: true, message: '请输入快递单号', trigger: 'blur' }
        ],
      },
      orderid:0
    }
  },
  filters:{
    orderStatus(val){
      switch(val){
        case 1:
          return "待支付";
          break;
        case 2:
          return "待发货";
          break;
        case 3:
          return "待收货";
          break;
        case 4:
          return "已完成";
          break;
        case 5:
          return "已取消";
          break;
      }
    }
  },
  watch: {
    '$route' : 'getPath'
  },
  methods:{
    init() {
      let status = this.$route.params.id;
      this.listQuery.status = status;
      this.fetchData();
    },
    fetchData() {
        this.listLoading = true;
        OrderList(this.listQuery).then(res => {
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
    handleClick(id,type) {
        if(type=="edit"){
            expressList().then((res)=>{
              if(res.data.code==200){
                this.exprelist = res.data.data.data;
              }
            })
            this.dialogShow = true;
            this.orderid = id;
            this.$nextTick(() => {
              if(this.$refs['ruleForm']){
                this.$refs['ruleForm'].resetFields();
              }
            })
        }else if(type=="del"){
            this.onDel(id);
        }
    },
    onDelivery(){
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          order2express(this.orderid,this.ruleForm.expreid,this.ruleForm.number).then((res)=>{
            if(res.data.code==200){
              this.dialogShow = false;
              this.$message({
                  type: 'success',
                  message: res.data.message
              });
              this.init();
            }else{
              this.dialogShow = false;
              this.$message({
                  type: 'info',
                  message: res.data.message
              });
            }
          })
        } else {
          return false;
        }
      });
    },
    onDel(id){
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            delOrder(id).then((res)=>{
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
    getPath(){
      this.init();
    },
    goSearch(){
      this.init();
    }
  },
  created(){
    this.init();
  },
};
</script>

<style scoped>

</style>
