<template>
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
        <el-dialog title="用户资料" :visible.sync="UserDetailsuser" width="30%">
          <el-card>
          <el-form :model="this.$store.state.UserList" label-width="150px" label-position="left">
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
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="UserDetailsuser = false">确 定</el-button>
          </div>
      </el-dialog>
    </el-header>
</template>

<script>
export default {
  name: "index",
  data(){
    return{
      UserDetailsuser:false,
      activeIndex:1
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

<style lang="less">
.el-header {
  position: relative;
  background-color: #FFFFFF;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  font-size: 25px;
  border-bottom: 1px solid #FFFFFF;
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
</style>