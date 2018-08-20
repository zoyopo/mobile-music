<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: "app",

  data() {
    return {};
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
  body {
    height: 100%;
    #app {
      height: 100%;
    }
  }
}
</style>

