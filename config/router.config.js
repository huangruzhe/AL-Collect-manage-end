export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', component: './Login/Login' },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    authority: ['user', 'activity', 'mall'],
    routes: [
      // 用户管理
      { path: '/', redirect: '/users' },
      {
        path: '/users',
        name: 'USER',
        menuKey: 'user',
        icon: 'user',
        authority: ['user'],
        component: './User/index',
      },
      // 活动管理
      {
        path: '/activity',
        name: 'ACTIVITY',
        icon: 'gift',
        menuKey: 'activity',
        authority: ['activity'],
        component: './Activity/index',
      },
      // 商场管理
      {
        path: '/mall',
        name: 'MALL',
        icon: 'shop',
        menuKey: 'mall',
        authority: ['mall'],
        routes: [
          // { path: '/mall', redirect: '/mall/shop' },
          { path: '/mall/shop', name: 'SHOP', component: './Mall/Shop/index' },
          { path: '/mall/shopCategory', name: 'CATEGORY', component: './Mall/Shop/category' },
          { path: '/mall/floor', name: 'FLOOR', component: './Mall/Floor/index' }
        ]
      },
      {
        component: '404',
      },
    ],
  },
];
