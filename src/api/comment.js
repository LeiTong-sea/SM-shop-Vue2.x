import request from '@/utils/request'

export const getComments = (obj) => {
  const { goodsId, limit } = obj
  return request.get('/comment/listRows', {
    params: {
      goodsId,
      limit
    }
  })
}
