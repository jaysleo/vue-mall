<template>
<div>
    <el-table :data="list" v-loading="listLoading" class="mytable-scrollbar">
      <el-table-column label="ID" prop="id" width="100"></el-table-column>
      <el-table-column label="标题" prop="title"></el-table-column>
      <el-table-column label="创建时间" prop="create_at" sortable>
        <template slot-scope="scope">
          <span>{{scope.row.create_at|formatDate}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
          <template slot-scope="scope">
              <el-button type="text" style="color: #FF0000;" @click="handleClick(scope.row,'edit')">修改</el-button>
              <el-button type="text" @click="handleClick(scope.row.id,'del')">删除</el-button>
          </template>
      </el-table-column>
    </el-table>
    <div>
      <el-pagination layout="total, sizes, prev, pager, next, jumper" :page-sizes="[10, 20, 50, 100,500]" :page-size="listQuery.limit" :total="total" :current-page.sync="listQuery.page"
      @size-change="changeSize" @current-change="fetchPage" @prev-click="fetchPrev" @next-click="fetchNext"></el-pagination>
    </div>
</div>
</template>

<script>
import { articlelist,del_article } from '@/api/article';
export default {
  name: "contract",
  data(){
    return{
      list:[],
      listLoading: true,
      listQuery:{
          page: 1,
          limit: 10,
          tag:"contract"
      },
      total:0,
    }
  },
  filters:{
    formatDate(value) {
        let date = new Date(value*1000);
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
        articlelist(this.listQuery).then(res => {
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
            this.$router.push({name:"contractmsg",params:{data:data}});
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
            del_article(id).then((res)=>{
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
  },
  created(){
    this.init();
  }
};
</script>

<style scoped>

</style>
