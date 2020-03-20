<template>
  <div class="mine">
    <!-- 头部区域 -->
    <div class="top">
      <!-- 用户信息 -->
      <div class="user-info">
        <img class="avatar" src="http://toutiao.meiduo.site/Fkj6tQi3xJwVXi1u2swCElotfdCi" alt />
        <span class="name">黑马小公举1号</span>
        <van-button size="mine" round>申请认证</van-button>
      </div>
      <!-- 统计数据 -->
      <div class="data-info">
        <div class="data-info-item">
          <span>0</span>
          <span>动态</span>
        </div>
        <div class="data-info-item">
          <span>4</span>
          <span>关注</span>
        </div>
        <div class="data-info-item">
          <span>0</span>
          <span>粉丝</span>
        </div>
      </div>
      <div class="read-time">
        <div>今日阅读</div>
        <div>1分钟</div>
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
      <van-cell title="小智同学" is-link />
      <van-cell title="系统设置" is-link />
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
.mine {
  .top {
    padding: 25px 35px;
    background: #429efa;
    position: relative;
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