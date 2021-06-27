import { PageContainer } from '@ant-design/pro-layout';
import { Tree, Button } from 'antd';
import React, { useState, useEffect } from 'react';
import { ParkingIcon, AreaIcon, EnterChannelIcon, ExitChannelIcon } from '@/components/HongmenIcon'
import { getParkTree } from '@/services/parking/api'
import ProCard from '@ant-design/pro-card';

function converToTreeNode(area: API.ParkArea) {
  const switcherIcon: JSX.Element = area.areaLevel === 0 ? <ParkingIcon /> : <AreaIcon />;

  // 子区域
  const subAreas = area.areas;
  const children: any[] = [];
  if (subAreas && subAreas.length > 0) {
    subAreas.forEach((subArea) => {
      children.push(converToTreeNode(subArea))
    })
  }

  // 入口
  if (area.enterChannels && area.enterChannels.length > 0) {
    area.enterChannels.forEach((c) => {
      children.push({
        title: c.channelName,
        key: `channel_${c.id}`,
        switcherIcon: <EnterChannelIcon />
      })
    })
  }

  // 出口
  if (area.exitChannels && area.exitChannels.length > 0) {
    area.exitChannels.forEach((c) => {
      children.push({
        title: c.channelName,
        key: `channel_${c.channelName}`,
        switcherIcon: <ExitChannelIcon />
      })
    })
  }

  const areaNode = {
    title: area.areaName,
    key: `area_${area.id}`,
    switcherIcon,
    children
  };

  return areaNode;
}

const Parking: React.FC = () => {
  const [tree, setTree] = useState<API.ParkArea[]>()
  const [editable, setEditable] = useState(false)

  useEffect(() => {
    getParkTree().then(({ data }) => {
      setTree(data)
    })
  })

  const changeEditState = () => {
    setEditable(!editable)
  }

  return (
    <PageContainer
      content='配置基本参数'
    >
      <ProCard split="vertical">
        <ProCard title="车场结构" colSpan="30%"
          extra={
            <div>
              <Button type="link" onClick={changeEditState}>
                {editable ? '取消' : '编辑'}
              </Button>
            </div>
          }>
          {tree &&
            <Tree
              treeData={tree.map((a) => converToTreeNode(a))}
              showLine
              draggable={editable}
              defaultExpandAll
            />
          }
        </ProCard>
        <ProCard title="左右分栏子卡片带标题" headerBordered>
          <div style={{ height: 360 }}>右侧内容</div>
        </ProCard>
      </ProCard>
    </PageContainer>
  )
}

export default Parking;
