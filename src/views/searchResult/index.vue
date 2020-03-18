<template>
  <div class="searchResult">
    <!-- 导航栏 -->
    <van-nav-bar title="搜索结果" left-arrow @click-left="$router.back()" />
    <!-- 列表 -->
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell class="my-cell" v-for="(item, index) in list" :key="index" :title="item.title">
        <template slot="title">
          <div @click="$router.push(`/details/${item.art_id}`)">
            <!-- 标题 -->
            <div style="display:flex; justify-content:space-between;">
              <span>{{item.title}}</span>
              <img
                style="height:73px;width:116px;"
                v-if="item.cover.type == 1"
                :src="item.cover.images[0]"
                alt
              />
            </div>
            <!-- 图片 -->
            <van-grid v-if="item.cover.type == 3" :border="false" :column-num="3">
              <van-grid-item v-for="(item, index) in item.cover.images" :key="index">
                <van-image style="height:73px" class="content-img" :src="item" />
              </van-grid-item>
            </van-grid>
            <!-- 作者,评论,时间等信息 -->
            <div>
              <span class="info-span">{{item.aut_name}}</span>
              <span class="info-span">{{item.comm_count}}评论</span>
              <span class="info-span">{{item.pubdate | dataBefore}}</span>
            </div>
            <!-- 评论,点赞,分享 -->
            <div class="share-box">
              <div class="share-content-box" @click="goComment">
                <van-icon name="comment-o" />
                <span>{{item.comm_count}}评论</span>
              </div>
              <div class="share-content-box" @click="golike">
                <van-icon name="like-o" />
                <span>{{item.like_count}}点赞</span>
              </div>
              <div class="share-content-box">
                <van-icon name="share" />
                <span>{{item.collect_count}}分享</span>
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
      // 搜索结果列表
      list: [],
      // 结果页码
      page: 1,
      // 页容量
      per_page: 10
    };
  },
  methods: {
    /**
     *  onload: 下拉加载数据事件
     *  请求参数:
     *        page: 页码(1)
     *        per_page: 页容量(10)
     *              q : 搜索关键字
     * */

    // 加载列表数据方法,一旦调用则把loading改为true
    async onLoad() {
      try {
        console.log("执行上拉加载");
        // 接收传过来的搜索关键字
        let val = this.$route.params.key;
        let res = await getSearchResult({
          page: this.page,
          per_page: this.per_page,
          q: val
        });
        console.log(res);
        // 下拉加载第2页，第2页数据....
        this.page++;
        // 搜索结果(10条)
        let arr = res.data.data.results;
        // 得出总页码(总条数据除以页容量并向上取整)
        let lastPage = Math.ceil(res.data.data.totalpage / this.per_page);
        // 如果当前页码大于总页码,则停止加载
        if (this.page > lastPage) {
          this.finished = true;
        } else {
          // 将加载的数据添加到数组中
          this.list.push(...arr);
          // 为false，再次调用onLoad
          this.loading = false;
        }
      } catch (error) {
        console.log(error);
      }
    },
    // 去评论的点击事件
    goComment() {
      if(this.checkLogin()){
        console.log('去评论');
      }
    },
    // 去点赞的点击事件
    golike(){
      if(this.checkLogin()){
        console.log('去点赞');
      }
    }
  }
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

  .my-cell {
    margin-bottom: 20px;

    .content-img {
      height: 73px;
      margin-right: 2px;
    }

    .info-span {
      font-size: 12px;
      color: #ccc;
      margin-right: 15px;
    }

    .share-box {
      display: flex;
      border-top: 0.5px solid #ccc;

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

      .van-icon {
        margin-right: 10px;
      }
    }
  }
}
</style>