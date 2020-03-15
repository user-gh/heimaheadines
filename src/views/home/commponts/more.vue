<template>
  <van-popup class="show" v-model="show">
    <van-cell-group>
      <van-cell @click="dislike" title="不感兴趣" icon="failure" />
      <van-cell title="反馈垃圾内容" icon="warn-o" is-link />
      <van-cell title="拉黑作者" icon="delete" />
    </van-cell-group>
  </van-popup>
</template>

<script>
import { activedislike } from "@/api/newsactive";
export default {
  name: "more",
  data() {
    return {
      // 更多操作是否显示
      show: false,
      // 文章id
      art_id: "",
      // 文章数组
      art_list: []
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
    }
  }
};
</script>

<style  scoped>
.show {
  width: 80%;
}
</style>