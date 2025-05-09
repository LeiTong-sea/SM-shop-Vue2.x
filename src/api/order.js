import request from '@/utils/request'
// 为了方便后续制服余额不足问题，请再次使用其他手机号重新登录，将delivery数值改成20，为上门取件，即不用填写地址，自然也没有新手机号无地址的情况。
// 这样的情况分两种，一种是购物车提交订单，第二种是商品页直接购买提交订单，那么为了分情况，将第一种设置为delivery=10，第二种设置为delivery=20。实现体验两种效果。
export const checkOrder = (mode, obj) => {
  return request.get('/checkout/order', {
    params: {
      mode,
      delivery: 20,
      couponId: 0,
      isUsePoints: 0,
      ...obj
    }
  })
}

export const submitOrder = (mode, obj) => {
  // const delivery = mode === 'buyNow' ? 20 : 10
  return request.post('/checkout/submit', {
    mode,
    delivery: 10,
    couponId: 0,
    isUsePoints: 0,
    payType: 10,
    ...obj
  })
}

// 订单列表
export const getMyOrderList = (dataType, page) => {
  return request.get('/order/list', {
    params: {
      dataType,
      page
    }
  })
}
