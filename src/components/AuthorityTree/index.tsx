import { Modal, Tree } from "antd"
import React, { useState } from "react";

const treeData = [
  {
    title: 'parent 1',
    key: '0-0',
    children: [
      {
        title: 'parent 1-0',
        key: '0-0-0',
        disabled: true,
        children: [
          {
            title: 'leaf',
            key: '0-0-0-0',
            disableCheckbox: true,
          },
          {
            title: 'leaf',
            key: '0-0-0-1',
          },
        ],
      },
      {
        title: 'parent 1-1',
        key: '0-0-1',
        children: [{ title: <span style={{ color: '#1890ff' }}>sss</span>, key: '0-0-1-0' }],
      },
    ],
  },
];

export default (props: {
  trigger: JSX.Element
}) => {
  const [visible, setVisible] = useState(false);

  const { trigger } = props;
  const newTriggerProps = { onClick: () => setVisible(true) }
  return (
    <>
      {trigger && React.cloneElement(trigger, { ...trigger.props, ...newTriggerProps })}
      <Modal
        title="操作权限列表"
        centered
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        okText="保存"
      >
        <Tree
          checkable
          defaultExpandAll
          treeData={treeData}
        />
      </Modal>
    </>

  )
}
