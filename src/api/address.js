import request from '../utils/request'

// 设置默认收货地址
export const setDefaultadd = (obj) => {
  const { form: { name, phone, region, detail } } = obj
  return request.post('/address/add', {
    form: {
      name,
      phone,
      region,
      detail
    }
  })
}
