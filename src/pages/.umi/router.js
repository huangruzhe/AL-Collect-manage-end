import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/_renderRoutes';
import RendererWrapper0 from '/Users/zz-huangruzhe/huangruzhe/788/manage-front-end/src/pages/.umi/LocaleWrapper.jsx'

let Router = require('dva/router').routerRedux.ConnectedRouter;

let routes = [
  {
    "path": "/user",
    "component": dynamic({ loader: () => import('../../layouts/UserLayout'), loading: require('/Users/zz-huangruzhe/huangruzhe/788/manage-front-end/src/components/PageLoading/index').default }),
    "routes": [
      {
        "path": "/user",
        "redirect": "/user/login",
        "exact": true
      },
      {
        "path": "/user/login",
        "component": dynamic({ loader: () => import('../Login/Login'), loading: require('/Users/zz-huangruzhe/huangruzhe/788/manage-front-end/src/components/PageLoading/index').default }),
        "exact": true
      },
      {
        "component": () => React.createElement(require('/Users/zz-huangruzhe/huangruzhe/788/manage-front-end/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
      }
    ]
  },
  {
    "path": "/",
    "component": dynamic({ loader: () => import('../../layouts/BasicLayout'), loading: require('/Users/zz-huangruzhe/huangruzhe/788/manage-front-end/src/components/PageLoading/index').default }),
    "Routes": [require('../Authorized').default],
    "authority": [
      "admin",
      "user"
    ],
    "routes": [
      {
        "path": "/",
        "redirect": "/users",
        "exact": true
      },
      {
        "path": "/users",
        "name": "USER",
        "icon": "user",
        "component": dynamic({ loader: () => import('../User/index'), loading: require('/Users/zz-huangruzhe/huangruzhe/788/manage-front-end/src/components/PageLoading/index').default }),
        "exact": true
      },
      {
        "path": "/activity",
        "name": "ACTIVITY",
        "icon": "gift",
        "component": dynamic({ loader: () => import('../Activity/index'), loading: require('/Users/zz-huangruzhe/huangruzhe/788/manage-front-end/src/components/PageLoading/index').default }),
        "exact": true
      },
      {
        "path": "/mall",
        "name": "MALL",
        "icon": "shop",
        "routes": [
          {
            "path": "/mall/shop",
            "name": "SHOP",
            "component": dynamic({ loader: () => import('../Mall/Shop/index'), loading: require('/Users/zz-huangruzhe/huangruzhe/788/manage-front-end/src/components/PageLoading/index').default }),
            "exact": true
          },
          {
            "path": "/mall/shopCategory",
            "name": "CATEGORY",
            "component": dynamic({ loader: () => import('../Mall/Shop/category'), loading: require('/Users/zz-huangruzhe/huangruzhe/788/manage-front-end/src/components/PageLoading/index').default }),
            "exact": true
          },
          {
            "path": "/mall/floor",
            "name": "FLOOR",
            "component": dynamic({ loader: () => import('../Mall/Floor/index'), loading: require('/Users/zz-huangruzhe/huangruzhe/788/manage-front-end/src/components/PageLoading/index').default }),
            "exact": true
          },
          {
            "component": () => React.createElement(require('/Users/zz-huangruzhe/huangruzhe/788/manage-front-end/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "component": dynamic({ loader: () => import('../404'), loading: require('/Users/zz-huangruzhe/huangruzhe/788/manage-front-end/src/components/PageLoading/index').default }),
        "exact": true
      },
      {
        "component": () => React.createElement(require('/Users/zz-huangruzhe/huangruzhe/788/manage-front-end/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
      }
    ]
  },
  {
    "component": () => React.createElement(require('/Users/zz-huangruzhe/huangruzhe/788/manage-front-end/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
  }
];
window.g_plugins.applyForEach('patchRoutes', { initialValue: routes });

export default function() {
  return (
<RendererWrapper0>
          <Router history={window.g_history}>
      { renderRoutes(routes, {}) }
    </Router>
        </RendererWrapper0>
  );
}
