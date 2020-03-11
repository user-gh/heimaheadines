<template>
  <div class="home">
    <div class="top-nav">
      <van-icon class="top-icon" name="wap-nav" />
      <van-search class="top-search" shape="round" background="#3194ff" placeholder="请输入搜索关键词" />
      <van-icon class="top-icon"  name="search" />
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {};
  }
};
</script>

<style lang='less' scoped>
.home {
  .top-nav {
    display: flex;
    align-items: center;
    background: #3194ff;
    padding-left: 10px;
    padding-right: 10px;

    .top-icon{
      font-size: 25px;
      color: #fff;
    }

    .top-search{
      flex:1
    }
  }

}
</style>