<template>
  <div class="login">
    <div class="logo">
      <img src="../assets/login/music-logo.png" alt="">
    </div>
    <div class="form-wrapper">
      <div class="form">

        <div class="mobile">
          <i class="fa fa-mobile-phone"></i>&nbsp;<input class="input" type="text" v-model="loginInfo.phone" placeholder="请输入手机号" @focus="focusRst" @blur="blurRst" /></div>
        <div class="key">
          <i class="fa fa-key fa-fw"></i><input v-model="loginInfo.password" class="input" type="password" placeholder="请输入密码" @focus="focusRst" @blur="blurRst" /></div>

        <div class="phone-login-button" @click="phoneLoginClick">登录</div>

      </div>
    </div>
    <div class="copyright" v-show="mark">Copyright@小笼包</div>
  </div>
</template>

<script>
import { loginRequest } from "api/api_login";
import {getUserPlayList} from "api/api_recommend"
import { mapMutations } from "vuex";
export default {
  name: "login",
  data() {
    return {
      loginInfo: {
        phone: "",
        password: ""
      },
      mark: true
    };
  },
  methods: {
    activated() {
      this.loginInfo.phone="";
      this.loginInfo.password="";
    },
    blurRst() {
      this.mark = true;
    },
    focusRst() {
      this.mark = false;
    },
    async phoneLoginClick() {
      let data = await loginRequest(this.loginInfo, this);
      //let playList = await getUserPlayList(data.account.id);
      if (Object.prototype.toString.call(data) === "[object Object]") {
        this.storeUserInfo(data);
        this.$vux.toast.text("登录成功", "bottom");
        setTimeout(() => {
          // if(this.routers)
          if (this.$route.query.backrouter) {
            this.$router.push(this.$route.query.backrouter);
          } else {
            this.$router.go(-1);
          }
        }, 1500);
      }
    },
    ...mapMutations(["storeUserInfo"])
  },
  computed: {},
  watch: {}
};
</script>

<style lang="scss" scoped>
.login {
  height: 100%;
  .logo {
    width: 100%;
    text-align: center;
    padding-top: 9rem;
    img {
      width: 30%;
    }
  }

  .form-wrapper {
    padding-top: 6rem;
    width: 100%;
    text-align: center;
    .form {
      display: flex;
      flex-direction: column;
      /* justify-items: center; */
      align-items: center;
      .mobile,
      .key {
        display: flex;
        align-items: center;
        height: 2.5rem;
        line-height: 2.5rem;
        // text-align: center;
        width: 67%;
        // display: inline-block;
        border: solid 1px #ddd;
        i {
          flex: 1;
        }
        .input {
          outline: none;
          width: 85%;
          height: 2rem;
          border: none;
        }
        margin-bottom: 1rem;
      }
      .phone-login-button {
        /* padding-top: 2rem; */
        border: solid 1px #1aceb6;
        border-radius: 10px;
        height: 2rem;
        line-height: 2rem;
        // text-align: center;
        width: 67%;
        /* margin-top: 4rem; */
        margin: 0 auto;
        // margin-top: 4rem;
      }
    }
  }
  .copyright {
    position: absolute;
    bottom: 1rem;
    display: inline-block;
    width: 100%;
    text-align: center;
    font-size: 0.5rem;
  }
}
</style>

<style scoped>
@media screen and(min-width: 768px) {
  .login .form-wrapper {
    padding-top: 13rem;
  }
  .login .logo img {
    width: 280px;
  }
  .login .form-wrapper .form .mobile,
  .login .form-wrapper .form .key {
    width: 710px;
  }
}
</style>


