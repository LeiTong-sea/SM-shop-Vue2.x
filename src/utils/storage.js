// 约定一个通用键名
const INFO_KEY = 'sm_shopping_info'

// 获取
export const getInfo = () => {
  const defaultObj = {
    token: '',
    userId: ''
  }
  const result = localStorage.getItem(INFO_KEY)
  return result ? JSON.parse(result) : defaultObj
}

// 修改/设置
export const setInfo = (obj) => {
  localStorage.setItem(INFO_KEY, JSON.stringify(obj))
}

// 移除
export const removeInfo = () => {
  localStorage.removeItem(INFO_KEY)
}

// 约定一个键名，搜索历史记录
const SEARCH_HISTORY_KEY = 'sm_search_history'
// 获取
export const getSearchHistory = () => {
  return JSON.parse(localStorage.getItem(SEARCH_HISTORY_KEY) || '[]')
}
// 修改/设置
export const setSearchHistory = (arr) => {
  localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(arr))
}
