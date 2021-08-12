import AuthorityTree from "@/components/AuthorityTree";
import { listRoles } from "@/services/user/api";
import { PlusOutlined } from "@ant-design/icons";
import type { ModalFormProps } from "@ant-design/pro-form";
import { ModalForm, ProFormText } from "@ant-design/pro-form";
import { PageHeaderWrapper } from "@ant-design/pro-layout"
import type { ProColumns } from "@ant-design/pro-table";
import ProTable from "@ant-design/pro-table";
import { Button } from "antd"
import React from "react";

// role的编辑框
const RoleModel: React.FC<{
  old?: API.SysRole
} & ModalFormProps> = (props) => {
  const { old, ...rest } = props
  return <ModalForm
    labelCol={{ span: 6 }}
    wrapperCol={{ span: 14 }}
    layout='horizontal'
    initialValues={{ ...old }}
    {...rest}
  >
    <ProFormText name="roleName" label='角色名称' rules={[{ required: true, message: '此项是必填项' }]} />
    <ProFormText name="roleSign" label='角色标识' rules={[{ required: true, message: '此项是必填项' }]} />
    <ProFormText name="remark" label='备注' />
  </ModalForm>
}

export default () => {
  const columns: ProColumns<API.SysRole>[] = [
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
      editable: false,
    },
    {
      title: '创建时间',
      search: false,
      key: 'gmtCreate',
      dataIndex: 'gmtCreate',
      valueType: 'dateTime',
      sorter: (a, b) => a.gmtCreate - b.gmtCreate,
      editable: false,
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
      render: (text, record) => {
        const content = [
          <RoleModel key="modify" old={record} trigger={<a>编辑</a>} title="编辑" />,
          <AuthorityTree key="authorities" trigger={<a >权限</a>}/>,
        ]
        if (record?.deletable) {
          content.push(<a key="delete">删除</a>)
        }
        return content;
      },
    },
  ]

  return (
    <PageHeaderWrapper content="系统用户角色管理">
      <ProTable<API.SysRole>
        rowKey="roleId"
        columns={columns}
        request={async (params, sorter, filter) => {
          // 表单搜索项会从 params 传入，传递给后端接口。
          console.log(params, sorter, filter);
          const response = await listRoles(params)
          return {
            data: response.data,
            success: response.code === 0,
          };
        }}
        pagination={{
          showQuickJumper: true,
        }}
        search={{
          filterType: 'light'
        }}
        dateFormatter="string"
        toolBarRender={() => [
          <RoleModel trigger={
            <Button key="show" type="primary" icon={<PlusOutlined />}>新增</Button>
          }
            title="新增角色"
          />
          ,
        ]}
      />

    </PageHeaderWrapper>
  )
}
