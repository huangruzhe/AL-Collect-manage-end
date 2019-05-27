import { message } from 'antd';
import { getActiviList, createAtiviList, deleteActivity, getDetail,
  updateActivity, getApplyList, getCardList, couponState } from '@/services/activity';

export default {
  namespace: 'activity',

  state: {
    data: {
      list: [],
      pagination: {},
    },
    userData: {
      list: [],
      pagination: {},
    },
    cardData: {
      list: [],
      pagination: {},
    },
    activityDetail: {},
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(getActiviList, payload);
      if (!response.error) {
        yield put({
          type: 'save',
          payload: {
            list: response.result.marketingVMList,
            pagination: response.result.paginationVM,
          },
        });
      } else {
        message.error(response.message);
      }
    },
    *fetchApplyList({ payload }, { call, put }) {
      const response = yield call(getApplyList, payload);
      if (!response.error) {
        yield put({
          type: 'updateState',
          payload: {
            userData: {
              list: response.result.marketingUserVMList,
              pagination: response.result.paginationVM,
            }
          },
        });
      } else {
        message.error(response.message);
      }
    },
    *fetchCardList({ payload }, { call, put }) {
      const response = yield call(getCardList, payload);
      if (!response.error) {
        yield put({
          type: 'updateState',
          payload: {
            cardData: {
              list: response.result.list,
              pagination: response.result.paginationVM,
            }
          },
        });
      } else {
        message.error(response.message);
      }
    },
    *add({ payload, callback }, { call }) {
      const response = yield call(createAtiviList, payload);
      if (!response.error) {
        if (callback) callback();
      } else {
        message.error(response.message);
      }
    },
    *remove({ payload, callback }, { call }) {
      const response = yield call(deleteActivity, payload);
      if (!response.error) {
        if (callback) callback();
      } else {
        message.error(response.message);
      }
    },
    *updateCoupon({ payload, callback }, { call }) {
      const response = yield call(couponState, payload);
      if (!response.error) {
        message.success('核销成功');
        if (callback) callback();
      } else {
        message.error(response.message);
      }
    },
    *queryDetail({ payload, callback }, { call, put }) {
      const response = yield call(getDetail, payload);
      if (!response.error) {
        yield put({
          type: 'updateState',
          payload: {
            activityDetail: response.result,
          },
        });
        if (callback) callback();
      } else {
        message.error(response.message);
      }
    },
    *update({ payload, callback }, { call }) {
      const response = yield call(updateActivity, payload);
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
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
