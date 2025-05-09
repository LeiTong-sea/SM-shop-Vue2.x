<template>
  <div class="login">
    <!-- 头部 -->
    <van-nav-bar title="登录" left-arrow @click-left="$router.back()" />
    <!-- 主体 -->
    <div class="login-body">
      <div class="login-title">
        <h1>手机号登录</h1>
        <p>未注册的手机号登录后将自动注册</p>
      </div>
      <div class="login-input">
        <div class="login-input-num">
          <input v-model="mobile" type="text" placeholder="请输入手机号" />
        </div>
           <!-- 登录使用手机号 13811112222 后续订单页面才可以提供地址信息 -->
        <div class="login-input-Pcode">
          <input v-model="picCode" type="text" placeholder="请输入图形验证码" />
          <img v-if="picUrl" :src="picUrl" @click="getPicode" alt="" />
        </div>
             <!-- 因为提供的登录接口问题，即使图片验证码不匹配也可以登录，只要是符合正则表达式的规则即可 -->
        <div class="login-input-Mcode">
          <input v-model="smsCode" type="text" placeholder="请输入短信验证码" />
              <!-- 未提供短信接口，暂时不做短信验证码验证，默认246810为测试验证码，输入即可 -->
          <button @click="getCode">
            {{ totalTime === time ? '获取验证码' : time + '秒后重新发送' }}
            </button>
        </div>
      </div>
      <button @click="login" class="login-button">登录</button>
    </div>
  </div>
</template>

<script>
import { codeLogin, getMsgCode, getPicCode } from '@/api/login'
import { Toast } from 'vant'
export default {
  name: 'loginIndex',
  data () {
    return {
      picCode: '', // 图形验证码
      picKey: '', // 图形验证码的key
      picUrl: '', // 图形验证码的url地址
      totalTime: 60, // 倒计时
      time: 60, // 当前倒计时
      timer: null, // 计时器
      mobile: '', // 手机号
      smsCode: '', // 短信验证码
      ifSendCode: ''
    }
  },
  created () {
    this.getPicode(1)
  },
  // 离开页面清除定时器
  destroyed () {
    clearInterval(this.timer)
  },
  methods: {
    // 获取图形验证码
    async getPicode (num) {
      const {
        data: { key, base64 }
      } = await getPicCode()
      this.picKey = key // 存唯一标识
      this.picUrl = base64 // 存地址
      // 防止进入页面直接触发提示框
      if (num !== 1) {
        Toast('获取图形验证码成功 (≧◡≦) ♡')
      }
    },

    // 获取短信验证码
    async getCode () {
      if (!this.validFn()) {
        return
      }
      // 发送请求
      await getMsgCode(this.picCode, this.picKey, this.mobile)
      // 节流处理
      if (!this.timer && this.time === this.totalTime) {
        // 设置定时器
        this.timer = setInterval(() => {
          this.time--
          if (this.time <= 0) {
            clearInterval(this.timer)
            this.timer = null
            this.time = this.totalTime
          }
        }, 1000)
      }
    },

    // 校验信息
    validFn (n) {
      if (!/^1[3-9]\d{9}$/.test(this.mobile)) {
        Toast('请输入正确的手机号')
        return false
      }
      if (!/^\w{4}$/.test(this.picCode)) {
        Toast('请输入正确的图形验证码')
        return false
      }
      if (!n && this.totalTime === this.time) {
        Toast('短信验证码发送成功成功 (´▽`ʃ♡ƪ)')
      }
      return true
    },

    // 登录
    async login () {
      if (!this.validFn(1)) {
        return
      }
      if (!/^\d{6}$/.test(this.smsCode)) {
        Toast('请输入正确的短信验证码')
        return
      }
      const res = await codeLogin(this.mobile, this.smsCode)
      this.$store.commit('user/setUserInfo', res.data)
      console.log(res)
      Toast('登录成功 (๑•̀ㅂ•́)و✧')
      const url = this.$route.query.backUrl || '/'
      this.$router.replace(url)
    }
  }
}
</script>

<style scoped lang="less">
.login-body {
  width: 80%;
  height: 100%;
  margin: 0 auto;
  .login-title {
    margin-top: 80px;
    h1 {
      font-weight: 400;
      margin-bottom: 10px;
    }
    p {
      font-size: 18px;
      color: #999;
    }
    margin-bottom: 60px;
  }
  .login-input {
    margin-bottom: 40px;
    input {
      width: 100%;
      height: 60px;
      border: none;
      padding: 0 10px;
      font-size: 20px;
      color: #333;
    }
    .login-input-num {
      margin-bottom: 20px;
      border-bottom: 1px solid #ccc;
    }
    .login-input-Pcode {
      border-bottom: 1px solid #ccc;
      margin-bottom: 20px;
      display: flex;
      img {
        right: 15px;
        width: 30%;
        height: 30%;
      }
    }
    .login-input-Mcode {
      border-bottom: 1px solid #ccc;
      margin-bottom: 20px;
      display: flex;
      button {
        width: 200px;
        height: 60px;
        border: none;
        font-size: 14px;
        color: #cea26a;
        background-color: transparent;
        padding: 20px 20px;
        cursor: pointer;
      }
    }
  }
  .login-button {
    width: 100%;
    height: 60px;
    background-color: #cea26a;
    border: none;
    border-radius: 30px;
    color: #fff;
    font-size: 22px;
    cursor: pointer;
    margin-top: 40px;
    background: linear-gradient(to right, rgb(255, 201, 147), #ff8b25);
  }
}
</style>
