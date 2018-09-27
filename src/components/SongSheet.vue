

<template>

  <div class="song-sheet">

    <Skeleton :itemShow="false" v-show="skeletonShow"></Skeleton>
    <div class="vis-wrapper" v-show="!skeletonShow">
      <!--头部-->
      <div class='header'>
        <div class="header-arrow">
          <img @click="back" id="header-arrow-arrow" src="../assets/songsheet/arrow-left.png" alt="暂无">
        </div>
        <div class="header-title">
          <div class="header-title-title">{{title}}</div>
          <div class="header-title-description">{{info.description}}</div>
        </div>
        <!-- <div class="header-search"><img id='header-search-icon' src="../assets/songsheet/search-sm.png" alt="暂无"></div>
        <div class="header-share"><img id="header-share-icon" src="../assets/songsheet/Option.png" alt="暂无"></div> -->
      </div>
      <!--主体-->
      <main ref='wrapper'>
        <div class="wrapper-container" ref="container">
          <!--主体上-->
          <div class="main-top">

            <img class="main-top-image" :src="info.coverImgUrl" alt="">
            <div class="main-top-right">
              <div class="main-top-title">{{info.name}}</div>
              <div class="main-top-author">
                <div class="avatar-div"><img id="ct-avatar" :src="info.creator.avatarUrl" /></div>
                <div class="ct-nickname">{{info.creator.nickname}}</div>
              </div>
            </div>
          </div>
          <!-- 操作-->
          <!-- <div class="main-options">
          <div class="main-options-icon">
            <i class="fa fa-commenting-o"></i>
          </div>
          <div class="main-options-icon">
            <i class="fa fa-share-alt"></i>
          </div>
          <div class="main-options-icon">
            <i class="fa fa-download"></i>
          </div>
          <div class="main-options-icon">
            <i class="fa fa-check-square-o"></i>
          </div>
        </div> -->
          <!-- 歌曲列表-->
          <div class="main-list">
            <List :list="songList" @select="selectItem"></List>
          </div>
        </div>
      </main>

    </div>
  </div>
  <!-- </transition> -->
</template>

<script>
import BScroll from "better-scroll";
import { getSheetDetail } from "api/api_songsheet.js";
import List from "base/List";
import Skeleton from "base/Skeleton";
// import MHeader from 'base/MHeader'
import { mapMutations, mapActions } from "vuex";
 import scrollMixin from "@/mixin/scrollMixin"
export default {
  mixins:[scrollMixin],
  components: {
    List,
    Skeleton
    // MHeader
  },
  name: "SongSheet",
  data() {
    return {
      title: "歌单",
      info: {
        creator: {}
      },
      songList: []
    };
  },
  created() {
    this.transformDelta=49
  },
  mounted() {
    window.addEventListener("touchmove", this.scorll);
  },
  activated() {
    let id = this.$route.params.id;
    this.getDetail(id);
  },
  computed: {
    // title() {
    //   this.$nextTick(() => {
    //     debugger
    //     if (this.$refs.main.scrollTop < 50) return "歌单";
    //   });
    // }
  },
  watch: {},
  methods: {
    selectItem(index, item) {
      // debugger
      this.selectSong({ list: this.songList, song: item, index });
    },
    scorll() {
      if (this.$refs.wrapper && this.$refs.wrapper.scrollTop > 50) {
        // debugger
        this.title = this.info.name;
      } else {
        this.title = "歌单";
      }
    },
    async getDetail(id) {
      let data = await getSheetDetail(id);
      //debugger
      // console.log(data);
      let info = {
        coverImgUrl: data.coverImgUrl,
        name: data.name,
        createTime: data.createTime,
        trackCount: data.trackCount,
        playCount: data.playCount,
        description: data.description,
        tags: data.tags,
        creator: {
          avatarUrl: data.creator.avatarUrl || "",

          nickname: data.creator.nickname
        }
      };
      this.info = info;
      //this.info.title="歌单";
      data.tracks.forEach(element => {
        //let d = (element.duration / 1000).toFixed() * 1;
        element.singer = element.artists.map(t => t.name).join("/"); //歌手
      });
      this.songList = data.tracks;
      // let playList = this.songList.map(item => {
      //   return {
      //     name: item.name,
      //     singer: item.singer,
      //     picUrl: item.album.blurPicUrl,
      //     id: item.id
      //   };
      // });
      // this.setPlayList(playList);
    },
    back() {
      this.$router.go(-1);
    },
    ...mapMutations({
      setPlayList: "SET_PLAY_LIST"
    }),
    ...mapActions({
      selectSong: "SELECT_SONG"
    })
  }
};
</script>
<style lang="scss" scoped>
.song-sheet {
  height: 100%;
  .vis-wrapper {
    height: 100%;
  }
  .header {
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
      width: 50%;
      .header-title-title {
        // height: 20px;
        font-size: 1.2rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        width: 100%;
      }
      .header-title-description {
        font-size: 0.5rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        width: 100%;
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
    .wrapper-container{
      // padding-top: 49px;
    }
    .main-top {
      padding-left: 1rem;
      padding-top: 0.5rem;
      overflow: hidden;
      padding-bottom: 1rem;
      .main-top-image {
        float: left;
        width: 35%;
      }
      .main-top-right {
        overflow: hidden;
        padding-left: 0.5rem;
        .main-top-title {
          height: 60px;
          width: 92%;
        }
        .main-top-author {
          font-size: 0.5rem;
          display: flex;
          .avatar-div {
            width: 10%;
            margin-right: 0.5rem;
            #ct-avatar {
              width: 100%;
              display: block;
              border-radius: 50%;
            }
          }
          .ct-nickname {
            align-self: flex-end;
          }
        }
      }
    }
    .main-options {
      font-size: 0;
      color: #fff;

      .main-options-icon {
        width: 25%;
        font-size: 24px;
        display: inline-block;
        text-align: center;
      }
    }
    // .main-list {
    // }
  }
}
</style>

