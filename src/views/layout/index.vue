<template>
  <div>
    <router-view />
    <van-tabbar v-model="active">
      <van-tabbar-item to="/home" icon="home-o">主页</van-tabbar-item>
      <van-tabbar-item to="/question" icon="comment-o">问答</van-tabbar-item>
      <van-tabbar-item to="/video" icon="tv-o">视频</van-tabbar-item>
      <van-tabbar-item to="/mine" icon="contact">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
        active:''
    };
  }
};
</script>

<style>
</style>