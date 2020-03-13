<template>
  <div class="home">
    <div class="top-nav">
      <van-icon class="top-icon" name="wap-nav" @click="$refs.channel.show = true" />
      <van-search class="top-search" shape="round" background="#3194ff" placeholder="请输入搜索关键词" />
      <van-icon class="top-icon" name="search" />
    </div>

    <van-tabs class="my-tabs" v-model="active">
      <van-tab v-for="(item,index) in channelList" :key="index" :name="item.id" :title="item.name ">
        <van-pull-refresh v-model="item.pullLoading" @refresh="onRefresh(item)">
          <van-list
            v-model="item.loading"
            :finished="item.finished"
            finished-text="没有更多了"
            @load="onLoad(item)"
          >
            <van-cell v-for="(it,idx) in item.list" :key="idx" :title="it.title">
              <template slot="title">
                <div class="title">
                  <span>{{it.title}}</span>
                  <img
                    style="height:73px;width:116px;"
                    v-if="it.cover.type == 1"
                    :src="it.cover.images[0]"
                    alt
                  />
                </div>
                <van-grid v-if="it.cover.type == 3" :border="false" :column-num="3">
                  <van-grid-item v-for="(item, index) in it.cover.images" :key="index">
                    <van-image style="height:73px" :src="item" />
                  </van-grid-item>
                </van-grid>
                <div class="info">
                  <div>
                    <span class="info-span">{{it.aut_name}}</span>
                    <span class="info-span">{{it.comm_count}}</span>
                    <span class="info-span">{{it.pubdate}}</span>
                  </div>
                  <span class="more">x</span>
                </div>
              </template>
            </van-cell>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
    <channel ref="channel" :myList="channelList" />
  </div>
</template>

<script>
import { channelList } from "@/api/channel";
import { activeList } from "@/api/newsactive";
// 导入组件
import channel from "./commponts/channel";
export default {
  components: {
    channel
  },
  name: "index",
  data() {
    return {
      active: "",
      // 存放频道的数组
      channelList: []
    };
  },
  methods: {
    // 下拉刷新
    // 加载数据
    // 如果loading是false就触发加载数据,如果loading是ture,就不需要触发加载数据
    async onLoad(item) {
      try {
        console.log("执行上拉加载");
        let res = await activeList({
          // 频道id
          channel_id: item.id,
          // 记录上一次请求返回的pre_timetamp时间戳
          // 时间戳
          timestamp: item.pre_time,
          // 是否置顶
          with_top: 0
        });
        // 拿到新闻数据
        let arr = res.data.data.results;
        console.log(res);
        // 如果返回的是空数组，表示已经加载完毕
        if (arr.length == 0) {
          item.finished = true;
        } else {
          // 记录下一页的时间戳
          item.pre_time = res.data.data.pre_timestamp;
          // 要当前是哪个频道,就把哪个频道的数据传过来
          // 然后修改这个频道中的list
          item.list.push(...arr);
          item.loading = false;
        }
      } catch (error) {
        console.log(error);
      }
    },
    // 下拉刷新
    async onRefresh(item) {
      try {
        console.log("执行下拉刷新");
        // 把原有的时间戳改为随机的时间戳
        item.pre_time = Date.now();
        // 标记是否加载所有数据,
        item.finished = false;
        // 控制原有的loading加载状态,代表可以重新加载新数据
        item.loading = false;
        // 调用请求新闻列表的方法
        // await this.onLoad(item);
        // 下拉刷新状态为false,结束下拉框状态
        let res = await activeList({
          // 频道id
          channel_id: item.id,
          // 记录上一次请求返回的pre_timetamp时间戳
          // 时间戳
          timestamp: item.pre_time,
          // 是否置顶
          with_top: 0
        });
        // 拿到新闻数据
        let arr = res.data.data.results;
        item.list = arr;
        item.pullLoading = false;
      } catch (error) {
        console.log(error);
      }
    }
  },
  async created() {
    try {
      //获取频道数据发送请求
      let res = await channelList();
      console.log(res.data.data.channels);
      this.channelList = res.data.data.channels;
      // 根据不同的频道给出对应的数据
      this.channelList.forEach(item => {
        // pullLoading:控制下拉刷新状态
        this.$set(item, "pullLoading", false);
        // list中的v-model是控制loading加载状态,
        this.$set(item, "loading", false);
        // finished:标记是否已经把所有数据加载完毕
        this.$set(item, "finished", false);
        // 存放每一个频道下面的数据
        this.$set(item, "list", []);
        //存放时间戳,不用在界面显示
        item.pre_time = Date.now();
      });
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
  .info {
    display: flex;
    display: flex;
    justify-content: space-between;
    margin-top: 10px;

    .info-span {
      margin-right: 10px;
      color: #ccc;
    }
    .more {
      width: 23px;
      height: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid #ccc;
    }
    .title {
      display: flex;
    }
  }
}
</style>