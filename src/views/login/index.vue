<template>
  <div id="login">
    <div class="container">
      <img class="bacImage" src="../../assets/img/loginbg.png" alt="" />
      <img class="leftImg" src="../../assets/img/icon1.png" alt="" />
      <div class="loginBox">
        <div class="tit1">批发商城管理系统</div>
        <div class="tit2">欢迎你回来~</div>
        <div class="loginBox2">
          <el-form
                ref="loginForm"
                label-position="left" status-icon label-width="77px" class="demo-ruleForm">
            <el-form-item prop="username">
              <div class="userInp">账号</div>
              <el-input
                v-model="loginForm.username"
                class="inputname"
                prefix-icon="iconfont icon-user"
                tabindex="1"
                type="text"
                autocomplete="on"
                placeholder="请输入账号"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <div class="pasInp">密码</div>
              <el-input
                class="inputname"
                prefix-icon="iconfont icon-3702mima"
                tabindex="2"
                autocomplete="on"
                placeholder="请输入密码"
                v-model="loginForm.password"
                :type="passwordType"
                :key="passwordType"
                @keyup.enter.native="handleLogin"
                show-password
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item>
              <div class="footer">
                <div class="wjmm">忘记密码</div>
                <div class="zczh">注册账号</div>
              </div>
            </el-form-item>
          </el-form>
          <el-button
            @click.native.prevent="handleLogin"
            class="loginBtn"
            type="danger"
            circle
            icon="el-icon-arrow-right"
          ></el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/login'
  export default {
    name: 'login',
    data() {
      return {
        passwordType: 'password',
        loginForm: {
          username: '',
          password: ''
        },
        // loginFormRules: {
        //   username: [
        //     { required: true, message: '请输入登录名', trigger: 'blur' },
        //     {
        //       min: 3,
        //       max: 10,
        //       message: '登录名长度在 3 到 10 个字符',
        //       trigger: 'blur'
        //     }
        //   ],
        //   password: [
        //     { required: true, message: '请输入密码', trigger: 'blur' },
        //     {
        //       min: 6,
        //       max: 15,
        //       message: '密码长度在 6 到 15 个字符',
        //       trigger: 'blur'
        //     }
        //   ]
        // }
      }
    },
    created() {

    },
    methods: {
      handleLogin(){
        login(this.loginForm).then(({data:res})=>{
          if (res.code === 401) {
            this.$message({
              message: res.message,
              type: 'error',
              duration: '2000'
            })
            return false
          }
          window.sessionStorage.setItem('token', res.data.token);
          this.$store.commit('setUserList',res.data.info);
          // 保存token
          // 导航至/home
          this.$router.push('/home');
        }).catch(error => {
          console.log(error);
        })
      }
    }
  }
</script>

<style lang="less" scoped>
#login {
  width: 100%;
  height: 100vh;
  background-color: #fff;
  .container {
    position: relative;
    width: 100%;
    height: 100%;
    .bacImage {
      width: 100%;
      height: 100%;
      opacity: 1;
    }
    .leftImg {
      position: absolute;
      top: 27%;
      left: 13%;
      width: 37%;
      height: 46%;
    }
    .loginBox {
      position: absolute;
      top: 0;
      right: 13%;
      // border: 1px solid red;
      width: 31%;
      height: 100%;
      .tit1 {
        position: absolute;
        top: 16%;
        width: 100%;
        opacity: 1;
        font-size: 55px;
        font-family: PingFang SC, PingFang SC-Bold;
        font-weight: 700;
        text-align: center;
        color: #FF9D00;
      }
      .tit2 {
        position: absolute;
        width: 100%;
        top: 24%;
        opacity: 1;
        font-size: 18px;
        font-family: PingFang SC, PingFang SC-Regular;
        font-weight: 400;
        text-align: center;
        color: #c2c2c2;
      }
      .loginBox2 {
        position: absolute;
        width: 100%;
        height: 35%;
        top: 31%;
        height: 373px;
        opacity: 1;
        background: #ffffff;
        border-radius: 20px;
        box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.1);
        .demo-ruleForm {
          margin-top: 50px;
          /deep/ .el-form-item__content {
            margin-left: 13% !important;
          }
          /deep/ .el-input {
            width: 80%;
            background: #eeeeee;
            box-shadow: 0px 3px 6px 0px rgba(0,0,0,0.10);
          }
          .userInp {
            opacity: 1;
            font-size: 20px;
            font-family: PingFang SC, PingFang SC-Regular;
            font-weight: 400;
            color: #FF9D00;
          }
          .pasInp {
            opacity: 1;
            font-size: 20px;
            font-family: PingFang SC, PingFang SC-Regular;
            font-weight: 400;
            color: #c2c2c2;
          }
          .footer {
            width: 80%;
            display: flex;
            justify-content: space-between;
          }
          .wjmm {
            opacity: 1;
            font-size: 16px;
            font-family: PingFang SC, PingFang SC-Regular;
            font-weight: 400;
            text-align: center;
            color: #FF9D00;
          }
          .zczh {
            opacity: 1;
            font-size: 16px;
            font-family: PingFang SC, PingFang SC-Regular;
            font-weight: 400;
            text-align: center;
            color: #808080;
          }
        }
        .loginBtn {
          position: absolute;
          top: 108%;
          left: 50%;
          transform: translateX(-50%);
          background: #FF9D00;
          border-color:#FF9D00;
        }
      }
    }
  }
}
  .login-form-layout {
    position: absolute;
    left: 0;
    right: 0;
    width: 594px;
  }

  .login-title {
    text-align: center;
    font-size: 55px;
    color:#FF9D00;
  }
  .login-subtit{
    text-align: center;
    font-size: 18px;
    color:#C2C2C2;
    margin-top:10px;
  }
  .cardform{
    width: 594px;
    height: 373px;
    background: #ffffff;
    border-radius: 20px;
    box-shadow: 0px 3px 6px 0px rgba(0,0,0,0.10);
  }
  .cardform .el-form{
    padding:50px 77px 0;
  }
  .login-center-layout {
    max-width: 100%;
    max-height: 100%;
    /* background:url('../../assets/images/loginbg.png') no-repeat; */
  }
  .loginbg-icon{
    width:711px;
    height: 498px;
    /* background:url('../../assets/images/loginbg-icon.png') no-repeat; */
    position: absolute;
    top:50%;
    left:258px;
    margin-top:-249px;
  }
</style>
