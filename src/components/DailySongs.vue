<template>
  <div class="dailysongs">
    <Skeleton :itemShow="false" v-show="skeletonShow"></Skeleton>
    <div class="vis-wrapper" v-show="!skeletonShow">
      <m-header :info="info" @back="back" class="m-header"></m-header>
      <main ref="wrapper">
        <div class="wrapper-container" ref="container">
          <div class="main-top" :style="{'background-image':`url(${backgroundUrl})`}" ref="topPic">
            <div class="main-top-tips">根据你的口味每天6:00生成</div>
            <div></div>
          </div>
          <div class="main-list" @touchstart="mListTs" @touchend="mListTd" @touchmove="throttle(mListTm,500)()">
            <List :list="songList" :showPic="true" @select="selectItem" ref="mainList" style="height:100%;"></List>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import MHeader from "base/MHeader";
import List from "base/List";
import { getDailySongs } from "api/api_dailysongs";
import { mapActions } from "vuex";
import { throttle } from "common/js/util";
import Skeleton from "base/Skeleton";
import scrollMixin from "@/mixin/scrollMixin";
export default {
  data() {
    return {
      songList: []
      // postionStore: ""
    };
  },
  mixins: [scrollMixin],
  created() {
    this.getDailySongs();
    this.throttle = throttle;
    this.postionStore = "";
     this.transformDelta=window.innerHeight*0.08
  },
  methods: {
    mListTm(e) {
      // console.log(e)
      //console.log(1)
      let listDom = this.$refs.mainList.$el;
      let picDom = this.$refs.topPic.getBoundingClientRect();
      let topPicHeight = picDom.height;
      if (this.postionStore - picDom.top + 15 >= topPicHeight) {
        //  if (listDom.style["overflow"] === "hidden") {
        listDom.style["overflow"] = "auto";
        //}
      } else {
        let ratio = (picDom.bottom - this.postionStore) / topPicHeight;
        this.$refs.topPic.style["opacity"] = parseFloat(ratio.toFixed(2));
        // debugger

        listDom.style["overflow"] = "hidden";
      }
    },
    mListTs() {
      let picDom = this.$refs.topPic.getBoundingClientRect();
      if (this.postionStore === "") {
        this.postionStore = picDom.top; //y在手机端微信qq浏览器不兼容
      }
    },
    mListTd() {
      // let picDom = this.$refs.topPic.getBoundingClientRect();
      //this.$refs.topPic.style['opacity']=(picDom.bottom-this.postionStore)/window.innerHeight * 0.92 * 0.45
    },
    back() {
      this.$router.go(-1);
    },
    async getDailySongs() {
      let data = await getDailySongs();
      if (data.code === 200) {
        data.recommend.forEach(element => {
          //let d = (element.duration / 1000).toFixed() * 1;
          element.singer = element.artists.map(t => t.name).join("/"); //歌手
        });
        this.songList = data.recommend;
        //console.log(data);
      }
    },
    selectItem(index, item) {
      // debugger
      this.selectSong({ list: this.songList, song: item, index });
    },
    ...mapActions({
      selectSong: "SELECT_SONG"
    })
  },
  computed: {
    backgroundUrl() {
      return this.songList.length > 0
        ? this.songList[0].album.blurPicUrl
        : "../static/img/no-pic.png";
    },
    info() {
      return {
        title: "每日推荐",
        description: ""
      };
    }
  },
  components: {
    MHeader,
    List,
    Skeleton
  }
};
</script>

<style lang="scss" scoped>
.dailysongs {
  height: 100%;
  .vis-wrapper {
    height: 100%;
    .m-header {
      height: 8%;
    }
    main {
      background: #ddd;
      height: 92%;
      overflow: auto;

      .main-top {
        height: 18rem;
        /* width: 100%; */
        opacity: 0.8;
        background-position: center;
        background-size: cover;
        text-align: center;
        color: #fff;
        position: relative;
        .main-top-tips {
          position: absolute;
          bottom: 0;
          left: 0.5rem;
          font-size: 0.8rem;
        }
      }
      .main-list {
        height: 100%;
        overflow: hidden;
      }
    }
  }
}
</style>

