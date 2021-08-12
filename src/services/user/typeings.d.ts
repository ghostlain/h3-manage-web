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

  type SysRole = {
    roleId: string;
    roleName: string;
    roleSign: string;
    remark?: string;
    creator: string;
    gmtCreate: number;
    deletable: boolean;
  }

  type SysUserAuthority = {
  }
}


