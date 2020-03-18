<template>
  <div class="details">
    <!-- 导航栏 -->
    <van-nav-bar title="文章详情" left-arrow @click-left="$router.back()" right-text="· · ·" />
    <!-- 标题 -->
    <h2 class="title">文章标题</h2>
    <!-- 作者信息 -->
    <van-cell>
      <template slot="title">
        <div class="info">
          <img class="icon" src="http://toutiao.meiduo.site/Fkj6tQi3xJwVXi1u2swCElotfdCi" alt />
          <div class="aut-info">
            <div class="name">作者</div>
            <div class="time">1年前</div>
          </div>
          <van-button type="info" icon="plus">关注</van-button>
        </div>
      </template>
    </van-cell>
    <!-- 内容区域 -->
    <div
      class="content"
    >Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo sequi reprehenderit aliquam perferendis voluptatibus, minus itaque? Veritatis nam ipsa, veniam reprehenderit, necessitatibus, obcaecati voluptas dolor odio quia nulla suscipit non!Necessitatibus est ipsum similique aliquid laudantium optio ullam voluptates modi nemo doloribus, iste dolores dolorum, amet molestias. Sapiente blanditiis autem quas vero, officia, illo expedita modi dolorem nihil, error nesciunt!</div>
    <!-- 操作区域 -->
    <div class="opration">
      <van-button round icon="like">点赞</van-button>
      <van-button round icon="delete">不喜欢</van-button>
    </div>
    <!-- 文章图片区域 -->
    <div class="art-img">
      <img
        src="https://img-blog.csdnimg.cn/20181101123009178.PNG?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3UwMTQxMDU5Njc=,size_16,color_FFFFFF,t_70"
        alt
      />
    </div>
    <van-divider />
    <!-- 文章评论区域 -->
    <van-cell>
      <template slot="title">
        <div class="comment" v-for="(item, index) in 10" :key="index">
          <img class="icon" src="http://toutiao.meiduo.site/Ful2Y78SrMdrnBHMvgabBlUBeyWD" alt />
          <div class="com-info">
            <div class="name">作者</div>
            <div class="com-content">评论内容</div>
            <div class="btn-info">
              <span class="time">1年前</span>
              <van-button class="reply" size="small" round color="#f4f5f6">50回复</van-button>
            </div>
          </div>
          <div class="golike">
            <van-icon class="like" name="good-job-o" />
            <span class="num">10</span>
          </div>
        </div>
      </template>
    </van-cell>
    <div>
      <van-tabbar>
        <div class="bottom-com">
          <van-field placeholder="写评论" />
          <van-icon name="comment-o" />
          <van-icon name="star-o" />
          <van-icon name="share" />
        </div>
      </van-tabbar>
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
.details {
  background: #fff;

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

  .title {
    text-align: center;
  }

  .info {
    display: flex;

    .icon {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }

    .aut-info {
      flex: 1;
      margin-left: 10px;
    }
  }
  .content {
    padding: 20px 15px;
  }

  .opration {
    display: flex;
    justify-content: space-around;
  }

  .art-img {
    margin-top: 10px;
    text-align: center;
  }

  .comment {
    display: flex;
    justify-self: center;
    align-items: center;
    margin-top: 30px;

    .icon {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }

    .com-info {
      flex: 1;
      margin-left: 10px;

      .name {
        color: #406599;
      }

      .btn-info {
        .reply {
          margin-left: 10px;
          color: #000 !important;
          font-size: 10px;
        }
      }
    }

    .golike {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 18px;

      .like {
        color: #f00;
      }

      span {
        margin-right: 10px;
        margin-left: 5px;
      }
    }
  }
}
</style>