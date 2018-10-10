<template>
  <div id="app">
    <!-- <Skeleton v-if="!requestEnd"></Skeleton>
    <div v-else> -->
    <transition name="slide" enter-active-class="FIRST_SLIDE">
      <keep-alive>

        <router-view></router-view>

      </keep-alive>
    </transition>
    <Loading></Loading>
    <normal-player class="normal-player" :currentTime="currentTime"></normal-player>
    <mini-player class="mini-player" ref="miniPlayer"></mini-player>
  </div>
  <!-- </div> -->
</template>

<script>
import MiniPlayer from "components/Player/MiniPlayer";
import NormalPlayer from "components/Player/NormalPlayer";
import Loading from "base/Loading";
import { mapMutations, mapGetters } from "vuex";
// import {commonMixin} from './mixin/common'
export default {
  name: "app",
  components: {
    MiniPlayer,
    NormalPlayer,
    Loading
  },
  //mixins: [commonMixin],
  created() {},
  methods: {
    // refreshRem() {
    //   debugger
    //   let docEl = window.document.documentElement;
    //   let width = docEl.getBoundingClientRect().width;
    //   let rem = width / 10;
    //   docEl.style.fontSize = rem + "px";
    // }
  },
  data() {
    return {
      FIRST_SLIDE: ""
    };
  },
  //2369438970
  methods: {
    ...mapMutations({
      setCurrentSong: "SET_CURRENT_SONG"
    })
  },
  computed: {
    ...mapGetters(["playList", "requestEnd"]),
    currentTime() {
      if (this.playList.length > 0) {
        return this.$refs.miniPlayer.currentTime;
      } else {
      }
    }
  },
  mounted() {
    /*
     *  解决首次加载会出现loading时主页面划过的情况
     *  添加className
     */
    this.FIRST_SLIDE = 'slide-enter-active'
  }
};
</script>

<style lang="less">
@import "~vux/src/styles/reset.less";

body {
  background-color: #fbf9fe;
}
</style>

<style lang="scss">
@import "common/sass/font-awesome.scss";
html {
  height: 100%;
  // font-size: 62.5%;
  body {
    height: 100%;
    #app {
      height: 100%;
      .mini-player {
        position: absolute;
        bottom: 0;
      }
      .normal-player {
        position: fixed;
        bottom: 0;
        height: 100%;
      }
    }
  }
}
.slide-enter-active,
.slide-leave-active {
  transition: all cubic-bezier(0.075, 0.82, 0.165, 1) 0.3s;
}
.slide-enter,
.slide-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>

