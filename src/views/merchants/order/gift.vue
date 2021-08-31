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
            <el-col :span="7">
                <div class="tabsel">
                    <span class="label">类型</span>
                    <div class="selbox on"><i class="icon"></i>已登记</div>
                    <div class="selbox last"><i class="icon"></i>未登记</div>
                </div>
            </el-col>
        </el-row>
    </div>
    <el-table :data="queryForm" class="mytable-scrollbar">
        <el-table-column label="ID" prop="id" width="100"></el-table-column>
        <el-table-column label="手机号码" prop="title" width="210"></el-table-column>
        <el-table-column label="商品名称" prop="update_at"></el-table-column>
        <el-table-column label="数量" prop="update_at"></el-table-column>
        <el-table-column label="商品图片" prop="scope">
            <template slot-scope="scope">
                <img :src="scope.row.src">
            </template>
        </el-table-column>
        <el-table-column label="赠送时间" prop="update_at" width="210"></el-table-column>
        <el-table-column label="状态" prop="scope" width="210">
            <template slot-scope="scope">
                <span style="color:#FF9D00" v-if="scope.row.status==1">{{scope.row.status}}</span>
                <span style="color:#B1B1B1" v-else>{{scope.row.status}}</span>
            </template>
        </el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
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
  <el-dialog title="查看详情" :visible.sync="dialogVisible" :center="true" width="766px" :before-close="handleClose">
    <div class="giftwrap">
        <div class="imgwrap">
            <el-image class="img"></el-image>
            <div class="info">
                <span class="title">进口软糯香蕉</span>
                <span class="num">x1</span>
            </div>
        </div>
        <div class="infobox">
            <div class="title">收件信息</div>
            <el-row class="cell">
                <el-col :span="8">
                    <span class="label">收货人</span>
                    <span>周周</span>
                </el-col>
                <el-col :span="16">
                    <span class="label">联系方式</span>
                    <span>15058395873</span>
                </el-col>
            </el-row>
            <el-row class="cell">
                <span class="label">收货地址</span>
                <span>周周</span>
            </el-row>
        </div>
    </div>
    <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false" style="width: 270px;height: 38px;background: #ffa10a;border-color:#ffa10a">确 定</el-button>
    </span>
</el-dialog>
</div>
</template>

<script>
export default {
    name:"gift",
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
            pageshow:true,
            dialogVisible:false
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
        },
        handleClose(done) {
            this.$confirm('确认关闭？').then(() => {
                done();
            }).catch(()=> {});
        }
    }
}
</script>
<style lang="less">
@import url('~@/assets/css/order.less');
</style>
<style lang="less" scoped>
.giftwrap{
    .imgwrap{
        padding:40px 0;
        display: flex;
        align-items: center;
        border-top: 1px solid #d4d4d4;
        border-bottom: 1px solid #d4d4d4;
        .img{
            width: 94px;
            height: 94px;
            background: #b4b4b4;
            flex-shrink: 0;
        }
        .info{
            display: flex;
            flex-direction: column;
            margin-left: 20px;
            .title{
                font-size: 20px;
                color:#000000;
                height: 64px;
            }
            .num{
                font-size: 18px;
                color:#FF9D00;
            }
        }
    }
    .infobox{
        font-size: 18px;
        color:#141313;
        .cell{
            padding:20px 0;
            border-bottom:1px solid #f8f8f8;
        }
        .title{
            color:#FF9D00;
            padding:28px 0;
        }
        .label{
            color:#707070;
            margin-right: 26px;
        }
    }
}
</style>