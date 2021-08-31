<template>
    <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="140px" class="demo-ruleForm">
            <el-form-item label="积分标题" prop="name">
                <el-input v-model="ruleForm.name" style="width:618px;"></el-input>
            </el-form-item>
            <el-form-item label="积 分" prop="name">
                <el-input v-model="ruleForm.scode" style="width:618px;"></el-input>
            </el-form-item>
            <el-form-item label="价 格" prop="name">
                <el-input v-model="ruleForm.price" style="width:618px;"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')" style="width: 618px;height: 49px;background: #ff9d00;border-color:#ff9d00;">确定</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
  export default {
      name:"integral",
    data() {
      return {
        ruleForm: {
          name: '',
          scode: '',
          price: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入积分标题', trigger: 'blur' }
          ],
          scode: [
            { required: true, message: '请输入积分', trigger: 'blur' }
          ],
          price: [
            { required: true, message: '请输入价格', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  }
</script>