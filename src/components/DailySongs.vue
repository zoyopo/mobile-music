<template>
  <div class="dailysongs">
    <m-header :info="info" @back="back" class="m-header"></m-header>
    <main>
      <div class="main-top" :style="{'background-image':`url(${backgroundUrl})`}" ref="topPic">
        <div class="main-top-tips">根据你的口味每天6：00生成</div>
        <div></div>
      </div>
      <div class="main-list" @touchstart="mListTs" @touchend="mListTd" ref="mainList" @touchmove="throttle(mListTm,500)()">
        <List :list="songList" :showPic="true" @select="selectItem"></List>
      </div>
    </main>
  </div>
</template>

<script>
import MHeader from "base/MHeader";
import List from "base/List";
import { getDailySongs } from "api/api";
import { mapActions } from "vuex";
import {throttle} from 'common/js/util'

export default {
  data() {
    return {
      songList: [],
      postionStore: ""
    };
  },
  created() {
    this.getDailySongs();
    this.throttle=throttle;
  },
  methods: {
    mListTm() {
      //console.log(1)
      let picDom = this.$refs.topPic.getBoundingClientRect();
      if (this.postionStore - picDom.y+1 >= window.innerHeight * 0.92 * 0.45) {
        this.$refs.mainList.style["overflow"] = "auto";
      } else {
         this.$refs.topPic.style['opacity']=(picDom.bottom-this.postionStore)/(window.innerHeight * 0.92 * 0.45)
        this.$refs.mainList.style["overflow"] = "hidden";
      }
    },
    mListTs() {
      let picDom = this.$refs.topPic.getBoundingClientRect();
      if (this.postionStore === "") {
        this.postionStore = picDom.y;
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
    List
  }
};
</script>

<style lang="scss" scoped>
.dailysongs {
  height: 100%;
  .m-header {
    height: 8%;
  }
  main {
    background: #ddd;
    height: 92%;
    overflow: auto;

    .main-top {
      height: 45%;
      /* width: 100%; */
      opacity: 0.8;
      background-position: center;
      background-size: cover;
      text-align: center;
      color: #fff;
      position: relative;
      .main-top-tips {
        position: absolute;
        top: 16.8rem;
        left: 0.5rem;
        font-size: 0.8rem;
      }
    }
    .main-list {
      height: 100%;
      overflow: auto;
    }
  }
}
</style>

