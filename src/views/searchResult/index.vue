<template>
  <div class="searchResult">
    <!-- 导航栏 -->
    <van-nav-bar title="搜索结果" left-arrow @click-left="$router.back()" />
    <!-- 列表 -->
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell class="my-cell" v-for="(item, index) in list" :key="index" :title="item.title">
        <template slot="title">
          <div>
            <!-- 标题 -->
            <div>
              <span>{{item.title}}</span>
            </div>
            <!-- 图片 -->
            <van-grid :border="false" :column-num="3">
              <van-grid-item v-for="(item, index) in 3" :key="index">
                <van-image class="content-img" src="https://img.yzcdn.cn/vant/apple-1.jpg" />
              </van-grid-item>
            </van-grid>
            <!-- 作者,评论,时间等信息 -->
            <div>
              <span class="info-span">作者</span>
              <span class="info-span">0评论</span>
              <span class="info-span">1年前</span>
            </div>
            <!-- 评论,点赞,分享 -->
            <div class="share-box">
              <div class="share-content-box">
                <van-icon name="comment-o" />
                <span>评论</span>
              </div>
              <div class="share-content-box">
                <van-icon name="like-o" />
                <span>点赞</span>
              </div>
              <div class="share-content-box">
                <van-icon name="share" />
                <span>分享</span>
              </div>
            </div>
          </div>
        </template>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from "@/api/search";
