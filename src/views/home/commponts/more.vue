<template>
  <van-popup class="show" v-model="show">
    <van-cell-group v-if="isFirst">
      <van-cell @click="dislike" title="不感兴趣" icon="failure" />
      <van-cell title="反馈垃圾内容" icon="warn-o" is-link @click="isFirst= false" />
      <van-cell title="拉黑作者" icon="delete" />
    </van-cell-group>
    <van-cell-group v-else>
      <van-cell icon="arrow-left" @click="isFirst = true" />
      <van-cell
        v-for="(item, index) in reportList"
        :key="index"
        :title="item.title"
        @click="report(item.type)"
      />
    </van-cell-group>
  </van-popup>
</template>

<script>
import { activedislike ,activereports } from "@/api/newsactive";
export default {
  name: "more",
  data() {
    return {
      // 更多操作是否显示
      show: false,
      // 文章id
      art_id: "",
      // 文章数组
      art_list: [],
      // 标记显示第一个面板
      isFirst: true,
      reportList: [
        { type: 1, title: "标题夸张" },
        { type: 2, title: "低俗色情" },
        { type: 3, title: "错别字多" },
        { type: 4, title: "旧闻重复" },
        { type: 5, title: "广告软文" },
        { type: 6, title: "内容不实" },
        { type: 7, title: "涉嫌违法范围" },
        { type: 8, title: "侵权" },
        { type: 0, title: "其他问题" }
      ]
    };
  },
  methods: {
    async dislike() {
      try {
        // 遍历文章数组
        for (var i = 0; i < this.art_list.length; i++) {
          if (this.art_list[i].art_id == this.art_id) {
            this.art_list.splice(i, 1);
            break;
          }
        }
        // 弹出提示
        this.$toast("不喜欢成功");
        this.show = false;
        let res = await activedislike({
          target: this.art_id.toString()
        });
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * report:举报文章事件
     * target:被举报的id
     * type:举报的类型
     */
    async report(type) {
      try {
        // 遍历文章数组并删除，这样举报后就看不见了
        for (var i = 0; i < this.art_list.length; i++) {
          if (this.art_list[i].art_id == this.art_id) {
            this.art_list.splice(i, 1);
            break;
          }
        }
        let res = await activereports({
          target:this.art_id,
          type:type,
          remark:'色情而低俗'
        })
         this.$toast("举报成功");
         this.show = false;
         this.isFirst = true;
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style  scoped>
.show {
  width: 80%;
}
</style>