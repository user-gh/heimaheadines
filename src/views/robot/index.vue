<template>
  <div class="robot">
    <!-- 导航栏 -->
    <van-nav-bar title="小智机器人" left-arrow @click-left="$router.back()" />
    <div class="chat-warp" ref="chat">
      <div class="chat-item" v-for="(item, index) in list" :key="index" :class="{ user:item.isMe }">
        <img
          class="icon"
          :src="item.isMe ? $route.params.icon : 'http://toutiao.research.itcast.cn/img/robot.jpg'"
          alt
        />
        <div class="content">{{item.content}}</div>
      </div>
    </div>
    <!-- <div class="chat-warp user">
      <div class="chat-item">
        <img class="icon" src="http://toutiao.research.itcast.cn/img/robot.jpg" alt />
      </div>
      <div class="content">你好</div>
    </div>-->
    <van-search
      class="mysearch"
      v-model="msg"
      shape="round"
      background="#f5f5f5"
      left-icon
      placeholder="请输入..."
      show-action
      action-text="发送"
      @keydown.enter="send"
    />
  </div>
</template>

<script>
import io from "socket.io-client";
export default {
  name: "index",
  data() {
    return {
      msg: "",
      list: [],
      socket: null
    };
  },
  methods: {
    send() {
      // 判断是否为空,为空返回
      if (this.msg == "") return;
      // 如果不为空,就把输入的内容发送给服务器
      // 发送消息
      this.socket.emit("message", {
        msg: this.msg,
        timestamp: Date.now()
      });
      // 添加到数组中就能看到
      this.list.push({
        isMe: true,
        content: this.msg
      });
      // 自动滚动
      this.$nextTick(() => {
        this.$refs.chat.scrollTop = this.$refs.chat.scrollHeight;
      });
      // 清空输入框
      this.msg = "";
    }
  },
  created() {
    // 发送请求
    this.socket = io(
      `http://ttapi.research.itcast.cn?token=${this.$store.state.token}`
    );
    // 接收返回的消息
    this.socket.on("message", data => {
      console.log(data);
      // 添加到数组中就能看到
      this.list.push({
        isMe: false,
        content: data.msg
      });
      // 自动滚动
      this.$nextTick(() => {
        this.$refs.chat.scrollTop = this.$refs.chat.scrollHeight;
      });
    });
  }
};
</script>

<style lang='less' scoped>
.robot {
  .van-nav-bar.van-hairline--bottom {
    background: #3296fa;
  }

  .van-nav-bar__title.van-ellipsis {
    color: #fff;
  }

  i.van-icon.van-icon-arrow-left.van-nav-bar__arrow {
    color: #fff;
  }
  .chat-warp {
    margin-top: 10px;
    margin-left: 10px;
    overflow: auto;
    position: fixed;
    top: 44px;
    bottom: 54px;
    width: 100%;

    .chat-item {
      display: flex;
      margin-top: 10px;
      margin-right: 10px;
      &.user {
        // 翻转
        flex-direction: row-reverse;
        .content {
          background: greenyellow;
        }
      }
      .icon {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
      .content {
        max-width: 48%;
        background: #e0effb;
        border-radius: 10px;
        padding: 10px;
        margin-left: 10px;
      }
    }
  }
  .van-search__content.van-search__content--round {
    background: #fff;
  }
  .mysearch {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
  }
}
</style>