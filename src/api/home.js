import request from '@/utils/request'
export const getHomeDate = () => {
  return request.get('/page/detail', {
    params: {
      pageId: 0
    }
  })
}
