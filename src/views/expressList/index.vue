<template>
<div>
  <el-table :data="list" v-loading="listLoading" class="mytable-scrollbar">
    <el-table-column label="ID" prop="id"></el-table-column>
    <el-table-column label="快递名称" prop="name"></el-table-column>
    <el-table-column label="快递logo">
      <template slot-scope="scope">
        <div class="imgwrap">
            <el-image :src="scope.row.icon" class="img">
                <div slot="error" class="image-slot">
                    <i class="el-icon-picture-outline"></i>
                </div>
            </el-image>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="更新时间" prop="update_at"></el-table-column>
    <el-table-column label="创建时间" prop="create_at"></el-table-column>
    <el-table-column label="排序值" prop="sort"></el-table-column>
  </el-table>
    <div>
      <el-pagination layout="total, sizes, prev, pager, next, jumper" :page-sizes="[10, 20, 50, 100,500]" :page-size="listQuery.limit" :total="total" :current-page.sync="listQuery.page"
      @size-change="changeSize" @current-change="fetchPage" @prev-click="fetchPrev" @next-click="fetchNext"></el-pagination>
    </div>
</div>
</template>

<script>
import { expressList } from '@/api/Order'
export default {
  name: "expressList",
  data(){
    return{
      list:[],
      listLoading: true,
      listQuery:{
          page: 1,
          limit: 10
      },
      total:0
    }
  },
  methods:{
    init() {
        this.fetchData();
    },
    fetchData() {
        this.listLoading = true;
        expressList(this.listQuery).then(res => {
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
    }
  },
  created() {
    this.init();
  },
  computed: {
    defaultImg () {
      return 'this.src="' + require('../../assets/img/no.jpg') + '";'
    }
  }
};
</script>

<style scoped>

</style>
