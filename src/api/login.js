// 获取图形验证码
import request from '@/utils/request'
export const getPicCode = () => {
  return request.get('/captcha/image')
}

// 获取短信验证码
export const getMsgCode = (captcahCode, captchaKey, mobile) => {
  return request.post('/captcha/sendSmsCaptcha', {
    form: {
      captcahCode,
      captchaKey,
      mobile
    }
  })
}

// 登录接口
export const codeLogin = (mobile, smsCode) => {
  return request.post('/passport/login', {
    form: {
      isParty: false,
      mobile,
      partyData: {},
      smsCode
    }
  })
}
