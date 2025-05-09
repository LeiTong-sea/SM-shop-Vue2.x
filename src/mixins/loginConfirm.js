export default {
  methods: {
    loginConfirm () {
      // 判断有没有token
      if (!this.$store.getters.token) {
        // 弹窗提示用户登录
        this.$dialog
          .confirm({
            title: '温馨提示',
            message: '此时需要先登录才能继续操作',
            confirmButtonText: '去登录',
            cancelButtonText: '在逛会儿'
          })
          .then(() => {
            // on confirm
            this.$router.replace({
              path: '/login',
              query: {
                backUrl: this.$route.fullPath
              }
            })
          })
          .catch(() => {
            // on cancel
          })
        return true
      }
      return false
    }
  }
}
