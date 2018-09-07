<template>
    <div class="wrapper"> 
        <div class="circle">
            <i :class="icon"></i>

        </div>
        <slot></slot>
    </div>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: "",
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
.circle {
    display: inline-block;
    width: 42px;
    border-radius: 50%;
    padding: 12%;
    background: #b0d86b;
    i{
      font-size: 26px;
    }
}

.wrapper{
   width: 20%;
    display: inline-block;
}
</style>

