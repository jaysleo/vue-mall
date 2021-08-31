<template>
<div>
  <el-card style="margin-bottom: 10px">
      <div>
        <el-button style="color: #FFF;background-color: #ff9d00;border-color: #ff9d00;" size="mini" icon="el-icon-plus" @click="AqueryForm">新增分类</el-button>
      </div>
  </el-card>
  <!-- <tree-table :data="queryForm" :selection-type="false" :columns="columns" :show-index="true" :expand-type="false" index-text="#" border>
    <template slot="caozuo" slot-scope="scope">
      <el-button type="success" size="mini" @click="EditqueryForm(scope.row)" icon="el-icon-edit" style="background:#ff9d00;border-color:#ff9d00;">修改</el-button>
      <el-button type="danger" size="mini" @click="DeletequeryForm(scope.row, $event)" icon="el-icon-delete">删除</el-button>
    </template>
  </tree-table> -->
  <el-table :data="queryForm" row-key="category_id" :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
    <el-table-column label="ID" prop="category_id"></el-table-column>
    <el-table-column label="分类名称">
        <template slot-scope="scope">
          {{scope.row.title}}
        </template>
    </el-table-column>
    <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="success" size="mini" @click="EditqueryForm(scope.row)" icon="el-icon-edit" style="background:#ff9d00;border-color:#ff9d00;">修改</el-button>
          <el-button type="danger" size="mini" @click="DeletequeryForm(scope.row, $event)" icon="el-icon-delete">删除</el-button>
        </template>
    </el-table-column>
  </el-table>
  <el-dialog title="添加分类" :visible.sync="AdddialogVisible" width="30%">
    <el-form>
      <el-form-item label="父级分类" prop="userkatekettys" label-width="20%">
        <el-cascader
          placeholder="顶级菜单"
          style="width: 50%"
          v-model="addquery.id"
          :options="query"
          :props="queryprop"
          @change="handlechangeroles" ref="cascaders" clearable
        >
        </el-cascader>
      </el-form-item>
      <el-form-item label="分类名称" prop="分类名称" label-width="20%">
        <el-input v-model="addquery.title" style="width: 50%"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
    <el-button @click="canceladd()">取 消</el-button>
    <el-button type="primary" @click="AddOver">确 定</el-button>
  </span>
  </el-dialog>
  <el-dialog title="修改分类" :visible.sync="EditdialogVisible" width="30%">
    <el-form>
      <el-form-item label="父级分类" prop="userkatekettys" label-width="20%">
        <el-cascader
          placeholder="顶级菜单"
          style="width: 50%"
          v-model="Editquerty.id"
          :options="query"
          :props="queryprop"
          @change="handleChange" ref="cascaders"
        >
        </el-cascader>
      </el-form-item>
      <el-form-item label="分类名称" prop="分类名称" label-width="20%">
        <el-input v-model="Editquerty.title" style="width: 50%"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
    <el-button @click="EditdialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="EditOver">确 定</el-button>
  </span>
  </el-dialog>
</div>
</template>

<script>
import { classList, Addcategory,EditClassList, deleteClassList } from '@/api/classlist'
export default {
  name: "category",
  data(){
    return{
        queryForm:[],
        columns: [
        {
          label: '分类id',
          prop: 'category_id'
        },
        {
          label: '分类名称',
          prop: 'title'
        },
        {
          label: '操作',
          type: 'template',
          template: 'caozuo'
        }
      ],
      AdddialogVisible:false,
      EditdialogVisible:false,
      queryprop: {
        value: 'category_id',
        label: 'title',
        children: 'children',
        expandTrigger:"hover",
        checkStrictly: true
      },
      addquery:{
        id:"",
        pid:'',
        title:''
      },
      Editquerty:{
        id:"",
        pid:'',
        title:''
      },
      EditID: '',
      query:[],
      querys: [
        {
          id: 0,
          title: '顶级菜单',
          pid: -999,
          children: []
        }
      ],
      isResouceShow: 1,
    }
  },
  methods:{
    getClasslist(){
      classList().then(({data:res})=>{
        console.log('res', res);
        this.queryForm = res.data;
        // this.query[0].children = this.queryForm
        this.query = res.data;
      })
    },
    EditqueryForm(row){
      console.log('row', row);
      this.EditID = row.category_id;
      this.EditdialogVisible = true;
      this.Editquerty = row;
      this.Editquerty.id = this.EditID;
    },
    EditOver(){
      const obj = {}
      obj.category_id = this.EditID;
      obj.pid = this.Editquerty.pid;
      obj.title = this.Editquerty.title;
      EditClassList(obj).then(({data:res})=>{
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
          this.$message({
            message: res.message,
            type: 'success',
            duration: '2000'
          })
          this.EditdialogVisible = false
          this.getClasslist()
        }
      })
    },
    // 新增
    AqueryForm () {
      this.AdddialogVisible = true;
      this.addquery = {id:"",pid:'',title:''};
    },
    canceladd(){
      this.addquery = {}
      this.getClasslist()
    },
    AddOver(){
      const obj = {}
      obj.pid = this.addquery.pid;
      obj.title = this.addquery.title;
      Addcategory(obj).then(({data:res})=>{
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
          this.$message({
            message: res.message,
            type: 'success',
            duration: '2000'
          })
          this.AdddialogVisible = false
          this.getClasslist()
        }

      })
    },
    handlechangeroles (val) {
      if(val.length==0){
        this.addquery.pid = 0;
      }else{
        this.addquery.id = val[val.length - 1];
        this.addquery.pid = val[0];
      }
      console.log(this.addquery.pid)
      this.$refs.cascaders.dropDownVisible = false;
      // if (val.length === 3) {
      //   this.userkatekettys = []
      //   this.$message.error('请选择一二级分类')
      // }
    },
    handleChange(val){
      this.Editquerty.id = val[val.length - 1];
      this.Editquerty.pid = val[0];
      this.$refs.cascaders.toggleDropDownVisible();
    },
    DeletequeryForm(row){
      console.log(row);
      const obj = {}
      obj.category_id = row.category_id
      deleteClassList(obj).then(({data:res})=>{
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
          this.$message({
            message: res.message,
            type: 'success',
            duration: '2000'
          })
          this.getClasslist()
        }
      })
    }
  },
  created() {
    this.getClasslist()
  }
};
</script>

<style scoped>

</style>
