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
      <van-tag
        class="my-tag"
        @click="addChannel(item)"
        v-for="(item, index) in outList"
        :key="index"
      >+{{item.name}}</van-tag>
    </div>
  </van-popup>
</template>

<script>
import { AllchannelList, savechannelList } from "@/api/channel";
export default {
  name: "channel",
  props: {
    // 我的频道列表
    myList: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      show: false,
      // 所有频道列表
      AllList: [],
      //过滤之后的频道列表
      outList: []
    };
  },
  methods: {
    // 添加频道点击事件
    async addChannel(item) {
      try {
        // 添加到我的频道
        this.myList.push(item);
        // 删除被添加的频道推荐
        for (let i = 0; i < this.outList.length; i++) {
          // 如果点击的频道等于遍历到的频道,删除这个频道
          if (this.outList[i] == item) {
            this.outList.splice(i, 1);
          }
        };
        // 准备请求保存的参数
        let channels = this.myList.slice(1).map((item, index) => {
          let obj = {
            id: item.id,
            seq: index + 1
          };
          return obj;
        });
        // 调用保存修改之后的方法
        await savechannelList({
          channels
        });
      } catch (error) {
        console.log(error);
      }
    }
  },
  //  页面一加载,获取全部频道列表
  async created() {
    try {
      let res = await AllchannelList();
      // 所有频道列表
      this.AllList = res.data.data.channels;
      // 取出myList每个频道的id
      let id = this.myList.map(item => {
        return item.id;
      });
      // 过滤掉在我的频道里的其他频道
      this.outList = this.AllList.filter(item => {
        // 判断每个频道在不在myList里面
        return !id.includes(item.id);
      });
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