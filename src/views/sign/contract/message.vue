<template>
    <div>
        <el-form :model="ruleForm" ref="ruleForm" class="demo-ruleForm">
            <div style="width:100%;height:30px"></div>
            <editor :content="ruleForm.content" @editorContent="editorContent"></editor>
            <el-form-item>
                <el-button type="primary" @click="submitForm" style="width: 100%;height: 40px;background: #ff9d00;border-color:#ff9d00;margin-top:20px;">发布</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import { add_article,edit_article } from '@/api/article';
import Editor from "@/components/Editor";
export default {
    name:"contractmsg",
    components: {Editor},
    data(){
        return {
            ruleForm: {
                title:"合同",
                content: ""
            }
        }
    },
    methods: {
        editorContent(val){
            this.ruleForm.content = val;
        },
        submitForm(){
            let data = this.$route.params.data;
            if(data!=undefined){
                this.onEdit(data.id);
            }else{
                this.onAdd();
            }
        },
        invilad(){
            if(this.ruleForm.content==""){
                this.$message({
                    type: 'error',
                    message: "请输入内容"
                });
                return false;
            }
        },
        onAdd() {
            this.invilad();
            add_article(this.ruleForm.title,this.ruleForm.content,"contract").then((res)=>{
                if(res.data.code==200){
                    this.$message({
                        type: 'success',
                        message: res.data.message
                    });
                    location.reload();
                }else{
                    this.$message({
                        type: 'info',
                        message: res.data.message
                    });
                }
            })
        },
        onEdit(id) {
            this.invilad();
            edit_article(id,this.ruleForm.title,this.ruleForm.content,"contract").then((res)=>{
                if(res.data.code==200){
                    this.$message({
                        type: 'success',
                        message: res.data.message
                    });
                    this.$router.back();
                }else{
                    this.$message({
                        type: 'info',
                        message: res.data.message
                    });
                }
            })
        }
    }
}
</script>
<style lang="less" scoped>
.demo-ruleForm{
    width: 1030px;
}
</style>