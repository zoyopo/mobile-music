

<template>

  <div class="rec-content" :class="{playerRstHeight:playList.length>0}" ref="wrapper">
    <div class="wrapper-container" ref="container">
      <Skeleton :navShow="false" :itemNum="4" v-show="skeletonShow"></Skeleton>

      <div v-if="picArray.length>0">
        <slide :loop='loop' :autoPlay='autoPlay' :picArray="picArray" :style="{'margin-top':'10px'}">

        </slide>
      </div>
      <div v-show="!skeletonShow">
        <circle-icon @click.native="operate(index)" v-for="(item,index) in icons" :icon="item.name" :key="index" :class="'distance'" :style="index===0?{'margin-left':0}:''">
          <!--去掉第一个元素的margin-->
          <div>{{item.text}}</div>
        </circle-icon>

        <div class="song-sheets">
          <sheet-label :title="'推荐歌单'"></sheet-label>
          <grid :col=2 :cols=3>
            <grid-item label="Grid" v-for="item in contentArray" :key="item.id" :link="{ path: `/songsheets/${item.id}`}">
              <img slot="icon" v-lazy="item.picUrl">
              <div slot="label">{{item.name}}</div>
              <div class="right-top">
                <i class="fa fa-headphones"></i>
                <span>{{(item.playCount/10000).toFixed(2)+"W" }}
                </span>
              </div>
            </grid-item>

          </grid>
        </div>
        <div class="song-sheets">
          <sheet-label :title="'最新音乐'"></sheet-label>
          <grid :col=2 :cols=3>
            <grid-item label="Grid" v-for="item in newsongs" :key="item.id" @click.native="goToSongSheet(item.id)">
              <img slot="icon" v-lazy="item.coverImgUrl">
              <div slot="label">{{item.name}}</div>
              <div class="right-top">
                <!-- <i class="fa fa-headphones"></i> -->
                <!-- <span>{{(item.playCount/10000).toFixed(2)+"W" }}
            </span> -->
              </div>
            </grid-item>

          </grid>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { Group, Cell } from 'vux'
import Slide from "components/Index/Slider.vue";
import { getFirstScreenData, getSongSheetsData } from "api/api_recommend.js";
import Skeleton from "base/Skeleton";
import { Grid, GridItem } from "vux";
import CircleIcon from "components/Recomend/CircleIcon";
import SheetLabel from "components/Recomend/SheetLabel";
import { mapGetters, mapActions } from "vuex";
import scrollMixin from "@/mixin/scrollMixin"
import BScroll from "better-scroll";
export default {
  components: {
    Slide,
    CircleIcon,
    SheetLabel,
    Grid,
    GridItem,
    Skeleton
  },

  data() {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      // msg: "Hello World!",
      icons: [
        { name: "iconfont icon-FM", text: "私人FM" },
        { name: "iconfont icon-meirituijian-", text: "每日推荐" },
        { name: "iconfont icon-yinle1", text: "歌单" },
        { name: "iconfont icon-paihangbang", text: "排行榜" }
      ],
      loop: true,
      autoPlay: true,
      picArray: [],
      videoArray: [],
      partTitle: "推荐歌单",
      contentArray: [],
      // classes: {
      //   weui_grid__icon: {
      //     width: "auto",
      //     height: "auto"
      //   }
      // },
      newsongs: []
    };
  },
  created() {
    this.transformDelta = 100;
    this.getAllData();
    Object.freeze(this.icons);
  },

  computed: {
    ...mapGetters(["playList"])
  },
  methods: {
    operate(index) {
      //  debugger
      let maps = ["", "/dailysongs"];
      //debugger
      this.$router.push(maps[1]);
    },
    async getAllData() {
      //let vm = this;
      let res = await getFirstScreenData();
      let opts = {
        order: "new",
        limit: 6
      };
      let newsongs = await getSongSheetsData(opts, ["playlistData"]);
      console.log(res);
      console.log(newsongs);
      let newsong = newsongs[0];
      if (newsong.data.code == 200) {
        this.newsongs = newsong.data.playlists;
      }
      //封装了获取数据的方法
      // .then(function(res) {
      let banner = res[1];
      let personalized = res[0];
      let privateContent = res[2];

      if (banner.data.code === 200) {
        this.picArray = banner.data.banners;
      }

      if (personalized.data.code === 200) {
        this.contentArray = personalized.data.result.slice(0, 6); //土鳖法，截取前6
      }
      if (privateContent.data.code === 200) {
        privateContent.data.result.forEach(element => {
          element.picUrl = element.sPicUrl;
        });
        this.videoArray = privateContent.data.result;
      }
      //this.ldDataFinished = true;

    },
    goToSongSheet(id) {
      //this.$router.push({name:"SongSheet",params: {id}})=>这种写法无效
      //debugger
      this.$router.push(`/songsheets/${id}`);
    }
  },
  mixins:[scrollMixin]
};
</script>

<style lang="scss">
// 播放器出现，高度重新设置
.playerRstHeight {
  height: calc(100% - 155px) !important;
}
.rec-content {
  text-align: center;
  height: calc(100% - 90px);
  overflow: hidden;
  .wrapper-container {
   // padding-top: 90px;真机ok,不需要加
  }
}
.logo {
  width: 100px;
  height: 100px;
}
.distance {
  margin-left: 5%;
  // &::first-child{
  //   margin-left: 0;
  // }
  margin-top: 10px;
}
.weui-grid__label div {
  text-overflow: ellipsis;
  overflow: hidden;
}
// .weui-grid {

// }
.weui-grid__icon {
  width: auto !important;
  height: 7.5rem !important;
  margin: 0 auto !important;
}
/*兼容768px以上的grid高度*/
@media screen and(min-width: 768px) {
  .weui-grid__icon {
    height: 20rem !important;
    width: 20rem !important;
  }
}
.right-top {
  position: absolute;
  top: 1.2rem;
  right: 0.7rem;
  font-size: 0.6rem;
  color: #fff;
}
</style>
