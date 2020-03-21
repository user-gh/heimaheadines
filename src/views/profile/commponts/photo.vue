<template>
  <van-popup class="photo" v-model="show">
    <div class="photo-item" @click="choosePhoto">
      从相册中选择
      <input ref="photoFile" type="file" @change="filechange" style="display:none;" />
    </div>
    <div class="photo-item">拍照</div>
    <div class="photo-item">取消</div>
  </van-popup>
</template>

<script>
// 导入图片预览
import { ImagePreview } from "vant";
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
      // 弹出文件选择器
      this.$refs.photoFile.click();
    },
    // 文件选择后的cchange事件
    filechange() {
      // 把文件对象转成临时路径
      let url = URL.createObjectURL(this.$refs.photoFile.files[0]);
      // 图片预览功能配置
      ImagePreview({
        // 放图片路径
        images: [url],
        // 默认显示第几张
        startPosition: 1,
        // 关闭事件
        onClose() {
          Dialog.confirm({
            message: "是否设置该图片为头像"
          })
            .then(() => {
              // on confirm
            })
            .catch(() => {
              // on cancel
            });
        },
        // 展示关闭按钮
        closeable: true,
        // 关闭页码
        showIndex: false
      });
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