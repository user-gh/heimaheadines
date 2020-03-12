<template>
  <van-popup
    closeable
    close-icon-position="top-left"
    position="left"
    v-model="show"
    :style="{ height:'100%',width:'80%'}"
  >
    <!-- 我的频道 -->
    <div class="title">
      <!-- 标题部分 -->
      <div class="channel-title">
        <span>我的频道</span>
        <van-button plain hairline type="danger" round size="mini">编辑</van-button>
      </div>
      <!-- 内容 -->
      <template v-for="(item, index) in myList">
        <van-tag class="my-tag" v-if="index != 0" :key="index">{{item.name}}</van-tag>
      </template>
    </div>
    <!-- 频道推荐 -->
    <div class="content">
      <!-- 标题部分 -->
      <div class="channel-title">
        <span>频道推荐</span>
      </div>
      <!-- 内容 -->
      <van-tag class="my-tag" v-for="(item, index) in AllList" :key="index">+{{item.name}}</van-tag>
    </div>
  </van-popup>
</template>

<script>
import { AllchannelList } from "@/api/channel";
export default {
  name: "channel",
  props: {
    myList: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      show: false,
      AllList:[]
    };
  },
  //  页面一加载,获取全部频道列表
  async created() {
    try {
      let res = await AllchannelList();
      this.AllList = res.data.data.channels;
    } catch (error) {
      console.log(error);
    }
  }
};
</script>

<style lang='less' scoped>
/deep/.van-icon-cross::before {
  content: "\F042";
  color: #000;
  font-size: 24px;
}
.title {
  padding-left: 10px;
  padding-right: 5px;
}
.content {
  margin-top: 20px;
  padding-left: 10px;
  padding-right: 5px;
}
.my-tag {
  margin-top: 20px;
  margin-right: 10px;
}
.channel-title {
  display: flex;
  justify-content: space-between;
  margin-top: 60px;
}
</style>