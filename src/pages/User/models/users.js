import { message } from 'antd';
import { getUserList } from '@/services/user';

export default {
  namespace: 'users',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(getUserList, payload);
      if (!response.error) {
        yield put({
          type: 'save',
          payload: {
            list: response.result.userVMList,
            pagination: response.result.paginationVM,
          },
        });
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
  },
};
