import dva from 'dva';
import createLoading from 'dva-loading';

const runtimeDva = window.g_plugins.mergeConfig('dva');
let app = dva({
  history: window.g_history,
  ...((require('/Users/zz-huangruzhe/huangruzhe/788/manage-front-end/src/dva.js').config || (() => ({})))()),
  ...(runtimeDva.config || {}),
});

window.g_app = app;
app.use(createLoading());
(runtimeDva.plugins || []).forEach(plugin => {
  app.use(plugin);
});

app.model({ namespace: 'global', ...(require('/Users/zz-huangruzhe/huangruzhe/788/manage-front-end/src/models/global.js').default) });
app.model({ namespace: 'list', ...(require('/Users/zz-huangruzhe/huangruzhe/788/manage-front-end/src/models/list.js').default) });
app.model({ namespace: 'login', ...(require('/Users/zz-huangruzhe/huangruzhe/788/manage-front-end/src/models/login.js').default) });
app.model({ namespace: 'menu', ...(require('/Users/zz-huangruzhe/huangruzhe/788/manage-front-end/src/models/menu.js').default) });
app.model({ namespace: 'project', ...(require('/Users/zz-huangruzhe/huangruzhe/788/manage-front-end/src/models/project.js').default) });
app.model({ namespace: 'setting', ...(require('/Users/zz-huangruzhe/huangruzhe/788/manage-front-end/src/models/setting.js').default) });
app.model({ namespace: 'user', ...(require('/Users/zz-huangruzhe/huangruzhe/788/manage-front-end/src/models/user.js').default) });
app.model({ namespace: 'users', ...(require('/Users/zz-huangruzhe/huangruzhe/788/manage-front-end/src/pages/User/models/users.js').default) });
app.model({ namespace: 'activity', ...(require('/Users/zz-huangruzhe/huangruzhe/788/manage-front-end/src/pages/Activity/models/activity.js').default) });
app.model({ namespace: 'floor', ...(require('/Users/zz-huangruzhe/huangruzhe/788/manage-front-end/src/pages/Mall/models/floor.js').default) });
app.model({ namespace: 'shop', ...(require('/Users/zz-huangruzhe/huangruzhe/788/manage-front-end/src/pages/Mall/models/shop.js').default) });
