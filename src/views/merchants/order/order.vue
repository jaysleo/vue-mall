<template>
<div>
    <div class="toptab">
        <span class="on">待发货</span>
        <span>待收货</span>
        <span>已完成</span>
    </div>
    <div class="handlebox">
        <el-row>
            <el-col :span="9">
                <div class="iptbox">
                    <span class="label">ID/手机号</span>
                    <el-input v-model="input" placeholder="请输入" class="ipt" clearable></el-input>
                    <el-button type="primary" class="btnsea">搜索</el-button>
                </div>
            </el-col>
            <el-col :span="9">
                <div class="iptbox">
                    <span class="label">商品名称</span>
                    <el-input v-model="input" placeholder="请输入" class="ipt" clearable></el-input>
                    <el-button type="primary" class="btnsea">搜索</el-button>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="tabs">
                    <span class="on">日期从新到旧<i class="icon"></i></span>
                    <span>日期从旧到新<i class="icon"></i></span>
                </div>
            </el-col>
        </el-row>
    </div>
    <el-table :data="queryForm" class="mytable-scrollbar">
        <el-table-column label="ID" prop="id" width="100"></el-table-column>
        <el-table-column label="手机号码" prop="title" width="210"></el-table-column>
        <el-table-column label="商品标题" prop="update_at"></el-table-column>
        <el-table-column label="购买数量" prop="update_at"></el-table-column>
        <el-table-column label="实付价格" prop="update_at"></el-table-column>
        <el-table-column label="状态" prop="update_at"></el-table-column>
        <el-table-column label="主图" prop="update_at"></el-table-column>
        <el-table-column label="订单时间" prop="update_at"></el-table-column>
  </el-table>
  <div v-if="pageshow">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="query.current_page"
      :page-sizes="[10, 15, 30 , 40]"
      :page-size="query.per_page"
      layout="total, sizes, prev, pager, next, jumper"
      :total="query.total">
    </el-pagination>
  </div>
</div>
</template>

<script>
export default {
    name:"shopOrder",
    data(){
        return {
            input:"",
            queryForm:[],
            query:{
                total: null,
                per_page: 10,
                current_page: 1,
                last_page:1,
                keyword: ''
            },
            pageshow:true
        }
    },
    methods:{
        // 监听 pagesize 改变的事件
        handleSizeChange (newSize) {
            this.query.per_page = newSize
            this.handleCurrentChange(this.page)
        },
        // 监听 页码值 改变的事件
        handleCurrentChange (val) {
            this.page  = val
            const obj = {}
            obj.per_page = this.query.per_page
            obj.current_page = this.query.current_page
            obj.last_page = this.query.last_page
            obj.keyword = this.query.keyword
            obj.page = val
        }
    }
}
</script>
<style lang="less" scoped>
@import url('~@/assets/css/order.less');
.toptab{
    font-size: 17px;
    color:#b1b1b1;
    display: flex;
    align-items: center;
    padding-bottom: 27px;
    span{
        padding:0 30px;
        cursor: pointer;
        &.on{
            color:#ff9d00;
        }
    }
}
</style>