<template>
  <div class="replay">
    <van-popup
      v-model="show"
      position="bottom"
      closeable
      close-icon-position="top-left"
      :style="{ height:'60%' }"
    >
      <div class="title-count">{{item.reply_count}}条回复</div>
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-cell v-for="(item, index) in list" :key="index">
          <template slot="title">
            <div class="comment">
              <img class="icon" :src="item.aut_photo" alt />
              <div class="com-info">
                <div class="name">{{item.aut_name}}</div>
                <div class="com-content">{{item.content}}</div>
                <div class="btn-info">
                  <span class="time">{{item.pubdate | dataBefore}}</span>
                </div>
              </div>
              <div class="golike">
                <van-icon v-if="item.is_liking" @click="unlike(item)" class="like" name="like" />
                <van-icon v-else plain class="like" @click="like(item)" name="like-o" />
                <span class="num">{{item.like_count}}</span>
              </div>
            </div>
          </template>
        </van-cell>
      </van-list>
      <div class="write">
        <!-- 输入框 -->
        <van-search v-model="msg" @keydown.enter="add" class="input" placeholder="写评论" />
        <!-- 评论图标 -->
        <van-icon @click="add" class="icon" name="comment-o" />
      </div>
    </van-popup>
  </div>
</template>

<script>
// 导入获取评论内容的接口
import {
  getComments,
  CommentLike,
  CommentunLike,
  AddComments
} from "@/api/comments";
export default {
  name: "replat",
  props: {
    item: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      show: false,
      loading: false,
      finished: false,
      list: [],
      msg: "",
      offset: undefined
    };
  },
  methods: {
    async onLoad() {
      try {
        let res = await getComments({
          // 评论的回复
          type: "c",
          // 评论id
          source: this.item.com_id.toString(),
          offset: this.offset,
          // 页容量
          limit: 10
        });
        console.log(res);
        this.list.push(...res.data.data.results);
        this.offset = res.data.data.last_id;
        // 继续加载
        this.loading = false;
        if (res.data.data.last_id == res.data.data.end_id) {
          this.finished = true;
        }
      } catch (error) {
        console.log(error);
      }
    },
    // 评论点赞点击事件
    async like(item) {
      let res = await CommentLike({
        target: item.com_id.toString()
      });
      item.is_liking = true;
      item.like_count++;
      console.log(res);
    },
    // 评论取消点赞点击事件
    async unlike(item) {
      let res = await CommentunLike({
        target: item.com_id.toString()
      });
      item.is_liking = false;
      item.like_count--;
      console.log(res);
    },
    // 写评论的回车事件
    async add() {
      try {
        console.log("进入了评论回复");
        if (this.msg.trim() != "" && this.checkLogin()) {
          let res = await AddComments({
            // 评论id
            target: this.item.com_id,
            // 评论内容
            content: this.msg,
            // 文章id
            art_id: this.$route.params.art_id
          });
          this.list.unshift(res.data.data.new_obj);
          // 把输入框清空
          this.msg = "";
         // 评论数量自增1  
          this.item.reply_count++;
          console.log(res); 
        }
      } catch (error) {
        console.log(errror);
      }
    }
  }
};
</script>

<style lang='less' scoped>
.replay {
  .van-list {
    margin-bottom: 55px;
  }
  .title-count {
    text-align: center;
    margin-top: 15px;
  }
  .comment {
    display: flex;
    justify-self: center;
    align-items: center;
    margin-top: 10px;

    .icon {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }

    .com-info {
      flex: 1;
      margin-left: 10px;

      .name {
        color: #406599;
      }
    }

    .golike {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 18px;

      .like {
        color: #f00;
      }

      span {
        margin-right: 10px;
        margin-left: 5px;
      }
    }
  }
  .write {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    align-items: center;
    border: 0.5px solid #ccc;
    background: #fff;

    .input {
      flex: 1;
    }

    .icon {
      font-size: 24px;
      margin-right: 15px;
    }
  }
}
</style>