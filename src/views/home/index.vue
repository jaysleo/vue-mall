<template>
  <el-container class="home-container">
    <el-aside width="284px">
      <img src="../../assets/img/logo.png" alt="" class="logo" style="width: 160px; height: 61px;margin-bottom:60px;">
      <el-menu text-color="#FFFFFF" active-text-color="#fff" :default-active="$route.path" :router="true" :unique-opened="true">
        <el-submenu index="293">
          <template slot="title">
            <i class="icon" style="margin-right: 10px;"><img src="../../assets/img/icon_home.png" /></i>
            <i class="icon_sel" style="margin-right: 10px;"><img src="../../assets/img/406.png" /></i>
            <span>首页后台</span>
          </template>
          <el-menu-item index="/category">
            <span slot="title">商品分类</span>
          </el-menu-item>
          <el-menu-item index="/product">
            <span slot="title">商品管理</span>
          </el-menu-item>
          <el-menu-item index="/banner">
            <span slot="title">轮播图列表</span>
          </el-menu-item>
          <el-menu-item index="/suggest">
            <span slot="title">意见反馈</span>
          </el-menu-item>
          <el-menu-item index="/withdrawal">
            <span slot="title">提现列表</span>
          </el-menu-item>
          <el-menu-item index="/service">
            <span slot="title">系统设置</span>
          </el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="icon" style="margin-right: 10px;"><img src="../../assets/img/656.png" /></i>
            <i class="icon_sel" style="margin-right: 10px;"><img src="../../assets/img/656s.png" /></i>
            <span>签约</span>
          </template>
          <el-menu-item index="/sign/shop">
            <span slot="title">申请长期合作商家列表</span>
          </el-menu-item>
          <!-- <el-menu-item index="/sign/welfare">
            <span slot="title">长期合作福利商品</span>
          </el-menu-item> -->
          <el-menu-item index="/sign/alisign">
            <span slot="title">支付宝预授权用户管理</span>
          </el-menu-item>
          <el-menu-item index="/sign/deposit">
            <span slot="title">商家交押金</span>
          </el-menu-item>
          <el-menu-item index="/sign/contract/message">
            <span slot="title">签约合同</span>
          </el-menu-item>
          <!-- <el-menu-item index="/sign/deposit/2">
            <span slot="title">未交押金人员</span>
          </el-menu-item> -->
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="icon" style="margin-right: 10px;"><img src="../../assets/img/453.png" /></i>
            <i class="icon_sel" style="margin-right: 10px;"><img src="../../assets/img/453s.png" /></i>
            <span>我的通知</span>
          </template>
          <el-menu-item index="/notice/message">
            <span slot="title">发布推送信息</span>
          </el-menu-item>
          <el-menu-item index="/notice">
            <span slot="title">历史推送</span>
          </el-menu-item>
      </el-submenu>
      <el-submenu index="4">
          <template slot="title">
            <i class="icon" style="margin-right: 10px;"><img src="../../assets/img/657.png" /></i>
            <i class="icon_sel" style="margin-right: 10px;"><img src="../../assets/img/657s.png" /></i>
            <span>我的用户订单</span>
          </template>
          <el-menu-item index="/Order/1">
            <span slot="title">订单列表</span>
          </el-menu-item>
          <el-menu-item index="/goodscommit">
            <span slot="title">商品评论</span>
          </el-menu-item>
          <el-menu-item index="/expressList">
            <span slot="title">快递列表</span>
          </el-menu-item>
      </el-submenu>
      <!-- <el-submenu index="5">
          <template slot="title">
            <i class="icon" style="margin-right: 10px;"><img src="../../assets/img/658.png" /></i>
            <i class="icon_sel" style="margin-right: 10px;"><img src="../../assets/img/658s.png" /></i>
            <span>我的合作商家</span>
          </template>
          <el-menu-item index="/shopAuthor/author">
            <span slot="title">授权额度</span>
          </el-menu-item>
          <el-menu-item index="/shopOrder/feedbacks">
            <span slot="title">商家管理</span>
          </el-menu-item>
      </el-submenu> -->
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <el-menu class="el-menus" mode="horizontal" active-text-color="#FF9D00" :default-active="$route.path" :router="true" @select="handleSelect" v-if="$route.meta.welfareShow">
          <el-menu-item index="/sign/welfare">商品列表</el-menu-item>
          <el-menu-item index="/sign/welfare/proadd">福利商品上架</el-menu-item>
          <el-menu-item index="/sign/welfare/integral">积分管理</el-menu-item>
          <el-menu-item index="/sign/welfare/exchange">兑换记录</el-menu-item>
        </el-menu>
        <el-menu class="el-menus" mode="horizontal" active-text-color="#FF9D00" :default-active="$route.path" :router="true" @select="handleSelect" v-if="$route.meta.contractShow">
          <el-menu-item index="/sign/contract/message">合同内容发布</el-menu-item>
          <el-menu-item index="/sign/contract">合同内容</el-menu-item>
        </el-menu>
        <el-menu class="el-menus" mode="horizontal" active-text-color="#FF9D00" :default-active="$route.path" :router="true" @select="handleSelect" v-if="$route.meta.orderShow">
          <el-menu-item index="/Order/1">待付款</el-menu-item>
          <el-menu-item index="/Order/2">待发货</el-menu-item>
          <el-menu-item index="/Order/3">待收货</el-menu-item>
          <el-menu-item index="/Order/4">已完成</el-menu-item>
          <el-menu-item index="/Order/5">已取消</el-menu-item>
          <el-menu-item index="/Order/7">待评价</el-menu-item>
        </el-menu>
        <el-menu class="el-menus" mode="horizontal" active-text-color="#FF9D00" :default-active="$route.path" :router="true" @select="handleSelect" v-if="$route.meta.authorShow">
          <el-menu-item index="/shopAuthor/author">授权额度调整</el-menu-item>
          <el-menu-item index="/shopAuthor/deposit">押金类型商家</el-menu-item>
        </el-menu>
        <el-menu class="el-menus" mode="horizontal" active-text-color="#FF9D00" :default-active="$route.path" :router="true" @select="handleSelect" v-if="$route.meta.shopShow">
          <el-menu-item index="/shopOrder/order">全部订单</el-menu-item>
          <el-menu-item index="/shopOrder/feedbacks">商家留言反馈</el-menu-item>
          <el-menu-item index="/shopOrder/gift">商品礼品赠送</el-menu-item>
          <el-menu-item index="/shopOrder/invite">邀请数据表</el-menu-item>
          <el-menu-item index="/shopOrder/feedback">意见反馈</el-menu-item>
          <el-menu-item index="/shopOrder/rechange">话费充值</el-menu-item>
        </el-menu>
        <div class="topbar_user">
          <el-dropdown trigger="click">
            <div class="el-dropdown-link">
              <el-avatar icon="el-icon-user-solid" style="font-size: 30px;width: 44px;height: 44px"></el-avatar>
              <div class="info">
                <span class="name">{{this.$store.state.UserList.username}}</span>
                <span class="change"><i class="el-icon-user" style="color:#FF9D00;margin-right:10px;"></i>切换账号</span>
              </div>
            </div>
            <el-dropdown-menu slot="dropdown" class="popper-dropdown-menu-user">
              <el-dropdown-item>
                <div @click="UserDetailsfrom">个人中心</div>
              </el-dropdown-item>
              <el-dropdown-item>
                <div @click="logout">退出</div>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-main>
        <transition name="breadcrumb">
        <router-view></router-view>
        </transition>
      </el-main>
    </el-container>
    <!--    用户资料E-->
    <el-dialog title="用户资料" :visible.sync="UserDetailsuser" width="30%">
      <el-card>
        <el-form :model="this.$store.state.UserList" label-width="150px" :label-position="labelPosition">
          <el-form-item label="用户权限" prop="admin_name" label-width="20%">
            <span style="width: 30%">{{this.$store.state.UserList.desc}}</span>
          </el-form-item>
          <el-form-item label="用户名称" prop="admin_name" label-width="20%">
            <span style="width: 30%">{{this.$store.state.UserList.username}}</span>
          </el-form-item>
          <el-form-item label="登录ip" prop="admin_name" label-width="20%">
            <span style="width: 30%">{{this.$store.state.UserList.login_ip}}</span>
          </el-form-item>
          <el-form-item label="最后登录时间" prop="admin_name" label-width="20%">
            <span style="width: 30%">{{this.$store.state.UserList.update_at}}</span>
          </el-form-item>
        </el-form>
      </el-card>
      <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="UserDetailsuser = false">确 定</el-button>
  </span>
    </el-dialog>
  </el-container>
