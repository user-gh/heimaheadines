<template>
  <div class="question">
    <van-nav-bar title="问答" left-arrow />
    <div class="content" v-for="(item, index) in 5" :key="index">
      <div class="backQuestion">
        <span>黑马问答</span>
      </div>
      <div class="info">
        <img src="http://toutiao.research.itcast.cn/img/robot.jpg" alt />
        <span>搞笑的奇葩坊</span>
      </div>
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
.question {
  .van-nav-bar.van-hairline--bottom {
    background: #3296fa;
  }

  .van-nav-bar__title.van-ellipsis {
    color: #fff;
  }

  i.van-icon.van-icon-arrow-left.van-nav-bar__arrow {
    color: #fff;
  }
  .content {
    .backQuestion {
      width: 90%;
      height: 180px;
      background: #3296fa;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 20px;
      margin-top: 20px;
      span{
          color: #fff;
          font-size: 24px;
      }
    }
    .info{
        display: flex;
        margin: 20px 0 10px 20px;
        align-items: center;
        img{
            width: 40px;
            height: 40px;
            border-radius: 50%;
        }
        span{
            margin-left: 10px;
            font-size: 14px;
        }
    }
  }
}
</style>