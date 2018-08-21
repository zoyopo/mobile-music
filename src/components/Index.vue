<template>
    <div class="index">

        <drawer width="340px;" :show.sync="drawerVisibility" :show-mode="showModeValue" :placement="showPlacementValue" :drawer-style="{'background-color':'#fff', width: '340px'}">

            <div slot="drawer" class="menu-container">
                <!-- 菜单内容 -->
                <Menu></Menu>
            </div>
            <div class="main">
                <x-header>
                    <div slot="overwrite-left">
                        <i class="fa fa-reorder" @click="showDrawer"></i>
                    </div>
                    <!--title区域-->
                    <span class="title-icon">
                        <i class="fa fa-play-circle-o"></i>
                        <i class="fa fa-play-circle-o"></i>
                        <i class="fa fa-play-circle-o"></i>
                    </span>
                    <div slot="right" class="right">
                        <i class="fa fa-search"></i>
                    </div>
                </x-header>
                <tab>
                    <tab-item selected @on-item-click="onItemClick">推荐</tab-item>
                    <tab-item @on-item-click="onItemClick">我的</tab-item>
                    <tab-item @on-item-click="onItemClick">电台</tab-item>
                </tab>
                <router-view></router-view>
            </div>
        </drawer>

    </div>
</template>

<script>
import { Drawer } from "vux";
import { XHeader } from "vux";
import { Tab, TabItem } from "vux";
import Menu from "components/Index/Menu";

export default {
  name: "index",
  components: {
    Drawer,
    XHeader,
    Menu,
    Tab,
    TabItem
  },
  data() {
    return {
      drawerVisibility: false,
      // drawerVisibility: false,
      showMode: "push",
      showModeValue: "push",
      showPlacement: "left",
      showPlacementValue: "left"
    };
  },
  methods: {
    showDrawer() {
      console.log("click show drawer");
      this.drawerVisibility = true;
    },
    onItemClick(index) {
      console.log("on item click:", index);
    }
  }
};
</script>

<style lang="scss">
.vux-header{
  background: #9bca4f !important;
}

.index {
  height: 100%;
  .main{
    height: 100%;
  }
  .fa-reorder {
    font-size: 2rem;
    vertical-align: middle;
  }
  .right {
    font-size: 2rem;
    // vertical-align: middle;
  }
  .vux-header-right {
    top: 7px !important;
  }
  .vux-drawer {
    height: 100% !important;
    overflow-x: hidden !important;
  }
  .vux-header-left {
    top: 7px !important;
  }
}

.menu-container{
  height: 100%;
}

.title-icon {
  margin-left: -30px; //用负外边距来把第一个padiding fix
  i {
    font-size: 2rem;
    vertical-align: middle;
    padding-left: 30px;
  }
}
</style>
