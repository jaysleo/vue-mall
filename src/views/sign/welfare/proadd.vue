<template>
    <div>
        <el-form ref="form" :model="sizeForm" label-width="100px">
            <el-form-item label="商品标题" :rules="{required: true}">
                <el-input v-model="sizeForm.name" style="width:618px;"></el-input>
            </el-form-item>
            <el-form-item label="主 图" :rules="{required: true}">
                <el-upload
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="sizeForm.imageUrl" :src="sizeForm.imageUrl" class="avatar">
                    <i v-else class="el-icon-picture avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="数 量" :rules="{required: true}">
                <el-input v-model="sizeForm.num" style="width:618px;"></el-input>
            </el-form-item>
            <el-form-item label="限购数量" :rules="{required: true}">
                <el-input v-model="sizeForm.xgnum" style="width:618px;"></el-input>
            </el-form-item>
            <el-form-item label="剩余数量" :rules="{required: true}">
                <el-input v-model="sizeForm.synum" style="width:618px;"></el-input>
            </el-form-item>
            <el-form-item label="积分兑换" :rules="{required: true}">
                <el-input v-model="sizeForm.scode" style="width:618px;"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit" style="width:618px;background:#ff9d00;border-color:#ff9d00;">发布</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
  export default {
    data() {
      return {
        sizeForm: {
          name: '',
          imageUrl: '',
          num:"",
          xgnum:"",
          synum:"",
          scode:""
        }
      }
    },
    methods: {
        handleAvatarSuccess(res, file) {
            this.sizeForm.imageUrl = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },
        onSubmit() {
            console.log('submit!');
        }
    }
  }
</script>
<style lang="less">
.avatar-uploader .el-upload {
    width: 199px;
    height: 114px;
    background: #ffffff;
    border-radius: 10px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #ff9d00;
    width: 114px;
    height: 114px;
    line-height: 114px;
    text-align: center;
  }
  .avatar {
    width: 114px;
    height: 114px;
    display: block;
  }
</style>