<template>
  <div class="details">
    <!-- 导航栏 -->
    <van-nav-bar title="文章详情" left-arrow @click-left="$router.back()" right-text="· · ·" />
    <!-- 标题 -->
    <h2 class="title">{{art_content.title}}</h2>
    <!-- 作者信息 -->
    <van-cell>
      <template slot="title">
        <div class="info">
          <img class="icon" :src="art_content.aut_photo" alt />
          <div class="aut-info">
            <div class="name">{{art_content.aut_name}}</div>
            <div class="time">{{art_content.pubdate | dataBefore}}</div>
          </div>
          <van-button @click="cancelUser" v-if="art_content.is_followed" type="info" >已关注</van-button>
          <van-button @click="follow" v-else type="info" icon="plus">关注</van-button>
        </div>
      </template>
    </van-cell>
    <!-- 内容区域 -->
   <van-cell>
     <template slot="title">
       <div class="content" v-html="art_content.content" ></div>
     </template>
   </van-cell>
    <!-- 操作区域 -->
    <div class="opration">
      <van-button @click="articleunLike" v-if="art_content.attitude == 1" round plain type="danger" icon="like">点赞</van-button>
      <van-button v-else @click="articleLike" round icon="like">点赞</van-button>

      <van-button v-if="art_content.attitude == 0" type="danger" @click="articleunNotLike" plain round icon="delete">不喜欢</van-button>
      <van-button v-else @click="articleNotLike" round icon="delete">不喜欢</van-button>
    </div>
    <h3 style="padding-left:15px">猜你喜欢</h3>   
    <!-- 文章评论区域 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      > 
   <van-cell v-for="(item,index) in list" :key="index" >
      <template slot="title">
        <div class="comment">
          <img class="icon" :src="item.aut_photo" alt />
          <div class="com-info">
            <div class="name">{{item.aut_name}}</div>
            <div class="com-content">{{item.content}}</div>
            <div class="btn-info">
              <span class="time">{{item.pubdate | dataBefore}}</span>
              <van-button @click="showReplay(item)" class="reply" size="small" round color="#f4f5f6">{{item.reply_count}}回复</van-button>
            </div>
          </div>
          <div class="golike">
            <van-icon v-if="item.is_liking" @click="unlike(item)" class="like" name="like" />
            <van-icon v-else plain class="like"  @click="like(item)" name="like-o" />
            <span class="num">{{item.like_count}}</span>
          </div>
        </div>
      </template>
  </van-cell>
  </list>
</van-list>
    <div class="write">
      <!-- 输入框 --> 
      <van-search v-model="msg" @keydown.enter = 'add' class="input" placeholder="写评论"/>
      <!-- 评论图标 -->
        <van-icon class="icon" @click="add" name="comment-o" />
        <!-- 收藏图标 -->
        <van-icon v-if="art_content.is_collected" @click="articleunCollection" class="icon"    name="star" />
        <van-icon v-else @click="articleCollection"  class="icon" name="star-o" />
        <!-- 分享图标 -->
        <van-icon class="icon" name="share" />
      </div>
      <!-- 评论回复弹出框 -->
      <replay ref="replay" :item="comment_item"/>
    </div>
