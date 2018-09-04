<template>
    <div class="login">
        <div class="logo">
            <img src="../assets/login/music-logo.png" alt="">
        </div>
        <div class="form-wrapper">
            <div class="form">

                <div class="mobile">
                    <i class="fa fa-mobile-phone"></i>&nbsp;<input class="input" type="text" v-model="loginInfo.phone" placeholder="请输入手机号" /></div>
                <div class="key">
                    <i class="fa fa-key fa-fw"></i><input v-model="loginInfo.password" class="input" type="password" placeholder="请输入密码" /></div>

                <div class="phone-login-button" @click="phoneLoginClick">登录</div>

                
            </div>
        </div>
        <div class="copyright">Copyright@小笼包</div>
    </div>
</template>

<script>
import { loginRequest, getUserPlayList } from "api/api";
import { mapMutations } from "vuex";
export default {
  name: "login",
  data() {
    return {
      loginInfo: {
        phone: "",
        password: ""
      }
    };
  },
  methods: {
    async phoneLoginClick() {
      let data = await loginRequest();
      let playList = await getUserPlayList(data.account.id);
      thatstoreUserInfo(res.data);
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

