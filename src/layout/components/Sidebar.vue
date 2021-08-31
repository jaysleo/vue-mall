<template>
    <el-aside width="284px">
      <div class="logo">
        <img src="../../assets/img/logo.png" alt="" style="width: 160px; height: 61px;">
      </div>
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
</template>
<style lang="less">
.el-aside{
  background: linear-gradient(#FF9D00, #FFBA4B);
  text-align: center;
  .logo{
    margin-top: 55px;
    margin-bottom:60px;
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