<template>
<div class="loading-area">
  <el-card style="margin-bottom: 10px">
    <el-form :inline="true" :label-position="labelPosition" label-width="100px">
      <div>
      <el-form-item class="label" label="商品标题" :rules="{ required: true, }">
        <el-input style="width: 800px" v-model="queryForm.title"></el-input>
      </el-form-item>
      </div>
      <div>
      <el-form-item class="label" label="产品分类" :rules="{required: true}">
        <el-select v-model="queryForm.product_type" placeholder="请选择产品分类" style="width: 220px">
          <el-option name="selected" :value="0" label="日常商品"></el-option>
          <el-option name="selected" :value="1" label="活动商品"></el-option>
          <el-option name="selected" :value="2" label="签约商品"></el-option>
          <el-option name="selected" :value="3" label="赠送商品"></el-option>
        </el-select>
      </el-form-item>
      </div>
      <div>
      <div v-for="(item, index) in sku" :key="index">
      <el-form :inline="true" :label-position="labelPosition" label-width="100px">
        <el-form-item class="label" label="外部价格" :rules="{ required: true, }">
          <el-input v-model="sku[index].price" style=" width: 200px"></el-input>
          <span style="display: inline-block">元</span>
        </el-form-item>
        <el-form-item class="label" label="实际价格"  :rules="{ required: true, }" style="margin-left: 20px">
          <el-input  v-model="sku[index].history_price" style=" width: 200px;"></el-input>元
        </el-form-item>
        <el-form-item class="label" label="规格" :rules="{ required: true, }" style="margin-left: 20px">
          <el-input v-model="sku[index].size" style=" width: 200px;"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="text" @click="onskuDel(index)">删除</el-button>
        </el-form-item>
      </el-form>
         </div>
      <el-button type="primary" class="addBtn" @click="addRow()" style="background:#ff9d00;border-color:#ff9d00;margin-bottom:20px;"><i class="el-icon-circle-plus-outline"></i>添加规格</el-button>
      </div>
      <el-form-item class="label" label="产品数量" :rules="{ required: true}">
        <el-input style="width: 200px" v-model="queryForm.stock"></el-input>
      </el-form-item>
      <el-form-item class="label" label="限购数量" :rules="{ required: true }" v-if="queryForm.product_type==1">
        <el-input style="width: 200px" v-model="queryForm.buy_limit"></el-input>
      </el-form-item>
      <el-form-item class="label" label="起拍数量" :rules="{ required: true }">
        <el-input style="width: 200px" v-model="queryForm.buy_over"></el-input>
      </el-form-item>
      <div>
        <el-form-item class="label" label="产地" :rules="{ required: true }">
        <el-input style="width: 200px" v-model="queryForm.growth"></el-input>
      </el-form-item>
      </div>
      <div>
      <el-form-item label="商品分类" :rules="{ required: true}">
        <el-cascader
          placeholder="顶级菜单"
          v-model="queryForm.category_id"
          :options="classForm"
          :props="queryprop"
          @change="handlechangeroles"
          ref="cascaders"
          :key="isResouceShow"
          clearable
        >
        </el-cascader>
      </el-form-item>
      </div>
      <div>
        <el-form-item class="label" label="主 图" :rules="{ required: true }" v-if="editpicShow">
          <el-upload ref="upload" list-type="picture-card"
            :action="uploadUrl"
            :headers="importHeaders"
            :on-success="handleGallerySuccess"
            :limit="5"
            :on-remove="handleRemove"
            :file-list="galleryList" :data="uploadData"
             :before-upload="onBeforeUploadImage"
          >
          <i class="el-icon-picture"></i>
        </el-upload>
      </el-form-item>
      <el-form-item class="label" label="主 图" :rules="{ required: true }" v-else>
        <el-upload
          ref="upload"
          list-type="picture-card"
          :action="uploadUrl"
          :headers="importHeaders"
          :on-progress="progress"
          :on-success="handleAvatarSuccess"
          :limit="5"
          :before-upload="beforeUpload"
          :auto-upload="false"
          :data="queryForm"
          :on-remove="handleRemove"
          :file-list="galleryList"
        >
          <i class="el-icon-picture"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="this.queryForm.image" alt="">
        </el-dialog>
      </el-form-item>
      </div>
      <div>
      <el-form-item label="详情内容" :rules="{ required: true }">
        <div>
          <editor :content="prosdesc" @editorContent="editorContent"></editor>
        </div>
      </el-form-item>
      </div>
      <div>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" style="margin-left:100px;width: 339px;height: 40px;background: #ff9d00;border-color: #ff9d00;">发布</el-button>
      </el-form-item>
      </div>
    </el-form>
  </el-card>
</div>
</template>

