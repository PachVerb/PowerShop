<template>
  <div class="wrapper">
    <!-- 楼层装修组件 -->
    <tpl ref="tpl" />
	<!-- <drag-btn></drag-btn> -->
  </div>
</template>
<script>
import tpl from "@/pages/tabbar/home/views.vue";
import dragbtn from '@/components/drag-btn/drag-btn.vue'
export default {
  data() {
    return {
      background: {
        backgroundColor: "#fff",
      },
    };
  },
  onShow(){
    setTimeout(()=>{
      this.$refs.tpl.fetchCoupon();
    },1000)
  },
  methods: {

  },
  onReachBottom(){
    // 给子级监听触底加载
    uni.$emit('onReachBottom',true)
  },
  
  onPullDownRefresh() {
    this.$refs.tpl.init();

    uni.stopPullDownRefresh();
  },
  components: {
    tpl,
	dragbtn
  },
  
};
</script>

<style lang="scss" scoped>
</style>
