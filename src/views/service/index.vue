<template>
    <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
            <el-form-item label="手机号联系方式" prop="web_mobile">
                <el-input v-model="ruleForm.web_mobile" autocomplete="off" :autofocus="true" placeholder="请输入手机号" style="width:300px"></el-input>
            </el-form-item>
            <el-form-item label="微信联系方式" prop="wechat_account">
                <el-input v-model="ruleForm.wechat_account" autocomplete="off" :autofocus="true" placeholder="请输入微信号" style="width:300px"></el-input>
            </el-form-item>
            <el-form-item label="商家押金" prop="vip_money">
                <el-input v-model="ruleForm.vip_money" autocomplete="off" :autofocus="true" placeholder="请输入微信号" style="width:300px"></el-input>元
            </el-form-item>
            <el-form-item label="邀请人奖励" prop="invite_money">
                <el-input v-model="ruleForm.invite_money" autocomplete="off" :autofocus="true" placeholder="请输入微信号" style="width:300px"></el-input>元
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm" style="width: 200px;background: #ff9d00;border-color:#ff9d00;">发布</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import { getwebconfig,editWebconfig } from '@/api/article';
export default {
    name:"service",
    data(){
        return {
            ruleForm: {
                web_mobile:"",
                wechat_account: '',
                vip_money:"",
                invite_money:""
            },
            rules: {
                web_mobile: [
                    { required: true, message: '请输入手机号码', trigger: 'blur' }
                ],
                wechat_account: [
                    { required: true, message: '请输入微信号', trigger: 'blur' }
                ],
                vip_money: [
                    { required: true, message: '请输入商家押金', trigger: 'blur' }
                ],
                invite_money: [
                    { required: true, message: '请输入邀请人奖励', trigger: 'blur' }
                ]
            },
        }
    },
    methods: {
        init(){
            this.fetchData();
        },
        fetchData(){
            getwebconfig().then((res)=>{
                if(res.data.code==200){
                    res.data.data.forEach(item => {
                        if(item.only_tag=="web_mobile"){
                            this.ruleForm.web_mobile = item.value;
                        }
                        if(item.only_tag=="wechat_account"){
                            this.ruleForm.wechat_account = item.value;
                        }
                        if(item.only_tag=="vip_money"){
                            this.ruleForm.vip_money = item.value;
                        }
                        if(item.only_tag=="invite_money"){
                            this.ruleForm.invite_money = item.value;
                        }
                    });
                }
            })
        },
        submitForm(){
            this.$refs["ruleForm"].validate((valid) => {
                if (valid) {
                    let pram = [
                        {only_tag:"web_mobile",name:"手机号联系方式",value:this.ruleForm.web_mobile},
                        {only_tag:"wechat_account",name:"微信联系方式",value:this.ruleForm.wechat_account},
                        {only_tag:"vip_money",name:"商家押金",value:this.ruleForm.vip_money},
                        {only_tag:"invite_money",name:"邀请人奖励",value:this.ruleForm.invite_money}
                    ]
                    if(this.ruleForm.web_mobile){
                        this.onEdit(pram[0]);
                    }
                    if(this.ruleForm.wechat_account){
                        this.onEdit(pram[1]);
                    }
                    if(this.ruleForm.vip_money){
                        this.onEdit(pram[2]);
                    }
                    if(this.ruleForm.invite_money){
                        this.onEdit(pram[3]);
                    }
                }else{
                    return false;
                }
            })
        },
        onEdit(pram){
            editWebconfig(pram).then((res)=>{
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
        }
    },
    created(){
        this.init();
    }
}
</script>