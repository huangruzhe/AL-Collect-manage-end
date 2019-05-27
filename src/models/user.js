import { queryInfo } from '@/services/user';

export default {
  namespace: 'user',

  state: {
    list: [],
    currentUser: {},
  },

  effects: {
    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryInfo);
      if (!response.error) {
        yield put({
          type: 'saveCurrentUser',
          payload: {
            name: response.result.login,
          },
        });
      }
      return response;
    },
  },

  reducers: {
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload || {},
      };
    },
  },
};
