<template>
  <div class="home">
    <div class="top-nav">
      <van-icon class="top-icon" name="wap-nav" />
      <van-search class="top-search" shape="round" background="#3194ff" placeholder="请输入搜索关键词" />
      <van-icon class="top-icon" name="search" />
    </div>
    <van-tabs class="my-tabs">
      <van-tab v-for="(item,index) in channelList" :key="index" :title="item.name">
        <van-pull-refresh v-model="pullLoading" @refresh="onRefresh">
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <van-cell v-for="item in list" :key="item" :title="item" />
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { channelList } from "@/api/channel";
export default {
  name: "index",
  data() {
    return {
      // list中的v-model是控制loading加载状态,
      loading: false,
      // finished:标记是否已经把所有数据加载完毕
      finished: false,
      // 存放下面的数据
      list: [],
      // 存放频道的数组
      channelList: [],
      // pullLoading:控制下拉刷新状态 
      pullLoading: false
    };
  },
  methods: {
    // 加载数据
    // 如果loading是false就触发加载数据,如果loading是ture,就不需要触发加载数据
    onLoad() {
      let arr = [1, 2, 3, 4, 5];
      this.list.push(...arr);
      this.loading = false;
      if (this.list.length > 100) {
        this.finished = true;
      }
    },
    onRefresh() {
      setTimeout(() => {
        this.pullLoading = false;
        console.log("我被调用了");
      }, 1000);
    }
  },
  async created() {
    try {
      //获取频道数据发送请求
      let res = await channelList();
      this.channelList = res.data.data.channels;
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }
};
</script>

<style lang='less' scoped>
.home {
  margin-top: 98px;
  margin-bottom: 50px;

  .top-nav {
    display: flex;
    align-items: center;
    background: #3194ff;
    padding-left: 10px;
    padding-right: 10px;
    // 开启固定定位
    position: fixed;
    z-index: 999;
    width: 100%;
    // 设置内边距往盒子里面聚，而不是外扩
    box-sizing: border-box;
    top: 0;

    .top-icon {
      font-size: 25px;
      color: #fff;
    }

    .top-search {
      flex: 1;
    }
  }
  .my-tabs {
    /deep/.van-tabs__wrap {
      // 固定定位
      position: fixed;
      z-index: 999;
      // 我们要去看看顶部是多少高，然后就给多少
      top: 54px;
      width: 100%;
    }
  }
}
</style>