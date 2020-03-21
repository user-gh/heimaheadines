<template>
  <div class="profile">
    <!-- 导航栏 -->
    <van-nav-bar title="用户资料修改" left-arrow right-text="保存" @click-left="$router.back()" />
    <van-cell-group class="top-profile">
      <van-cell title="头像" value="内容" is-link>
        <template slot="default">
          <img class="avatar" src="http://toutiao.meiduo.site/Fkj6tQi3xJwVXi1u2swCElotfdCi" alt />
        </template>
      </van-cell>
      <van-cell title="昵称" value="13647198155" is-link />
      <van-cell title="介绍" value="猛男" is-link />
    </van-cell-group>
    <van-cell-group>
      <van-cell title="性别" value="男" is-link />
      <van-cell title="生日" value="1999.06.01" is-link />
    </van-cell-group>
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
.profile {
  .van-nav-bar.van-hairline--bottom {
    background: #3296fa;
  }

  .van-nav-bar__title.van-ellipsis {
    color: #fff;
  }

  i.van-icon.van-icon-arrow-left.van-nav-bar__arrow {
    color: #fff;
  }
  span.van-nav-bar__text {
    color: #fff;
  }
  .top-profile {
    margin-bottom: 10px;
    .avatar {
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }
  }
}
</style>