<script>
import {getApiUrl} from '@/utils/utils'
import { classList, addpro,editpro,prodesc } from '@/api/classlist'
import Editor from "@/components/Editor";
export default {
  name: "productsEdit",
  components: {Editor},
  data(){
    return{
      right:'right',
      importHeaders: {'X-token': sessionStorage.getItem('token')},
      labelPosition:'left',
      dialogVisible:false,
      disabled: false,
      queryForm:{
        title:'',
        category_id:'',
        sku:[
          {
            size:'',
            price:'',
            history_price:''
          }
        ],
        product_type:0,
        growth:'',
        buy_limit:"0",
        buy_over:"1",
        stock:"999"
      },
      prosdesc:"",
      sku:[
        {
          size:'',
          price:'',
          history_price:''
        }
      ],
      pic_arr:[],
      classForm:[],
      queryprop: {
        value: 'category_id',
        label: 'title',
        children: 'children',
        checkStrictly: true, // 可以选择任意一级
        expandTrigger: 'hover'
      },
      galleryList:[],
      uploadData:null,
      isResouceShow: 1,
      editpicShow:false,
      uploadUrl:""
    }
  },
  methods:{
    init(){
      this.uploadUrl = getApiUrl() + "product/upload_product_pic";
      this.fetchData();
    },
    fetchData(){
      let data = this.$route.params.data;
      if(data!=undefined){
        this.editpicShow = true;
        this.queryForm = data;
        this.queryForm.category_id = parseInt(data.category_id_arr.split(",").pop());
        this.sku = data.sku_arr;
        let galleryArr = data.pic_arr;
        for (let i = 0; i < galleryArr.length; i++) {
          if (galleryArr[i] != '') {
            this.galleryList.push({
              id: galleryArr[i].pic_id,
              url: galleryArr[i].domain+galleryArr[i].path.substr(1)
            })
          }
        }
        this.getprodesc(data.id);
      }
    },
    getprodesc(id){
      prodesc(id).then((res)=>{
          if(res.data.code==200){
            this.prosdesc = res.data.data.desc;
          }
      })
    },
    getClasslist() {
      classList().then(({data:res})=>{
        this.classForm = res.data;
      })
    },
    handlechangeroles (val) {
      const id = val[val.length - 1];
      console.log('id', id, 'val', val)
      this.queryForm.category_id = val.toString();
      this.queryForm.category_id_arr = val.toString();
      this.$refs.cascaders.toggleDropDownVisible();
    },
    progress(event, file, fileList){
      console.log('event', event, 'file', file, 'fileList', fileList);
      this.queryForm.image = file
    },
    beforeUpload (file) {
      console.log(file);
      this.queryForm.image = file
      // console.log(this.uploadData)
      let promise = new Promise((resolve) => {
        this.$nextTick(function () {
          resolve(true);
        });
      });
      return promise; //通过返回一个promis对象解决
    },
    handleAvatarSuccess(res) {
      this.pic_arr.push(res.data.id);
    },
    onBeforeUploadImage(file) {
      const isIMAGE = file.type === 'image/jpeg' || 'image/jpg' || 'image/png';
      const isLt1M = file.size / 1024 / 1024 < 1;
      if (!isIMAGE) {
        this.$message.error('上传文件只能是图片格式!')
        return;
      }
      if (!isLt1M) {
        this.$message.error('上传文件大小不能超过 1MB!')
        return;
      }
      this.uploadData = {image:file};
      let promise = new Promise((resolve) => {
          this.$nextTick(function () {
              resolve(true);
          });
      });
      return promise;
    },
    handleGallerySuccess(res, raw){
      if (res.code === 200) {
        this.pic_arr.push(res.data.id);
        this.galleryList.push({
          id:res.data.id,
          urls: res.data.domain+res.data.path.substr(1),
          url:raw.url
        });
      } else {
        this.$message({
          message: res.message,
          type: 'error'
        })
      }
    },
    handleRemove(file, fileList) {
      for (var i = 0; i < this.galleryList.length; i++) {
        if (this.galleryList[i].id === file.id) {
          this.galleryList.splice(i, 1)
        }
      }
    },
    addRow(){
      this.sku.push({})
    },
    onskuDel(index){
      this.sku.splice(index,1);
    },
    editorContent(val){
      this.prosdesc = val;
    },
    onSubmit(){
      let data = this.$route.params.data;
      if(data!=undefined){
        this.onEdit();
      }else{
        this.onAdd();
      }
    },
    onEdit(){
      this.$refs.upload.submit();
      let glist = [];
			this.galleryList.map((item)=>{
				glist.push(item.id)
			});
			let ids = glist.join(",");
      let pram = {
        product_id:this.queryForm.id,
        sku:this.sku,
        title:this.queryForm.title,
        category_id:this.queryForm.category_id_arr,
        product_type:this.queryForm.product_type,
        pic_map: ids.split(","),
        desc: this.prosdesc,
        growth: this.queryForm.growth,
        stock: this.queryForm.stock,
        buy_limit: this.queryForm.buy_limit,
        buy_over: this.queryForm.buy_over
      }
      editpro(pram).then((res)=>{
        if(res.data.code==200){
          this.$message({
            type: 'success',
            message: '成功'
          });
          this.$router.back();
        }
      })
    },
    onAdd(){
      this.$refs.upload.submit();
      const loading = this.$loading({
          lock: true,
          target: document.querySelector('.loading-area')
      });
      // console.log(this.sku);
      const obj = {
        sku: this.sku,
        title: this.queryForm.title,
        category_id: this.queryForm.category_id,
        pic_map: this.pic_arr,
        desc: this.prosdesc,
        growth: this.queryForm.growth,
        product_type: this.queryForm.product_type,
        stock: this.queryForm.stock,
        buy_limit: this.queryForm.buy_limit,
        buy_over: this.queryForm.buy_over
      }
      console.log('obj', obj);
      setTimeout(() => {
        addpro(obj).then(({data:res})=>{
          console.log(res);
          if (res.code === 401) {
            this.$message({
              message: res.message,
              type: 'error',
              duration: '2000'
            })
            return false
          }
          if (res.code === 200) {
            loading.close();
            this.$message({
              message: res.message,
              type: 'success',
              duration: '2000'
            })
            this.queryForm = {};
            this.sku = [];
            location.reload();
          }
        })
        loading.close();
      }, 3000)
    }
  },
  mounted(){
    this.init();
  },
  created() {
    this.getClasslist();
  },
};
</script>

<style lang="less" scoped>
.appwrapper{
    background:#ffffff;
    /deep/.ql-snow .ql-picker{
        height: auto;
    }
}
</style>
