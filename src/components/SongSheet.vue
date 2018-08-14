<!--歌单-->
<template>
<div class="song-sheet">
  <!--头部-->
    <header></header>
    <!--主体-->
    <main>
       <!--主体上-->
      <div class="main-top">
        <div class="main-top-pic"></div>
        <div class="main-top-title"></div>
        <div class="main-top-author"></div>
      </div>
      <!-- 操作-->
      <div class="main-options">

      </div>
      <!-- 歌曲列表-->
      <div class="main-list"></div>
    </main>
</div>
</template>

<script>
export default {
  name: "SongSheet",
  created() {
    console.log("created");
    console.log(this.$route.params);
  },
  mounted() {
    console.log("mounted");
    console.log(this.$route.params);
  }
};
</script>

<style>
</style>
