<template>
    <div class="dailysongs">
        <m-header :info="info" @back="back"></m-header>
        <main>
          <div class="main-top" :style="{'background-image':`url(${backgroundUrl})`}"></div>
            <div class="main-list">
                <List :list="songList" @select="selectItem"></List>
            </div>
        </main>
    </div>
</template>

<script>
import MHeader from "base/MHeader";
import List from "base/List";
import { getDailySongs } from "api/api";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      songList: []
    };
  },
  created() {
    this.getDailySongs();
  },
  methods: {
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
      return songList.length>0? 
      this.songList[0].album.blurPicUrl 
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
  main {
    background: #ddd;
    height: calc(100% - 49px);
    overflow: auto;
  }
}
</style>

