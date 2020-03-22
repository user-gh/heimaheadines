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
      <van-cell title="昵称" :value="userInfo.name" is-link />
      <van-cell title="介绍" :value="userInfo.intro" is-link />
    </van-cell-group>
    <van-cell-group>
      <van-cell title="性别" :value="userInfo.gender == 0 ? '男' : '女'" is-link />
      <van-cell title="生日" :value="userInfo.birthday" is-link />
    </van-cell-group>
    <!-- 弹出层 -->
    <photo ref="photo" @upOK="changeImage" />
  </div>
</template>

<script>
import { getInfo, getProfile } from "@/api/user";
import photo from "./commponts/photo";
export default {
  components: {
    photo
  },
  name: "index",
  data() {
    return {
      userInfo: {}
    };
  },
  methods: {
    changeImage(val) {
      // console.log(val);
      // 把子组件里上传后的图片地赋值给用户信息里的photo
      this.userInfo.photo = val;
      // 把对话框隐藏
      this.$refs.photo.show = false;
    }
  },
  async created() {
    try {
      let res = await getInfo();
      this.userInfo = res.data.data;
      console.log(res);
      res = await getProfile();
      // 获取生日和性别
      this.$set(this.userInfo, "birthday", res.data.birthday);
      this.$set(this.userInfo, "gender", res.data.gender);
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