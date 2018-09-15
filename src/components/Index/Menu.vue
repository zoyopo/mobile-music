<template>
  <div class="menu">
    <div class="menu-top">
      <img id='menu-top-pic' v-lazy="getInfoByisLogin('backgroundUrl')" alt="">
      <img id="menu-top-avatar" v-lazy="getInfoByisLogin('avatarUrl')" alt="">
      <span id="menu-top-nickname">
        <strong>{{'欢迎你~'+getInfoByisLogin('nickname')}}</strong>
      </span>
    </div>
    <group style="margin-top: -19px;">
      <cell title="最近播放" value=""></cell>
      <cell title="我的电台" value=""></cell>
      <cell title="我的收藏" value=""></cell>     
    </group>
   
   
    <div class="menu-bottom">
      <!-- <div class="menu-bottom-item">夜间模式</div> -->
      <!-- <div class="menu-bottom-item">设置</div> -->
      <div class="menu-bottom-item" @click="logOut">退出</div>
    </div>
  </div>
</template>

<script>
import { Cell, Group } from "vux";
import { mapGetters,mapMutations } from "vuex";
//const topPic = require("../../assets/logo.png");
export default {
  name: "Menu",
  components: {
    Cell,
    Group
  },
  data() {
    return {
     // topPic: topPic
    };
  },
  methods:{
    getInfoByisLogin(key){
      let _property=this.isLogin?this.userInfo.profile[key]:""
      // this.userInfo.profile.backgroundUrl:"";
       return  _property;
    },
    // 登出
    logOut(){
     this.rmUserInfo({});
      this.$router.push('/login')
    },
    ...mapMutations({
     rmUserInfo: 'REMOVE_STORAGE_USER_INFO'
     
    })
  },
  computed: {
    ...mapGetters(["userInfo"]),
    isLogin(){
      return Object.keys(this.userInfo).length>0;
    }   
  }
};
</script>

<style lang="scss" scoped>
#menu-top-pic {
  width: 100%;
}
.menu {
  height: calc(100% - 51px);
  overflow: auto;
  .menu-top {
    position: relative;
    height: 30%;
    overflow: hidden;
    #menu-top-avatar {
      position: absolute;
      width: 20%;
      border-radius: 50%;
      top: 32%;
      left: 1rem;
    }
    #menu-top-nickname {
      color: #fff;
      background: #ddd;
      width: 55%;
      text-align: center;
      position: absolute;
      top: 81%;
      left: 1rem;
    }
  }
  .menu-bottom {
    position: fixed;
    bottom: 0;
    display: flex;
    height: 50px;
    line-height: 50px;
    border-top: solid 1px #ddd;
    width: 100%;
    .menu-bottom-item {
      text-align: center;
      flex: 1;
    }
  }
}
</style>

