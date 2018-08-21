<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <normal-player class="normal-player"></normal-player>
    <mini-player class="mini-player"></mini-player>
   
  </div>
</template>

<script>
import MiniPlayer from "components/Player/MiniPlayer";
import NormalPlayer from "components/Player/NormalPlayer";

export default {
  name: "app",
  components: {
    MiniPlayer,
    NormalPlayer
  },
  mounted() {
    window.addEventListener("resize", this.refreshRem);
  },
  methods: {
    refreshRem() {
      let docEl = window.documentElement;
      let width = docEl.getBoundingClientRect().width;
      let rem = width / 10;
      docEl.style.fontSize = rem + "px";
    }
  },
  data() {
    return {
      
    };
  },
  methods: {}
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
</style>

