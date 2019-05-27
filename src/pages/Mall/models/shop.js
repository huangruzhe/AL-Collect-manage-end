import { message } from 'antd';
import { getShopList, getCategoryList, createCateGory, updateCateGory,
  deleteCategory, createShop, updateShop, deleteShop } from '@/services/shop';

export default {
  namespace: 'shop',

  state: {
    data: {
      list: [],
      pagination: {},
    },
    categoryList: [], // 店铺分类
  },

  effects: {
    // 获取店铺列表
    *fetch({ payload }, { call, put }) {
      const response = yield call(getShopList, payload);
      if (!response.error) {
        yield put({
          type: 'save',
          payload: {
            list: response.result.shopVMList,
            pagination: response.result.paginationVM,
          },
        });
      } else {
        message.error(response.message);
      }
    },
    // 获取店铺分类
    *fetchCategory({ payload }, { call, put }) {
      const response = yield call(getCategoryList, payload);
      if (!response.error) {
        yield put({
          type: 'updateState',
          payload: {
            categoryList: response.result,
          },
        });
      } else {
        message.error(response.message);
      }
    },
    // 创建分类
    *categoryCreate({ payload }, { call, put }) {
      const response = yield call(createCateGory, payload);
      if (!response.error) {
        yield put({
          type: 'fetchCategory',
        });
      } else {
        message.error(response.message);
      }
    },
    // 编辑分类
    *categoryUpdate({ payload }, { call, put }) {
      const response = yield call(updateCateGory, payload);
      if (!response.error) {
        yield put({
          type: 'fetchCategory',
        });
      } else {
        message.error(response.message);
      }
    },
    // 删除分类
    *categoryDelete({ payload }, { call, put }) {
      const response = yield call(deleteCategory, payload);
      if (!response.error) {
        yield put({
          type: 'fetchCategory',
        });
      } else {
        message.error(response.message);
      }
    },
    // 添加店铺
    *add({ payload, callback }, { call }) {
      const response = yield call(createShop, payload);
      if (!response.error) {
        if (callback) callback();
      } else {
        message.error(response.message);
      }
    },
    // 删除店铺
    *remove({ payload, callback }, { call }) {
      const response = yield call(deleteShop, payload);
      if (!response.error) {
        if (callback) callback();
      } else {
        message.error(response.message);
      }
    },
    // 修改店铺
    *update({ payload, callback }, { call }) {
      const response = yield call(updateShop, payload);
      if (!response.error) {
        if (callback) callback();
      } else {
        message.error(response.message);
      }
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
    updateState(state, action) {
      return {
        ...state,
        ...action.payload,
      }
    },
  },
};
