<template>

  <div class="vux-demo">
    <div v-if="picArray.length>0">
      <slide :loop='loop' :autoPlay='autoPlay' :picArray="picArray" :style="{'margin-top':'10px'}">

      </slide>
    </div>
    <circle-icon v-for="(item,index) in icons" :icon="item.name" :key="index" :class="'distance'" :style="index===0?{'margin-left':0}:''">
      <!--去掉第一个元素的margin-->
    </circle-icon>
    <div class="song-sheets">
      <sheet-label :title="'推荐歌单'"></sheet-label>
      <grid :col=2 :cols=3>
        <grid-item :classes="classes" label="Grid" v-for="item in contentArray" :key="item.id">
          <img slot="icon" :src="item.picUrl">
          <div slot="label">{{item.name}}</div>
          <div class="right-top">
            <i class="fa fa-headphones"></i>
            <span>{{(item.playCount/10000).toFixed(2)+"W" }}
            </span>
          </div>
        </grid-item>

      </grid>
    </div>
  </div>
</template>

<script>
// import { Group, Cell } from 'vux'
import Slide from "components/Index/Slider.vue";
import { getFirstScreenData } from "api/api.js";
import { Grid, GridItem } from "vux";
import CircleIcon from "components/Recomend/CircleIcon";
import SheetLabel from "components/Recomend/SheetLabel";

export default {
  components: {
    Slide,
    CircleIcon,
    SheetLabel,
    Grid,
    GridItem
  },
  data() {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      // msg: "Hello World!",
      icons: [
        { name: "fa fa-book" },
        { name: "fa fa-book" },
        { name: "fa fa-book" },
        { name: "fa fa-book" }
      ],
      loop: true,
      autoPlay: true,
      picArray: [],
      videoArray: [],
      partTitle: "推荐歌单",
      contentArray: [],
      classes: {
        weui_grid__icon: {
          width: "auto",
          height: "auto"
        }
      }
    };
  },
  methods: {
    async getAllData() {
      //let vm = this;
      let res = await getFirstScreenData();
      console.log(res);
      //封装了获取数据的方法
      // .then(function(res) {
      let banner = res[1];
      let personalized = res[0];
      let privateContent = res[2];

      if (banner.data.code == "200") {
        this.picArray = banner.data.banners;
      }

      if (personalized.data.code == "200") {
        this.contentArray = personalized.data.result.slice(0, 6); //土鳖法，截取前八
      }
      if (privateContent.data.code == "200") {
        privateContent.data.result.forEach(element => {
          element.picUrl = element.sPicUrl;
        });
        this.videoArray = privateContent.data.result;
      }
    }
  },
  mounted() {
    this.getAllData();
  }
};
</script>

<style lang="scss" scoped>
.vux-demo {
  text-align: center;
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
.weui_grid__icon {
  width: auto;
  height: auto;
  margin: 0 auto;
}
.right-top {
  position: absolute;
  top: 1.2rem;
  right: 0.7rem;
  font-size: 0.6rem;
  color: #fff;
}
</style>
