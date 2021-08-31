<template>
<div class="loading-area">
  <el-card style="margin-bottom: 10px">
    <div>
      <el-button style="color: #FFF;background-color: #ff9d00;border-color: #ff9d00;" icon="el-icon-plus" @click="AqueryForm">添加</el-button>
    </div>
  </el-card>
  <el-table :data="queryForm" class="mytable-scrollbar">
    <el-table-column label="ID" prop="id"></el-table-column>
    <!-- <el-table-column label="标题" prop="title"></el-table-column> -->
    <el-table-column label="轮播图" prop="icon">
      <template slot-scope="scope">
        <el-image :src="scope.row.domainImg" fit="cover" style="width:200px;">
          <div slot="error" class="image-slot">
            <i class="el-icon-picture-outline"></i>
          </div>
        </el-image>
      </template>
    </el-table-column>
    <el-table-column label="更新时间" prop="update_at"></el-table-column>
    <el-table-column label="操作">
        <template slot-scope="scope">
            <el-button type="text" @click="handleClick(scope.$index,scope.row.id)">删除</el-button>
        </template>
    </el-table-column>
  </el-table>
  <!-- 分页区域 -->
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
  <el-dialog title="上传轮播图" :visible.sync="AdddialogVisible">
    <el-form ref="ruleForm" label-position="left" label-width="100px">
      <el-form-item class="label" label="轮播图">
      <el-upload
        ref="upload"
        list-type="picture-card"
        :action="uploadUrl"
        :headers="importHeaders"
        :on-progress="progress"
        :on-success="handleAvatarSuccess"
        :limit="1"
        :before-upload="beforeUpload"
        :auto-upload="false"
        :data="addquery"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                  <img width="100%" :src="this.addquery.image" alt="">
                </el-dialog>
      </el-form-item>
      <el-form-item class="label" label="跳转地址">
        <el-input style="width: 50%" v-model="addquery.to_url"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
    <el-button @click="cancel()">取 消</el-button>
    <el-button type="primary" @click="AddOver">确 定</el-button>
  </span>
  </el-dialog>
</div>
</template>

<script>
import { bannerList,delbanner } from "@/api/banner";
import {getApiUrl} from '@/utils/utils'
export default {
  name: "banner",
  data(){
    return{
      pageshow:true,
      id:'upload',
      queryForm:[],
      dialogVisible:false,
      AdddialogVisible:false,
      addquery:{
        image:'',
        to_url:''
      },
      query:{
        total: null,
        per_page: 10,
        current_page: 1,
        last_page:1,
        keyword: ''
      },
      uploadUrl:"",
      domainImg: '',
      importHeaders: {'X-token': sessionStorage.getItem('token')}
    }
  },
  methods:{
    init(){
      this.uploadUrl = getApiUrl() + "banner/upload";
      this.getbannerList();
    },
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
      bannerList(obj).then(({data:res})=>{
        this.queryForm.forEach(i=>{
          i.domainImg = i.domain + i.path
        })
        this.queryForm = res.data.data
        this.query.total = res.data.total
        this.query.per_page = res.data.per_page
        this.query.current_page = res.data.current_page
        this.query.last_page = res.data.last_page
      })
    },
    beforeUpload (file) {
      this.addquery.image = file;
      // console.log(this.uploadData)
      let promise = new Promise((resolve) => {
        this.$nextTick(function () {
          resolve(true);
        });
      });
      return promise; //通过返回一个promis对象解决
    },
    getbannerList(){
      bannerList(this.query).then(({data:res})=>{
        this.queryForm = res.data.data
        res.data.data.forEach(i=>{
          i.domainImg = i.domain + i.path.substr(1)
        })
        this.query.total = res.data.total
        this.query.per_page = res.data.per_page
        this.query.current_page = res.data.current_page
        this.query.last_page = res.data.last_page
      })
    },
    AqueryForm(){
      this.addquery = {image:'',to_url:''};
      this.AdddialogVisible = true;
    },
    cancel(){
      this.addquery = {image:'',to_url:''};
      this.AdddialogVisible = false;
    },
    progress(event, file, fileList){
      console.log('event', event, 'file', file, 'fileList', fileList);
      this.addquery.image = file;
    },
    AddOver(){
      this.$refs.upload.submit();
      this.AdddialogVisible = false;
      const loading = this.$loading({
          lock: true,
          target: document.querySelector('.loading-area')
      });
      setTimeout(()=>{
        loading.close();
        location.reload();
      },2000)
      // this.getbannerList();
    },
    handleAvatarSuccess(res) {
      console.log('res', res);
      if (res.code === 401) {
        this.$message({
          message: res.message,
          type: 'error',
          duration: '2000'
        })
        return false
      }
      if (res.code === 200) {
        this.$message({
          message: res.message,
          type: 'success',
          duration: '2000'
        })}
    },
    handleClick(index,id){
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(() => {
        delbanner(id).then((res)=>{
            if(res.data.code==200){
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
                this.queryForm.splice(index,1);
                this.getbannerList();
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
  mounted(){
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