</template>
<script>
import { articleDetail,articleLike,articleunLike,articleNotLike,articleunNotLike,articleCollection,articleunCollection } from '@/api/newsactive'
import  { followUser,cancelUser } from '@/api/user'
import { getComments,AddComments,CommentLike,CommentunLike } from '@/api/comments.js'
import  replay  from './commponts/replay'
export default {
  components:{  
    replay
  },
  name: "index",
  data() {
    return {
      loading:false,
      finished:false,
      list:[],
      art_content:[],
      offset:undefined,
      msg:'',
      comment_item:{}
    };
  },
   async created(){
    try {
      // 获取传过来的文章id
       let val =  this.$route.params.art_id;
       let res = await articleDetail({
       article_id: val
     })
     console.log(res);
      this.art_content = res.data.data;
    } catch (error) {
      console.log(error);
    }
  },
  methods:{
    /*
      type:评论类型
            a: 对文章的评论
            c: 对文章评论的回复
      offset:评论数据的偏移量，
              不传则从第一页开始读取数据
      limit：页容量
    */ 
     async onLoad(){
      console.log('上拉加载');
      let res = await getComments({
        type:'a',
        source:this.$route.params.art_id,
        offset:this.offset,
        // 页容量
        limit:10
      })  
      // 拿到数据后先保存起来
      this.list.push( ...res.data.data.results);
      //继续加载数据
      this.loading = false;
      // 把下一页的起始标识赋值给offset
      this.offset = res.data.last_id;
      console.log(res);
      // 判断是否结束
      if(res.data.data.last_id == res.data.data.end_id){
         //代表结束了，所以要加载完毕
        this.finished = true;
      }
    },
    // 关注点击事件
    async follow(){
     try {
        // 判断是否登录，登录则关注，否则不能关注
        if(this.checkLogin()){
            await followUser({
            target:this.art_content.aut_id // 用户id
         })
         this.$toast.success('关注成功');
         // 把关注状态改为true
         this.art_content.is_followed = true;
        }
     } catch (error) {
      console.log(error);
     }
    },
    // 取消关注点击事件
    async cancelUser(){
      try {
        // 判断是否登录，登录则取消关注，否则不能取消关注
        if(this.checkLogin()){
          await cancelUser({
            aut_id:this.art_content.aut_id // 用户id
          })
          this.$toast.success('取消关注成功');
          // 把关注状态改为false
          this.art_content.is_followed = false;
        }
      } catch (error) {
        console.log(error);
      }
    },
    // 对文章点赞
    async articleLike(){
      try {
        if(this.checkLogin()){
         let res = await articleLike({
            target:this.art_content.art_id
          })
          // 把 attitude改为1 (点赞)
          this.art_content.attitude = 1;
        }
      } catch (error) {
        console.log(error);
      }
    },
    // 取消对文章点赞 
    async articleunLike(){
      try {
        if(this.checkLogin()){
         let res = await articleunLike({
            art_id:this.art_content.art_id
          })
          // 把 attitude改为-1 (取消点赞)
          this.art_content.attitude = -1;
        }
      } catch (error) {
        console.log(error);
      }
    },
    // 文章不喜欢
    async articleNotLike(){
      try {
        if(this.checkLogin()){
          let res = await articleNotLike({
            target:this.art_content.art_id
          })
          this.art_content.attitude = 0;
        }
      } catch (error) {
        console.log(error);
      }
    },
    // 取消文章不喜欢
    async articleunNotLike(){
      try {
        if(this.checkLogin()){
          let res = await articleunNotLike({
            target: this.art_content.art_id
          })
           this.art_content.attitude = -1;
        }
      } catch (error) {
        console.log(error);
      }
    },
    // 写评论的回车事件
    async add(){
      try {
        console.log("进入了添加评论")
        if(this.msg.trim() != '' && this.checkLogin()){
          let res = await AddComments({
          // 文章id
          target:this.$route.params.art_id,
          // 评论内容
          content:this.msg
          })
          this.list.unshift(res.data.data.new_obj);
          // 把输入框清空
          this.msg = ''
          console.log(res);
        }
      } catch (error) {
        console.log(errror);
      }
    },
    // 评论点赞点击事件
    async like(item){
      let res = await CommentLike({
        target:item.com_id.toString()
      })
       item.is_liking = true;
      item.like_count++;
      console.log(res);
    },
    // 评论取消点赞点击事件
    async unlike(item){
      let res = await CommentunLike({
        target:item.com_id.toString()
      })
      item.is_liking = false;
      item.like_count--;
      console.log(res);
    },
    // 对文章收藏
    async articleCollection(){
      let res = await articleCollection({
        target:this.$route.params.art_id
      })
      this.art_content.is_collected = true;
      console.log(res);
    },
    async articleunCollection(){
      let res = await articleunCollection({
        target:this.$route.params.art_id
      })
      console.log(res);
      this.art_content.is_collected = false
    },
    // 评论回复点击事件
    async showReplay(item){
      this.$refs.replay.show = true;
      this.comment_item = item;
      this.$refs.replay.loading = false,
      this.$refs.replay.finished = false,
      this.$refs.replay.list = [],
      this.$refs.replay.offset = undefined;
    }
  },
};
</script>

<style lang='less' scoped>
.details {
  background: #fff;
  min-height: 100%;
  margin-bottom: 44px;

  .van-nav-bar.van-hairline--bottom {
    background: #3296fa;
  }

  .van-nav-bar__title.van-ellipsis {
    color: #fff;
  }

  i.van-icon.van-icon-arrow-left.van-nav-bar__arrow {
    color: #fff;
  }

  span.van-nav-bar__text {
    color: #fff;
  }

  .title {
    text-align: center;
  }

  .info {
    display: flex;

    .icon {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }

    .aut-info {
      flex: 1;
      margin-left: 10px;
    }
  }

  .content {
    // padding: 20px;

    /deep/img{
      max-width: 100%;
    }
    // * 匹配所有元素
    /deep/ *{
     word-break: break-word;
      white-space: normal;
    }
  }

  .opration {
    display: flex;
    justify-content: space-around;
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

      .btn-info {
        .reply {
          margin-left: 10px;
          color: #000 !important;
          font-size: 10px;
        }
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
  .write{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    align-items: center;
    border:.5px solid #ccc;
    background: #fff;

    .input{
      flex: 1;
    }

    .icon{
      font-size: 24px;
      margin-left: 10px;
      margin-right: 10px;
    }
  }
}
</style>