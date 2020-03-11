<template>
  <div>
    <router-view />
    <van-tabbar v-model="active">
      <van-tabbar-item name="home" to="/home" icon="home-o">主页</van-tabbar-item>
      <van-tabbar-item name="question" to="/question" icon="comment-o">问答</van-tabbar-item>
      <van-tabbar-item name="video" to="/video" icon="tv-o">视频</van-tabbar-item>
      <van-tabbar-item name="mine" to="/mine" icon="contact">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
        active:'home'
    };
  }
};
</script>

<style>
</style>