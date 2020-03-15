<template>
  <div class="search">
    <div class="top-nav">
      <van-search
        v-model="key"
        @input="onInput"
        class="top-search"
        background="#3194ff"
        placeholder="请输入搜索关键词"
      />
      <span @click="$router.back()">取消</span>
    </div>
    <div class="history" v-if="isHistory">
      <div class="title">
        <span>历史记录</span>
        <van-icon class="del-icon" name="delete" />
      </div>
      <div class="history-content">
        <van-row>
          <van-col class="col-span" span="12">111</van-col>
          <van-col class="col-span" span="12">111</van-col>
          <van-col class="col-span" span="12">111</van-col>
          <van-col class="col-span" span="12">111</van-col>
        </van-row>
      </div>
    </div>
    <van-cell-group v-else>
      <van-cell v-for="(item, index) in suggList" :key="index" :title="item" icon="search" />
    </van-cell-group>
  </div>
</template>

<script>
import { getSuggest } from "@/api/search";
export default {
  name: "index",
  data() {
    return {
      // 是否显示历史记录
      isHistory: true,
      key: '',
      suggList: []
    };
  },
  methods: {
    async onInput() {
      try {
        if (this.key == "") {
          this.isHistory = true;
          return;
        }
        let res = await getSuggest({
          q:this.key
        });
        console.log(res);
        this.suggList = res.data.data.options;
        this.isHistory = false;
      } catch (error) {
        console.log(error);
      } 
    }
  }
};
</script>

<style lang='less' scoped>
.search {
  .top-nav {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #3194ff;

    .top-search {
      width: 85%;
    }

    span {
      flex: 1;
      color: #fff;
    }
  }
  .history {
    background: #fff;

    .title {
      height: 44px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .del-icon {
        font-size: 25px;
      }
    }

    .history-content {
      .col-span {
        border-top: 0.5px solid #ccc;
        border-right: 0.5px solid #ccc;
        height: 44px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>