<template>
<div>
    <div class="handlebox">
        <el-row>
            <el-col :span="9">
                <div class="iptbox">
                    <span class="label">商品名称</span>
                    <el-input v-model="input" placeholder="请输入商品名称" class="ipt" clearable></el-input>
                    <el-button type="primary" class="btnsea">搜索</el-button>
                </div>
            </el-col>
            <el-col :span="9">
                <div class="iptbox">
                    <span class="label">手机号码</span>
                    <el-input v-model="input2" placeholder="请输入" class="ipt" clearable></el-input>
                    <el-button type="primary" class="btnsea">搜索</el-button>
                </div>
            </el-col>
        </el-row>
    </div>
    <el-table :data="queryForm" class="mytable-scrollbar">
        <el-table-column label="" prop="id" width="100"></el-table-column>
        <el-table-column label="商品标题" prop="title" width="210"></el-table-column>
        <el-table-column label="兑换次数" prop="update_at"></el-table-column>
        <el-table-column label="剩余数量" prop="update_at"></el-table-column>
        <el-table-column label="积分兑换" prop="update_at"></el-table-column>
        <el-table-column label="兑换人手机号" prop="update_at"></el-table-column>
        <el-table-column label="兑换时间" prop="update_at"></el-table-column>
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
    name:"exchange",
    data(){
        return {
            input:"",
            input2:"",
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
<style lang="less">
@import url('~@/assets/css/order.less');
</style>