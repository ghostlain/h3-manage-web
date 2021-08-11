
/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: { currentUser?: API.CurrentUser | undefined }) {
  const { currentUser } = initialState || {};
  return {
    routeFilter: (route: any) => hasRoute(currentUser, route.path),
    hasAuthority: (authority: string) => hasAuthority(currentUser, authority),
  };
}

// 有页面权限
function hasRoute(currentUser: API.CurrentUser | undefined, routePath: string): boolean {
  if (!currentUser) {
    return false
  }

  return isAdmin(currentUser) || currentUser.hasRoutes?.includes(routePath) || false;
}

// 有权限
function hasAuthority(currentUser: API.CurrentUser | undefined, authority: string): boolean {
  if (!currentUser) {
    return false
  }

  return isAdmin(currentUser) || currentUser.authorities?.includes(authority) || false;
}

function isAdmin(currentUser: API.CurrentUser): boolean {
  return currentUser.roles?.includes('admin') || false;
}
