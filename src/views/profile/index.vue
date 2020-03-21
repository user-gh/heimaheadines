<template>
  <div class="profile">
    <!-- 导航栏 -->
    <van-nav-bar title="个人信息" left-arrow right-text="保存" @click-left="$router.back()" />
    <van-cell-group class="top-profile">
      <van-cell title="头像" is-link>
        <template slot="default">
          <img @click="$refs.photo.show = true" class="avatar" :src="userInfo.photo" alt />
        </template>
      </van-cell>
      <van-cell :title="userInfo.name" value="13647198155" is-link />
      <van-cell title="介绍" value="猛男" is-link />
    </van-cell-group>
    <van-cell-group>
      <van-cell title="性别" :value="userInfo.gender == 0 ?'男' : '女'" is-link />
      <van-cell title="生日" :value="userInfo.birthday" is-link />
    </van-cell-group>
    <!-- 弹出层 -->
    <photo ref="photo" />
  </div>
</template>

<script>
import { getInfo, getProfile } from "@/api/user";
import photo from "./commponts/photo";
export default {
  components:{
    photo
  },
  name: "index",
  data() {
    return {
      userInfo: {}
    };
  },
  async created() {
    try {
      let res = await getInfo();
      this.userInfo = res.data.data;
      console.log(res);
      res = await getProfile();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
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