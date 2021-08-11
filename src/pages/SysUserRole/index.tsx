import { PlusOutlined } from "@ant-design/icons";
import { PageHeaderWrapper } from "@ant-design/pro-layout"
import type { ProColumns } from "@ant-design/pro-table";
import ProTable from "@ant-design/pro-table"
import { Button } from "antd"

type RoleTableListItem = {
  roleId: string;
  roleName: string;
  roleSign: string;
  remark?: string;
  creator: string;
  gmtCreate: number;
}

const columns: ProColumns<RoleTableListItem>[] = [
  {
    title: '角色名称',
    dataIndex: 'roleName',
  },
  {
    title: '角色标识',
    dataIndex: 'roleSign',
  },
  {
    title: '创建者',
    search: false,
    dataIndex: 'creator',
  },
  {
    title: '创建时间',
    search: false,
    key: 'gmtCreate',
    dataIndex: 'gmtCreate',
    valueType: 'dateTime',
    sorter: (a, b) => a.gmtCreate - b.gmtCreate,
  },
  {
    title: '备注',
    search: false,
    key: 'remark',
    dataIndex: 'remark',
    ellipsis: true,
  },
  {
    title: '操作',
    key: 'option',
    valueType: 'option',
    render: () => [
      <a key="link">编辑</a>,
      <a key="link2">权限</a>,
      <a key="link3">删除</a>,
    ],
  },
]


const datasource = [
  {
    roleId: '1',
    roleName: '超级管理员',
    roleSign: 'admin',
    remark: 'asfasdfasdf',
    creator: 'admin',
    gmtCreate: Date.now() - Math.floor(Math.random() * 2000)
  }
]

export default () => {
  return (
    <PageHeaderWrapper content="系统用户角色管理">
      <ProTable<RoleTableListItem>
        rowKey="roleId"
        columns={columns}
        request={(params, sorter, filter) => {
          // 表单搜索项会从 params 传入，传递给后端接口。
          console.log(params, sorter, filter);
          return Promise.resolve({
            data: datasource,
            success: true,
          });
        }}
        pagination={{
          showQuickJumper: true,
        }}
        search={{
          filterType: 'light'
        }}
        dateFormatter="string"
        toolBarRender={() => [
          <Button key="show" type="primary" icon={<PlusOutlined />}>新增</Button>,
        ]}
      />
    </PageHeaderWrapper>
  )
}
