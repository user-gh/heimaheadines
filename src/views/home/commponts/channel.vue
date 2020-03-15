<template>
  <van-popup
    @closed='isEdit = false'
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
        <van-button
          plain
          hairline
          type="danger"
          round
          size="mini"
          @click="isEdit = !isEdit"
        >{{isEdit ? '完成':'编辑'}}</van-button>
      </div>
      <!-- 内容 -->
      <template v-for="(item, index) in myList">
        <van-tag class="my-tag" v-if="index != 0" :key="index">
          {{item.name}}
          <van-icon v-if="isEdit" @click="Del(item)" class="close" name="clear" color="#f00" />
        </van-tag>
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
import { AllchannelList, savechannelList, channelDel } from "@/api/channel";
export default {
  name: "channel",
  props: {
    // 我的频道列表
    // 这个值是父组件传进来的
    // 他们指向的都是同一块空间
    // 我在子组件添加一个元素,那么父组件里的那个数组也会多一个元素
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
      // 表示是否为编辑状态
      isEdit: false
    };
  },
  methods: {
    // 频道推荐的点击事件
    async addChannel(item) {
      try {
        this.$set(item,'pullLoading',false);
        this.$set(item,'loading',false);
        this.$set(item,'finished',false);
        this.$set(item,'pre_time',Date.now());
        this.$set(item,'list',[]);
        // 添加到我的频道
        this.myList.push(item);
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
    },
    // 删除频道点击事件
    async Del(item) {
      try {
        // 遍历我的数组是否与被点击的频道相等,相等就从数组中删除掉
        for (var i = 0; i < this.myList.length; i++) {
          if(this.myList[i] == item){
            // splice 删除数组的方法
            this.myList.splice(i,1);
          }
        };
        // 根据最新的myList生成这个数组
        // let channels = this.myList.slice(1).map((item,index) => {
        //   let obj = {
        //     id:item.id,
        //     seq:index +1
        //   };
        //   return obj;
        // });
         // 调用删除的方法 channelDel
        await channelDel({
          channels:item.id
        });
      } catch (error) {
        console.log(error);
      }
    }
  },
  // 计算属性
  computed: {
    //过滤之后的频道列表
    outList() {
      // 取出myList每个频道的id
      let id = this.myList.map(item => {
        return item.id;
      });
      // 过滤掉在我的频道里的其他频道
      return this.AllList.filter(item => {
        // 判断每个频道在不在myList里面
        return !id.includes(item.id);
      });
    }
  },
  //  页面一加载,获取全部频道列表
  async created() {
    try {
      let res = await AllchannelList();
      // 所有频道列表
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
  position: relative;

  .close {
    position: absolute;
    right: -8px;
    top: -8px;
  }
}
.channel-title {
  display: flex;
  justify-content: space-between;
  margin-top: 60px;
}
</style>