</template>

<script>
export default {
  name: "index",
  data(){
    return{
      UserDetailsuser:false,
      labelPosition:'left',
      activeIndex:1,
      orderShow:false,
      authorShow:false,
      shopShow:false,
      query:{}
    }
  },
  methods:{
    logout () {
      window.sessionStorage.clear();
      this.$router.push('/login');
      window.location.reload();
    },
    //  用户资料对话框
    UserDetailsfrom () {
      this.UserDetailsuser = true;
    },
    handleSelect(key, keyPath) {
      console.log(keyPath,key);
    }
  },
};
</script>

<style lang="less" scoped>
body {
  min-width: 1800px;
  overflow-x: scroll;
}
.el-main{
  background-color:#EEEEEE;
  //overflow: hidden;
}
.el-container {
  height: 100%;
}
.el-header {
  position: relative;
  background-color: #FFFFFF;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  font-size: 25px;
  .topbar_user{
    position: absolute;
    right: 80px;
		cursor: pointer;
		.el-dropdown-link {
			display: flex;
      .info{
        display: flex;
        flex-direction: column;
        margin-left: 20px;
        .name{
            margin-left: 0;
            font-size: 15px;
            color: #000000;
        }
        .change{
            margin-left: 0;
            color:#9B9B9B;
            cursor: pointer;
        }
      }
		}
		.el-icon-arrow-down{
			margin-left: 10px;
		}
	}
}
.el-aside{
  background: linear-gradient(#FF9D00, #FFBA4B);
  text-align: center;
  .logo{
    margin-top: 55px;
    height: 60px;
  }
  .el-menu{
    background: none;
    border-right: none;
    overflow: hidden;
    .el-menu-item i {
      //color: rgb(162, 184, 208);
      margin-right:  10px;
    }
  }
}
</style>
<style lang="less">
.el-menus{
  padding: 0 20px;
  width: 100%;
}
.el-menus>.el-menu-item{
  margin:0 20px;
}
.el-menus>.el-menu-item.is-active{
  border:0;
  position: relative;
}
.el-menus>.el-menu-item.is-active::after{
  content: "";
  position: absolute;
  bottom:0;
  left:50%;
  width: 68px;
  height: 3px;
  background: #ff9d00;
  margin-left: -34px;
}
.el-menu-item.is-active{
    background-color:none!important;
    font-weight: bold;
}
.el-submenu{
  .el-menu,.el-menu-item:focus, .el-menu-item:hover{
    background:none;
  }
    .el-menu-item{
      font-size: 16px;
      color:#fff;
      text-align: left;
      padding-left: 82px!important;
    }
    .el-submenu__title{
      font-size: 16px;
      text-align: left;
      padding-left: 50px !important;
    }
    .el-submenu__title i{
      color:#fff;
    }
    .el-submenu__title .icon_sel{
      display: none;
    }
    .el-submenu__title:hover{
      background:#fff;
      span,i{
        color:#ff9d00 !important;
      }
      .icon{display: none;}
      .icon_sel{display: inline-block;}
    }
    &.is-opened{
      .el-submenu__title{
        background:#fff;
        span{
          font-weight: bold;
        }
        span,i{
          color:#ff9d00 !important;
        }
        .icon{display: none;}
        .icon_sel{display: inline-block;}
      }
    }
}
</style>