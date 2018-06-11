<template>
   <div class="circle">
       <i :class="icon"></i>
   </div>
</template>

<script>
export default {

props:{
    icon:{
        type:String,
        default:"",
        required:true
    }
}
}
</script>

<style lang="scss" scoped>

.circle{
    display: inline-block;
    width: 7%;
    border:solid 1px;
    //border-radius: 50%;
    border-radius: 50%;
    padding: 3%;
}

</style>

