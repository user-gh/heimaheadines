<template>
  <van-popup class="photo" v-model="show">
    <div class="photo-item" @click="choosePhoto">
      从相册中选择
      <input ref="photoFile" type="file" style="display:none;" />
    </div>
    <div class="photo-item">拍照</div>
    <div class="photo-item">取消</div>
  </van-popup>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      show: false
    };
  },
  methods: {
    // 从相册中选择点击事件
    choosePhoto() {
      this.$refs.photoFile.click();
    }
  }
};
</script>

<style lang='less' scoped>
.photo {
  width: 80%;
  .photo-item {
    text-align: center;
    padding: 15px 0;
  }
}
</style>