<template>
  <div class="login">
    <!-- 导航栏 -->
    <van-nav-bar title="登录" />
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
      type="password"
      :error-message="valid.code"
      placeholder="请输入密码"
    >
      <template slot="left-icon">
        <span class="iconfont icon-pic-lock"></span>
      </template>
      <van-button slot="button" size="small" round color="#ededed">发送验证码</van-button>
    </van-field>
    <!-- 登录按钮 -->
    <van-button type="info" size="large" @click="doLogin">登录</van-button>
  </div>
</template>

<script>
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
      }
    };
  },
  methods: {
    // 登录点击事件
    doLogin() {
      if (this.checkLogin()) {
        console.log("全部通过");
      }
    },
    // 登录校验方法
    checkLogin() {
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
    }
  }
};
</script>

<style scoped lang='less'>
.login {
  .van-nav-bar.van-hairline--bottom {
    background: #3296fa;
  }

  .van-nav-bar__title.van-ellipsis {
    color: #fff;
  }

  .van-button--large {
    width: 90%;
    display: block;
    margin: 40px auto 0px;
  }
  .van-cell {
    .van-button {
      color: #000 !important;
    }
  }
}
</style>z