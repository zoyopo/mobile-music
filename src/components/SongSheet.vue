<!--歌单-->
<template>
  <transition name="slide">
    <div class="song-sheet">
      <!--头部-->
      <div class='header'>
        <div class="header-arrow">
          <img id="header-arrow-arrow" src="../assets/songsheet/arrow-left.png" alt="暂无">
        </div>
        <div class="header-title">
          <div class="header-title-title">歌单</div>
          <div class="header-title-description">歌单描述</div>
        </div>
        <div class="header-search"><img id='header-search-icon' src="../assets/songsheet/search-sm.png" alt="暂无"></div>
        <div class="header-share"><img id="header-share-icon" src="../assets/songsheet/Option.png" alt="暂无"></div>
      </div>
      <!--主体-->
      <main>
        <!--主体上-->
        <div class="main-top">

          <img class="main-top-image" src="../assets/logo.png" alt="">
          <div class="main-top-right">
            <div class="main-top-title">歌单标题</div>
            <div class="main-top-author">歌单作者</div>
          </div>
        </div>
        <!-- 操作-->
        <div class="main-options">
        <div class="main-options-icon"><i class="fa fa-commenting-o"></i></div>
        <div class="main-options-icon"><i class="fa fa-share-alt"></i></div>
        <div class="main-options-icon"><i class="fa fa-download"></i></div>
        <div class="main-options-icon"><i class="fa fa-check-square-o"></i></div>
        </div>
        <!-- 歌曲列表-->
        <div class="main-list"></div>

      </main>

    </div>
  </transition>
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
<style lang="scss" scoped>
.song-sheet {
  height: 100%;
  .header {
    // height: 60px;
    // line-height: 60px;
    background: #ddd;
    color: #fff;
    display: flex;

    .header-arrow {
      align-self: flex-end;
      flex: 0.2;
      #header-arrow-arrow {
        width: 60%;
      }
    }
    .header-title {
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex: 0.7;
      .header-title-title {
        // height: 20px;
        font-size: 1.2rem;
      }
      .header-title-description {
        font-size: 0.5rem;
      }
    }
    .header-search {
      flex: 0.2;
      align-self: center;
      #header-search-icon {
        width: 45%;
      }
    }
    .header-share {
      flex: 0.2;
      align-self: center;
      #header-share-icon {
        width: 50%;
      }
    }
  }
  main {
    background: #ddd;
    height: calc(100% - 49px);
    overflow: auto;
    .main-top {
      overflow: hidden;
      .main-top-image {
        float: left;

        width: 35%;
      }
      .main-top-right {
         overflow: hidden;
         padding-top: .5rem;
         padding-left: .5rem;
        .main-top-title {
         height: 60px;
        }
        .main-top-author {
         font-size: .5rem;
        }
      }
    }
    .main-options {
      font-size: 0;
      color:#fff;
      
      .main-options-icon{
        width: 25%;
        font-size: 24px;
        display: inline-block;
        text-align: center;
      }
    }
    .main-list {
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

