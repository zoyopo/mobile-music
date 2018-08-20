<template>
    <div class="menu">
        <div><img id='menu-top-pic' v-lazy="topPic" alt=""></div>
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
        <group>
            <cell title="我的消息" value=""></cell>
            <cell title="会员中心" value=""></cell>
            <cell title="商城" value=""></cell>
            <cell title="在线听歌免流量" value=""></cell>
        </group>
        <div class="menu-bottom">
            <div class="menu-bottom-item">夜间模式</div>
            <div class="menu-bottom-item">设置</div>
            <div class="menu-bottom-item">退出</div>
        </div>
    </div>
</template>

<script>
import { Cell } from "vux";
import { Group } from "vux";
const topPic = require("../../assets/logo.png");
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
    padding-left: 6rem;
    &:first-child {
      padding-left: 0;
    }
  }
}
</style>

