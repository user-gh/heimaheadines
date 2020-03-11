<template>
  <div class="login">
    <!-- 导航栏 -->
    <van-nav-bar title="黑马头条" />
    <!-- 两个输入框 -->
    <van-field
      v-model="form.mobile"
      left-icon="smile-o"
      :error-message="valid.mobile"
      placeholder="请输入手机号"
    >
      <template slot="left-icon">
        <span class="iconfont icon-icon"></span>
      </template>
    </van-field>
    <van-field
      v-model="form.code"
      left-icon="smile-o"
      :error-message="valid.code"
      placeholder="请输入验证码"
    >
      <template slot="left-icon">
        <span class="iconfont icon-pic-lock"></span>
      </template>
      <!-- <van-button slot="button" size="small" round color="#ededed">发送验证码</van-button> -->
    </van-field>
    <van-cell class="cell-bottom" value="忘记密码">
      <!-- 使用 title 插槽来自定义标题 -->
      <template slot="title">
        <span>
          <van-radio name="1" shape="square">自动登录</van-radio>
        </span>
      </template>
    </van-cell>

    <!-- 登录按钮 -->
    <van-button
      type="info"
      :loading="isloading"
      loading-text="登录中..."
      size="large"
      @click="doLogin"
    >登录</van-button>
    <span class="span">你还可以选择以下方式登录</span>
    <div class="imgs">
      <img src="../../images/WeChat.png" alt />
      <img src="../../images/QQ.png" alt />
      <img src="../../images/Weibo.png" alt />
    </div>
    <span class="word">隐私条款</span>
  </div>
</template>

<script>
import { login } from "@/api/login.js";
export default {
  name: "index",
  data() {
    return {
      form: {
        mobile: "",
        code: ""
      },
      valid: {
        mobile: "",
        code: ""
      },
      isloading: false
    };
  },
  // async mounted() {
  //   let text = await this.test(2);
  //   console.log(text);
  //   let text2 = await this.test2(2);
  //   console.log(text2);
  // },
  methods: {
    // async test(num) {
    //   try {
    //     if (num == 1) {
    //       return "当前num==1";
    //     } else {
    //       return "当前num==其他";
    //     }
    //   } catch (error) {
    //     return {
    //       code: "500",
    //       msg: "执行错误，抛出异常"
    //     };
    //   }
    // },
    // async test2(num) {
    //   try {
    //     if (num == 1) {
    //       return "当前num2==1";
    //     } else {
    //       return "当前num2==其他";
    //     }
    //   } catch (error) {
    //     return "执行错误，抛出异常";
    //   }
    // },
    // 登录点击事件
    async doLogin() {
      try {
        if (this.checkLogin()) {
          console.log("全部通过");
          // 开启loading
          this.isloading = true;
          let res = await login(this.form);
          console.log(res);
          if (res.status == 201) {
            // 登录成功把token存到vuex中
            this.$store.commit("changeToken", res.data.data.token);
            this.$store.commit("changeRefToken", res.data.data.refresh_token);
            // 还要存到localStorage
            window.localStorage.setItem(
              "tokenInfo",
              JSON.stringify(res.data.data)
            );
            // 跳转首页
            this.$router.push("/home");
          } else {
            console.log("手机或验证码错误");
          }
        }
      } catch (error) {
        //函数错误输出
        console.log(error);
      } finally {
        // 关闭loading
        this.isloading = false;
      }
    },
    // 登录校验方法
    async checkLogin() {
      try {
        let falg = true;
        if (/0?(13|14|15|18|17)[0-9]{9}/.test(this.form.mobile)) {
          this.valid.mobile = "";
          falg = true;
        } else {
          this.valid.mobile = "请输入正确的手机号";
          falg = false;
        }
        if (this.form.code.length == 6) {
          this.valid.code = "";
          falg = true;
        } else {
          this.valid.code = "请输入正确的验证码";
          falg = false;
        }
        return falg;
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style scoped lang='less'>
.login {
  height: 100%;
  background: #f5f5f5;

  .van-cell {
    margin-top: 10px;
  }

  .van-nav-bar.van-hairline--bottom {
    background: #3296fa;
  }

  .van-nav-bar__title.van-ellipsis {
    color: #fff;
  }

  .cell-bottom {
    background: #f5f5f5;
    margin-top: 10px;
  }

  .van-button--large {
    width: 90%;
    display: block;
    margin: 15px auto 0px;
    background: #6db4fb;
  }

  .van-cell {
    .van-button {
      color: #000 !important;
    }

    .van-cell__value {
      span {
        color: blue;
      }
    }
  }
  .span {
    display: block;
    margin-top: 30px;
    color: #999;
    text-align: center;
  }

  .imgs {
    display: flex;
    justify-content: space-around;
    margin-top: 35px;

    img {
      height: 60px;
    }
  }

  .word {
    display: block;
    text-align: center;
    margin-top: 270px;
    color: #666;
  }
}
</style>z