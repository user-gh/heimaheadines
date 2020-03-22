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
      <van-cell @click="nameshow = true" title="昵称" :value="userInfo.name" is-link />
      <van-cell @click="introshow = true" title="介绍" :value="userInfo.intro" is-link />
    </van-cell-group>
    <van-cell-group>
      <van-cell
        @click="gendershow = true"
        title="性别"
        :value="userInfo.gender == 0 ? '男' : '女'"
        is-link
      />
      <van-cell @click="datashow = true" title="生日" :value="userInfo.birthday" is-link />
    </van-cell-group>
    <!-- 选择图片弹出层 -->
    <photo ref="photo" @upOK="changeImage" />
    <!-- 选择昵称弹出层 -->
    <van-popup v-model="nameshow" position="bottom">
      <van-field v-model="userInfo.name" />
    </van-popup>
    <!-- 选择介绍弹出层 -->
    <van-popup v-model="introshow" position="bottom">
      <van-field v-model="userInfo.intro" />
    </van-popup>
    <!-- 选择性别弹出层 -->
    <van-popup class="gender" v-model="gendershow" position="bottom">
      <div @click="changeGender(0)" class="gender-item">男</div>
      <div @click="changeGender(1)" class="gender-item">女</div>
      <div @click="gendershow = false" class="gender-item">取消</div>
    </van-popup>
    <!-- 选择年月日弹出层 -->
  <van-popup v-model="datashow" position="bottom">
      <van-datetime-picker 
      v-model="currentDate" 
      type="date" 
      :min-date="minDate" 
      :max-date="maxDate"
      @confirm = 'changeDate'
       />
  </van-popup>
  </div>
</template>

<script>
import { getInfo, getProfile } from "@/api/user";
import photo from "./commponts/photo";
import dayjs from 'dayjs'
export default {
  components: {
    photo
  },
  name: "index",
  data() {
    return {
      userInfo: {},
      nameshow: false,
      introshow: false,
      gendershow: false,
      datashow:false,
      minDate: new Date(1949, 0, 1),
      maxDate: new Date(),
      currentDate:new Date()
    };
  },
  methods: {
    // 把子组件里上传后的图片地赋值给用户信息里的photo
    changeImage(val) {
      // console.log(val);
      this.userInfo.photo = val;
      // 把对话框隐藏
      this.$refs.photo.show = false;
    },
    // 修改性别并隐藏弹出层
    changeGender(gender) {
      this.userInfo.gender = gender;
      this.gendershow = false;
    },
    // 日期改变点击确认的点击事件

    changeDate(){
      // 把日期对象转成字符串
      this.userInfo.birthday = dayjs(this.currentDate).format('YYYY-MM-DD');
      // 关闭弹出框
      this.datashow = false;
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
  .gender {
    background: #f8f8f8;
    .gender-item {
      background: #fff;
      text-align: center;
      padding: 10px 0;

      &:last-child {
        margin-top: 15px;
      }
    }
  }
}
</style>