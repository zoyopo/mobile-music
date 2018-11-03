<!--搜索页-->
<template>
    <div class="search">
        <!-- <div class="input-header">
            <input type="text" class="search-input" />
            <button class="cancel-btn" @click="back">取消</button>
        </div> -->
        <search ref="searchCp"></search>
    </div>
</template>

<script>
import { Search } from "vux";
export default {
    components:{
        Search
    },
  name: "searchPage",
  data() {
    return {
          results: [],
      value: 'test'
    };
  },
  mounted(){
    // search组件直接进入输入模式
    this.$refs.searchCp.touch();
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    setFocus() {
      this.$refs.search.setFocus();
    },
    resultClick(item) {
      window.alert("you click the result item: " + JSON.stringify(item));
    },
    getResult(val) {
      console.log("on-change", val);
      this.results = val ? getResult(this.value) : [];
    },
    onSubmit() {
      this.$refs.search.setBlur();
      this.$vux.toast.show({
        type: "text",
        position: "top",
        text: "on submit"
      });
    },
    onFocus() {
      console.log("on focus");
    },
    onCancel() {
      console.log("on cancel");
    }    
  }
};
function getResult (val) {
  let rs = []
  for (let i = 0; i < 20; i++) {
    rs.push({
      title: `${val} result: ${i + 1} `,
      other: i
    })
  }
  return rs
}
</script>

<style lang="scss" scoped>
.search-input {
  width: 80%;
  height: 2rem;
  border: 1px solid #1cd833;
  /* color: black; */
  border-radius: 14px;
}
.cancel-btn {
  width: 15%;
}
</style>

