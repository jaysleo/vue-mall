<template>
<div>
    <div class="handlebox">
        <el-row>
            <el-col :span="9">
                <div class="iptbox">
                    <span class="label">ID/手机号</span>
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
            <el-col :span="7">
                <div class="tabsel">
                    <span class="label">类型</span>
                    <div class="selbox on"><i class="icon"></i>支付宝授权类型</div>
                    <div class="selbox last"><i class="icon"></i>现金押金类型</div>
                </div>
            </el-col>
        </el-row>
    </div>
    <el-table :data="queryForm" class="mytable-scrollbar">
        <el-table-column label="ID" prop="id" width="100"></el-table-column>
        <el-table-column label="手机号码" prop="title" width="210"></el-table-column>
        <el-table-column label="现有额度" prop="update_at"></el-table-column>
        <el-table-column label="近期调额时间" prop="update_at"></el-table-column>
        <el-table-column label="近期调额数值" prop="update_at"></el-table-column>
        <el-table-column label="剩余可用额度" prop="scope">
            <template slot-scope="scope">
                <span style="color:#FF9D00">{{scope.row.status}}</span>
            </template>
        </el-table-column>
        <el-table-column label="授权类型" prop="update_at"></el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button type="text" style="color: #ff9d00;" @click="handleClick(scope.row)">增加</el-button>
                <el-button type="text" style="color: #FF0000;" @click="handleClick(scope.row)">递减</el-button>
                <el-button type="text" style="color: #FF5D5D;" @click="handleClick(scope.row)">关闭</el-button>
                <el-button type="text" @click="handleClick(scope.row)">开启</el-button>
            </template>
        </el-table-column>
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
    name:"author",
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
        },
        handleClick(row) {
            console.log(row);
            this.dialogVisible = true;
        }
    }
}
</script>
<style lang="less">
@import url('~@/assets/css/order.less');
</style>