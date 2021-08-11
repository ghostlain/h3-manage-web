// @ts-ignore
/* eslint-disable */

declare namespace API {
  type CurrentUser = {
    name?: string;
    avatar?: string;
    userid?: string;
    email?: string;
    signature?: string;
    title?: string;
    group?: string;
    tags?: { key?: string; label?: string }[];
    notifyCount?: number;
    unreadCount?: number;
    address?: string;
    phone?: string;
    // 角色
    roles?: string[];
    // 权限
    authorities?: string[];
    hasRoutes?: string[];
  }

  type LoginResult = {
    status?: string;
    type?: string;
  };

  type ApiResponse<T = any> = {
    code: number;
    msg?: string;
    data?: T;
  }
}


