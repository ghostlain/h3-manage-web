export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/Login',
          },
        ],
      },
    ],
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    access: 'routeFilter',
    component: './Admin',
    routes: [
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        icon: 'smile',
        component: './Welcome',
      },
    ],
  },
  {
    path: '/sysuser',
    name: 'sysuser',
    icon: 'user',
    access: 'routeFilter',
    routes: [
      {
        path: '/sysuser/role',
        name: 'role',
        icon: 'folder-view',
        component: './SysUserRole',
      },
      {
        path: '/sysuser/manage',
        name: 'manage',
        icon: 'user-add',
        component: './SysUser',
      },
    ],
  },
  {
    path: '/basic-config',
    name: 'basic-config',
    icon: 'setting',
    access: 'routeFilter',
    routes: [
      {
        path: '/basic-config/parking',
        name: 'parking',
        icon: 'partition',
        access: 'routeFilter',
        component: './Parking',
      },
      {
        name: 'equipment',
        icon: 'video-camera-add',
        path: '/basic-config/equipment',
        access: 'routeFilter',
        component: './Equipment',
      },
      {
        name: 'terminal',
        icon: 'smile',
        path: '/basic-config/terminal',
        access: 'routeFilter',
        component: './Terminal',
      },
    ],
  },
  {
    name: 'list.table-list',
    icon: 'table',
    path: '/list',
    component: './TableList',
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
