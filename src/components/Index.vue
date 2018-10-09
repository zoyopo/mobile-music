<template>
  <div class="index">

    <drawer width="340px;" :show.sync="drawerVisibility" :show-mode="showModeValue" :placement="showPlacementValue" :drawer-style="{'background-color':'#fff', width: '340px'}">

      <div slot="drawer" class="menu-container">
        <!-- 菜单内容 -->
        <Menu></Menu>
      </div>
      <div class="main">        
        <x-header @on-click-title="searchOnClick">
          <div slot="overwrite-left">
            <i :class="headerIcon" @click="showDrawer"></i>
          </div>
          <!--title区域-->
          <span class="title-icon">
            <!-- <i class="iconfont icon-yinle"></i> -->
            <i class="iconfont icon-music"></i>
            <i class="iconfont icon-video"></i>
          </span>
          <div slot="right" class="right">
            <i class="fa fa-search" @click.stop="searchOnClick"></i>
          </div>
        </x-header>
        <tab>
          <tab-item selected @on-item-click="onItemClick">推荐</tab-item>
          <tab-item @on-item-click="onItemClick">朋友</tab-item>
          <tab-item @on-item-click="onItemClick">电台</tab-item>
        </tab>
        <router-view></router-view>
      </div>
    </drawer>

  </div>
</template>

<script>
import { Drawer, XHeader, Tab, TabItem } from "vux";

import Menu from "components/Index/Menu";
import { mapGetters, mapMutations } from "vuex";

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
  activated() {
    // 如果展开则关闭drawer
    if (this.drawerVisibility) {
      this.drawerVisibility = false;
    }
  },
  methods: {
    showDrawer() {
      //console.log("click show drawer");
      if (Object.keys(this.userInfo).length > 0) {
        this.drawerVisibility = true;
        // this.setDrawerVis()
      } else {
        //todo login...
        this.$router.push("/login");
      }
    },
    onItemClick(index) {
      console.log("on item click:", index);
    },
    searchOnClick() {
      console.log("search icon clicked");
     // this.searchIptVis = true;
     this.$router.push('/search')
    },
    ...mapMutations({
      setDrawerVis: "SET_DRAWER_VIS"
    })
  },
  computed: {
    headerIcon() {
      const hasLogin = Object.keys(this.userInfo).length > 0;
      return hasLogin ? "fa fa-reorder" : "fa fa-user-o";
    },

    ...mapGetters(["userInfo"])
  },
  watch: {
    drawerVisibility(val) {
      this.setDrawerVis(val);
    }
  }
};
</script>

<style lang="scss">
@import "../assets/recommend/iconfont.scss";
.vux-header {
  background: #9bca4f !important;
}

.index {
  height: 100%;
  .main {
    height: 100%;
  }
  .fa-reorder {
    font-size: 2rem;
    vertical-align: middle;
  }
  .fa-user-o {
    font-size: 2rem;
    vertical-align: middle;
    color: #ddd;
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

.menu-container {
  height: 100%;
}

.title-icon {
  margin-left: -30px; //用负外边距来把第一个padiding fix
  i {
    font-size: 2rem;
    vertical-align: middle;
    padding-left: 30px;
    font-size: 2rem;
  }
}

</style>
