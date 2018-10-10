<template>
  
    <div class="vux-demo">
      <div v-if="picArray.length>0">
        <slide :loop='loop' :autoPlay='autoPlay' :picArray="picArray">

        </slide>
        
      </div>
    </div>
</template>

<script>
// import { Group, Cell } from 'vux'
import Slide from "components/Index/Slider.vue";
import {getFirstScreenData} from "api/api_recommend.js"
export default {
  components: {
    Slide
  },
  data() {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      // msg: "Hello World!",
      loop: true,
      autoPlay: true,
       picArray: [],
      videoArray: [],
      partTitle: "推荐歌单",
      contentArray: []
    };
  },
  methods:{
     getAllData() {
      let vm = this;
      getFirstScreenData(["bannerData"])//封装了获取数据的方法
        .then(
         function(res) {
          
            let banner=res[0];
            // let personalized=res[0];
            // let privateContent=res[2];
            
            if (banner.data.code == "200") {
              vm.picArray = banner.data.banners;
            }
            // if (personalized.data.code == "200") {
            //   vm.contentArray = personalized.data.result.slice(0, 8); //土鳖法，截取前八
            // }
            // if (privateContent.data.code == "200") {
            //   privateContent.data.result.forEach(element => {
            //     element.picUrl = element.sPicUrl;
            //   });
            //   vm.videoArray = privateContent.data.result;
            // }
          })
        ;
    }
  },
  mounted(){
    this.getAllData();
  }
};
</script>

<style>
.vux-demo {
  text-align: center;
}
.logo {
  width: 100px;
  height: 100px;
}
</style>
