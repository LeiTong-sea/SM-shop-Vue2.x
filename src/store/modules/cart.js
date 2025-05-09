import { deleteCart, getCartList, updateCartCount } from '@/api/cart'
// import { getCartList, updateCartCount } from '@/api/cart'

export default {
  namespaced: true,
  state () {
    return {
      cartList: []
    }
  },
  mutations: {
    // 设计一个可设置cartList的mutation
    setCartList (state, newList) {
      state.cartList = newList
    },
    changeCheck (state, goodsId) {
      const res = state.cartList.find((item) => item.goods_id === goodsId)
      res.isChecked = !res.isChecked
    },
    // changeAll (state) {
    //   const Arr = state.cartList
    //   if (Arr.every(item => item.isChecked)) {
    //     Arr.forEach(item => {
    //       item.isChecked = false
    //     })
    //   } else {
    //     const fArr = Arr.filter(item => item.isChecked === false)
    //     fArr.forEach(item => {
    //       item.isChecked = true
    //     })
    //   }
    // }
    changeAll (state, flag) {
      state.cartList.forEach((item) => {
        item.isChecked = flag
      })
    },
    changeCount (state, { goodsNum, goodsId }) {
      const res = state.cartList.find(item => item.goods_id === goodsId)
      res.goods_num = goodsNum
    }

  },
  actions: {
    async getCartAction (context) {
      const {
        data: { cartTotal, list }
      } = await getCartList()
      // const res = await getCartList()
      // console.log(res)

      // 后天返回的数据中，不包含复选框的选中状态，为了实现功能
      // 需要手动维护数据，给每一项，添加一个 isChecked 状态 （标记当前商品是都被选中）
      list.forEach((item) => {
        item.isChecked = true
      })

      context.commit('setCartList', list)
      context.commit('setCartTotal', cartTotal)
    },
    async changeCountAction (context, { goodsNum, goodsId, goodsSkuId }) {
      // 更新本地数据
      context.commit('changeCount', { goodsNum, goodsId })
      // 更新后台
      await updateCartCount(goodsId, goodsNum, goodsSkuId)
    },
    async deleteCartAction (context) {
      const selId = context.getters.selCartList.map(item => item.id)
      await deleteCart(selId)
      context.dispatch('getCartAction')
    }
  },
  getters: {
    // 求选中的商品
    selCartList (state) {
      return state.cartList.filter((item) => item.isChecked)
    },
    // 求所有总数
    cartTotal (state) {
      return state.cartList.reduce((sum, item) => sum + item.goods_num, 0)
    },
    // 求选中的总数
    selCount (state, getters) {
      return getters.selCartList.reduce((sum, item) => sum + item.goods_num, 0)
    },
    // 求选中总价
    selPrice (state, getters) {
      return getters.selCartList
        .reduce(
          (sum, item) => sum + item.goods_num * item.goods.goods_price_min,
          0
        )
        .toFixed(2)
    },
    AllChecked (state) {
      return state.cartList.every((item) => item.isChecked)
    }
  }
}
