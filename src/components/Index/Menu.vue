<template>
  <div class="menu">
    <div class="menu-top">
      <img id='menu-top-pic' v-lazy="this.userInfo.profile.backgroundUrl" alt="">
      <img id="menu-top-avatar" v-lazy="this.userInfo.profile.avatarUrl" alt="">
      <span id="menu-top-nickname">
        <strong>{{'欢迎你~'+this.userInfo.profile.nickname}}</strong>
      </span>
    </div>
    <group style="margin-top: -19px;">
      <cell title="我的消息" value=""></cell>
      <cell title="会员中心" value=""></cell>
      <cell title="商城" value=""></cell>
      <cell title="在线听歌免流量" value=""></cell>
    </group>
    <group>
      <cell title="我的消息" value=""></cell>
      <cell title="会员中心" value=""></cell>
      <cell title="商城" value=""></cell>
      <cell title="在线听歌免流量" value=""></cell>
    </group>
    <group>
      <cell title="我的消息" value=""></cell>
      <cell title="会员中心" value=""></cell>
      <cell title="商城" value=""></cell>
      <cell title="在线听歌免流量" value=""></cell>
    </group>
    <div class="menu-bottom">
      <!-- <div class="menu-bottom-item">夜间模式</div> -->
      <!-- <div class="menu-bottom-item">设置</div> -->
      <div class="menu-bottom-item">退出</div>
    </div>
  </div>
</template>

<script>
import { Cell, Group } from "vux";
import { mapGetters } from "vuex";
//const topPic = require("../../assets/logo.png");
export default {
  name: "Menu",
  components: {
    Cell,
    Group
  },
  data() {
    return {
      topPic: topPic
    };
  },
  computed: {
    ...mapGetters(["userInfo"])
  }
};
</script>

<style lang="scss" scoped>
#menu-top-pic {
  width: 100%;
}
.menu {
  height: calc(100% - 51px);
  overflow: auto;
  .menu-top {
    position: relative;
    height: 30%;
    overflow: hidden;
    #menu-top-avatar {
      position: absolute;
      width: 20%;
      border-radius: 50%;
      top: 32%;
      left: 1rem;
    }
    #menu-top-nickname {
      color: #fff;
      background: #ddd;
      width: 55%;
      text-align: center;
      position: absolute;
      top: 81%;
      left: 1rem;
    }
  }
  .menu-bottom {
    position: fixed;
    bottom: 0;
    display: flex;
    height: 50px;
    line-height: 50px;
    border-top: solid 1px #ddd;
    width: 100%;
    .menu-bottom-item {
      text-align: center;
      flex: 1;
    }
  }
}
</style>

