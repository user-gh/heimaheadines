<template>
  <div class="search">
    <div class="top-nav">
      <van-search
        v-model="key"
        @input="onInput"
        class="top-search"
        background="#3194ff"
        placeholder="请输入搜索关键词"
        @keydown.enter="$router.push(`/searchResult/${key}`)"
      />
      <span @click="$router.back()">取消</span>
    </div>
    <div class="history" v-if="suggList.length == 0">
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
      <van-cell
        v-for="(item, index) in suggList"
        :key="index"
        icon="search"
        @click="$router.push(`/searchResult/${item.oldItem}`)"
      >
      <template slot="title">
        <div v-html="item.newItem"></div>
      </template>
      </van-cell>
    </van-cell-group>
    </van-cell-group>
  </div>
</template>

<script>
import { getSuggest } from "@/api/search";
export default {
  name: "index",
  data() {
    return {
      key: "",
      suggList: [],
      timeID:null
    };
  },
  methods: {
     onInput() {
      try {
        // 使用函数防抖
        // 把代码用setTimeout包起来
        // 每次计时器执行之前清掉原有的计时器
        clearTimeout(this.timeID);
        this.timeID = setTimeout(async () => {
          console.log('执行了');
          if (this.key == "") {
          this.suggList = [];
          return;
        }
        let res = await getSuggest({
          q: this.key
        });
        this.suggList = res.data.data.options;
        // 遍历这个数组的每个元素，对每个元素进行高亮处理
        this.suggList = this.suggList.map(item => {
          // 先统一转成小写，再调用replace做替换
          let str = item.toLowerCase().replace(this.key.toLowerCase(),`<span style="font-weight:bold">${this.key}</span>`);
          return {
            oldItem: item,
            newItem:str
          }
        }); 
        }, 400);
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
      margin-left: 10px;
      margin-right: 10px;

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