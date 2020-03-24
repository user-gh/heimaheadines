<template>
  <div class="mine">
    <!-- 头部区域 -->
    <div v-if="$store.state.token" class="top">
      <!-- 用户信息 -->
      <div v-if="$store.state.token" class="user-info">
        <img @click="$router.push('/profile')" class="avatar" :src="userInfo.photo" alt />
        <span class="name">{{userInfo.name}}</span>
      </div>

      <!-- 统计数据 -->
      <div class="data-info">
        <div class="data-info-item">
          <span>{{userInfo.art_count}}</span>
          <span>动态</span>
        </div>
        <div class="data-info-item">
          <span>{{userInfo.follow_count}}</span>
          <span>关注</span>
        </div>
        <div class="data-info-item">
          <span>{{userInfo.fans_count}}</span>
          <span>粉丝</span>
        </div>
      </div>
      <div class="read-time">
        <div>今日阅读</div>
        <div>1分钟</div>
      </div>
    </div>
    <div v-else class="top">
      <div class="phone-wrap">
        <img @click="$router.push('/login')" class="top-phone" src="http://toutiao.research.itcast.cn/img/wd_weidl.png" alt />
      </div>
    </div>
    <!-- 操作区域  -->
    <van-grid :column-num="3">
      <van-grid-item icon="star-o" text="收藏" />
      <van-grid-item icon="underway-o" text="历史" />
      <van-grid-item icon="records" text="作品" />
    </van-grid>
    <!-- 功能区域 -->
    <van-cell-group class="bottom-warp">
      <van-cell title="消息通知" is-link />
      <van-cell title="实名认证" is-link />
      <van-cell title="用户反馈" is-link />
      <van-cell @click="$router.push({name:'robot',params:{icon:userInfo.photo}})" title="小智同学" is-link />
      <van-cell title="系统设置" is-link />
    </van-cell-group>
  </div>
</template>

<script>
import { getInfo } from "@/api/user";
export default {
  name: "index",
  data() {
    return {
      userInfo: {}
    };
  },
  async created() {
    if (this.$store.state.token) {
      // 有token代表登录了,就发请求获取当前数据
      let res = await getInfo();
      this.userInfo = res.data.data;
      console.log(res);
    }
  }
};
</script>

<style lang='less' scoped>
.mine {
  .top {
    padding: 25px 35px;
    background: #429efa;
    position: relative;
    min-height: 200px;
    box-sizing: border-box;

    .user-info {
      display: flex;
      .avatar {
        width: 60px;
        height: 60px;
        border-radius: 50%;
      }
      .name {
        margin-left: 15px;
        color: #fff;
        font-size: 18px;
      }
    }
    .phone-wrap {
      text-align: center;
      padding-top: 30px;
      .top-phone {
        width: 60px;
        height: 60px;
      }
    }
    .data-info {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;

      .data-info-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        color: #fff;
        font-size: 18px;
      }
    }
    .read-time {
      position: absolute;
      right: 0;
      top: 40px;
      color: #fff;
      background: #3780c8;
      padding: 5px 15px;
      text-align: center;
      border-top-left-radius: 30px;
      border-bottom-left-radius: 30px;
      font-size: 14px;
    }
  }
  /deep/.van-icon-star-o {
    color: #eb5253;
  }
  /deep/.van-icon-underway-o {
    color: #ff9d1d;
  }
  /deep/.van-icon-records {
    color: #6f94ff;
  }
  .bottom-warp {
    margin-top: 10px;
    .van-cell__title {
      height: 40px;
      line-height: 40px;
      span {
        font-size: 16px;
      }
    }
  }
}
</style>