export default {
  name: "index",
  data() {
    return {
      // 控制加载状态,为false代表不在加载状态
      // 为false,onload才会调用
      loading: false,
      // 加载完成状态,为false代表没加载完
      // 为true代表全部加载完
      finished: false,
      list: []
    };
  },
  methods: {
    // 加载列表数据方法,一旦调用则把loading改为true
    onLoad() {
      let str =
        '{"message": "OK", "data": {"total_count": 117135, "page": 2, "per_page": 10, "results": [{"title": "\u6211\u662f\u5982\u4f55\u89e3\u51b3 kswapd0 \u5360\u7528\u7387\u8fc7\u9ad8\u7684\u95ee\u9898\u7684", "aut_id": 2, "pubdate": "2018-11-29T17:03:28", "ch_id": 12, "cover": {"type": 3, "images": ["https://static.segmentfault.com/v-5bf531c8/global/img/squares.svg", "https://static.segmentfault.com/v-5bf531c8/global/img/squares.svg", "https://segmentfault.com/img/bV2asj?w=416&amp;h=365"]}, "is_top": 0, "art_id": 122921, "aut_name": "13552285417", "comm_count": 0, "like_count": 0, "collect_count": 0}, {"title": "\u3010\u5237\u7b97\u6cd5\u3011\u4e00\u68f5\u6811\u662f\u5426\u662f\u53e6\u4e00\u68f5\u6811\u7684\u5b50\u7ed3\u6784", "aut_id": 1, "pubdate": "2018-11-29T16:49:49", "ch_id": 15, "cover": {"type": 0, "images": []}, "is_top": 0, "art_id": 106331, "aut_name": "\u61a8\u6279", "comm_count": 0, "like_count": 0, "collect_count": 0}, {"title": "\u8fd9\u51e0\u53ea\u7968\u662f\u9ad8\u9001\u65b0\u89c4\u7b26\u5408\u6761\u4ef6\u7684", "aut_id": 3, "pubdate": "2018-11-29T17:13:53", "ch_id": 22, "cover": {"type": 0, "images": []}, "is_top": 0, "art_id": 135289, "aut_name": "18811179159", "comm_count": 0, "like_count": 0, "collect_count": 0}, {"title": "\u51b0\u7bb1\u5230\u5e95\u662f\u600e\u6837\u7684\u73b0\u4ee3\u5de5\u4e1a\u79d1\u6280\u7684\u6210\u679c\uff1f", "aut_id": 2, "pubdate": "2018-11-29T15:48:01", "ch_id": 22, "cover": {"type": 1, "images": ["https://pic1.zhimg.com/v2-00fd94eb71ba129c28225899059a803a.jpg"]}, "is_top": 0, "art_id": 54167, "aut_name": "13552285417", "comm_count": 0, "like_count": 0, "collect_count": 0}, {"title": "\u7af9\u8282\u866b\u662f\u5982\u4f55\u8d70\u8def\u7684\uff1f", "aut_id": 1, "pubdate": "2018-11-29T15:47:26", "ch_id": 22, "cover": {"type": 1, "images": ["https://pic4.zhimg.com/v2-574748da8cf2501bd8cdebb3df75a643.jpg"]}, "is_top": 0, "art_id": 53407, "aut_name": "\u61a8\u6279", "comm_count": 0, "like_count": 0, "collect_count": 0}, {"title": "Android SDK manager\u91cc\u9762\u4ec0\u4e48\u662f\u5fc5\u987b\u4e0b\u8f7d\u7684\uff1f", "aut_id": 1, "pubdate": "2018-11-29T15:37:54", "ch_id": 5, "cover": {"type": 1, "images": ["https://images2018.cnblogs.com/blog/1432855/201807/1432855-20180703161520117-1932790977.png"]}, "is_top": 0, "art_id": 42095, "aut_name": "\u61a8\u6279", "comm_count": 0, "like_count": 0, "collect_count": 0}, {"title": "\u4ec0\u4e48\u662f\u82f9\u679c\u751f\u6001\u7cfb\u7edf\uff1f", "aut_id": 2, "pubdate": "2018-11-29T15:47:23", "ch_id": 22, "cover": {"type": 1, "images": ["https://pic4.zhimg.com/v2-ba5676b576930b3ddbdb42fcb97f8552.jpg"]}, "is_top": 0, "art_id": 53346, "aut_name": "13552285417", "comm_count": 0, "like_count": 0, "collect_count": 0}, {"title": "java\u4e2dsynchronized\u5757\u662f\u600e\u4e48\u7528\u7684\u7ed9\u4e2a\u4f8b\u5b50", "aut_id": 1, "pubdate": "2018-11-29T15:08:16", "ch_id": 19, "cover": {"type": 0, "images": []}, "is_top": 0, "art_id": 7021, "aut_name": "\u61a8\u6279", "comm_count": 0, "like_count": 0, "collect_count": 0}, {"title": "JavaScript\u9a8c\u8bc1\u7528\u6237\u8f93\u5165\u7684\u662f\u5b57\u7b26\u6216\u6570\u5b57", "aut_id": 2, "pubdate": "2018-11-29T16:42:15", "ch_id": 17, "cover": {"type": 0, "images": []}, "is_top": 0, "art_id": 97080, "aut_name": "13552285417", "comm_count": 0, "like_count": 0, "collect_count": 0}, {"title": "java \u53d1\u9001\u9644\u4ef61\u662f\u6587\u4ef6\uff0c\u9644\u4ef62\u662f\u56fe\u7247\uff0c\u5185\u5bb9\u542b\u6709\u56fe\u7247\u7684\u90ae\u4ef6", "aut_id": 1, "pubdate": "2018-11-29T15:36:54", "ch_id": 16, "cover": {"type": 0, "images": []}, "is_top": 0, "art_id": 40927, "aut_name": "\u61a8\u6279", "comm_count": 0, "like_count": 0, "collect_count": 0}]}}';

      this.list = JSON.parse(str).data.results;
      this.finished = true;
    }
  }
  //    async created(){
  //       let res = await getSearchResult({
  //           q:
  //       })
  //       console.log(res);
  //   }
};
</script>
    
<style lang='less' scoped>
.searchResult {
  .van-nav-bar.van-hairline--bottom {
    background: #3296fa;
  }

  .van-nav-bar__title.van-ellipsis {
    color: #fff;
  }

  i.van-icon.van-icon-arrow-left.van-nav-bar__arrow {
    color: #fff;
  }

  .my-cell{
      margin-bottom: 20px;
      padding-bottom: 0;

    .content-img {
      height: 73px;
      margin-right: 2px;
    }

    .info-span {
      font-size: 12px;
      color: #ccc;
    }

    .share-box {
      display: flex;

      .share-content-box {
        height: 45px;
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        border-right: 0.5px solid #ccc;

        &:last-child {
          border: none;
        }
      }
      .van-icon{
          margin-right: 10px;
      }
    }
  }
}
</style>