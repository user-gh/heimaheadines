<template>
  <div class="details">
    <!-- 导航栏 -->
    <van-nav-bar title="搜索结果" left-arrow @click-left="$router.back()" />
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
.details {
  .van-nav-bar.van-hairline--bottom {
    background: #3296fa;
  }

  .van-nav-bar__title.van-ellipsis {
    color: #fff;
  }

  i.van-icon.van-icon-arrow-left.van-nav-bar__arrow {
    color: #fff;
  }
}
</style>