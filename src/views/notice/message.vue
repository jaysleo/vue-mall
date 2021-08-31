<template>
    <div>
        <el-form :model="ruleForm" label-width="146px" class="demo-ruleForm">
            <el-form-item label="推送标题" :rules="{ required: true }">
                <el-input v-model="ruleForm.title" autocomplete="off" :autofocus="true" placeholder="请输入推送标题" style="width:500px"></el-input>
            </el-form-item>
            <el-form-item label="推送信息" :rules="{ required: true }">
                <div>
                    <editor :content="ruleForm.content" @editorContent="editorContent"></editor>
                </div>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm" style="width: 339px;height: 40px;background: #ff9d00;border-color:#ff9d00;">发布</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import { add_article,edit_article } from '@/api/article';
import Editor from "@/components/Editor";
export default {
    name:"pushmsg",
    components: {Editor},
    data(){
        return {
            ruleForm: {
                title:"",
                content: ''
            }
        }
    },
    methods: {
        init(){
            this.fetchData();
        },
        fetchData(){
            let data = this.$route.params.data;
            if(data!=undefined){
                this.ruleForm.title = data.title;
                this.ruleForm.content = data.content;
            }
        },
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
            if(this.ruleForm.title==""){
                this.$message({
                    type: 'error',
                    message: "请输入推送标题"
                });
                return false;
            }
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
            add_article(this.ruleForm.title,this.ruleForm.content,"notice").then((res)=>{
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
            edit_article(id,this.ruleForm.title,this.ruleForm.content,"notice").then((res)=>{
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
    },
    created(){
        this.init();
    }
}
</script>
<style lang="less" scoped></style>