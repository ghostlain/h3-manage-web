import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Tree, Button } from 'antd';
import type { Key } from 'react';
import React, { useState, useEffect } from 'react';
import { ParkingIcon, AreaIcon, EnterChannelIcon, ExitChannelIcon } from '@/components/HongmenIcon';
import { getParkTree } from '@/services/parking/api';
import ProCard from '@ant-design/pro-card';
import { PlusOutlined } from '@ant-design/icons';
import { AreaShow } from './components/Area';
import type { DataNode, EventDataNode } from 'antd/lib/tree';

function converToTreeNode(area: API.AreaNode) {
  const icon: JSX.Element = area.areaType === 1 ? <ParkingIcon /> : <AreaIcon />; // 子区域
  const subAreas = area.areas;
  const children: any[] = [];

  if (subAreas && subAreas.length > 0) {
    subAreas.forEach(subArea => {
      children.push(converToTreeNode(subArea));
    });
  }

  /** 入口 */
  if (area.enterChannels && area.enterChannels.length > 0) {
    area.enterChannels.forEach(c => {
      children.push({
        title: c.channelName,
        key: `channel_${c.id}`,
        icon: <EnterChannelIcon />,
      });
    });
  }

  /** 出口 */
  if (area.exitChannels && area.exitChannels.length > 0) {
    area.exitChannels.forEach(c => {
      children.push({
        title: c.channelName,
        key: `channel_${c.id}`,
        icon: <ExitChannelIcon />,
      });
    });
  }

  return {
    title: area.areaName,
    key: `area_${area.id}`,
    icon,
    children,
  };
}

type RightContent = {
  type: 'channel' | 'area',
  id: number
}


const Parking: React.FC = () => {
  const [tree, setTree] = useState<API.AreaNode[]>();
  const [right, setRight] = useState<RightContent>();

  useEffect(() => {
    const fetchTree = async () => {
      const { data } = await getParkTree();
      setTree(data);
    };

    fetchTree();
  }, []);

  const refreshTree = async () => {
    const { data } = await getParkTree();
    setTree(data);
  }

  const onSelect = (selectedKeys: Key[], info: {
    event: 'select';
    selected: boolean;
    node: EventDataNode;
    selectedNodes: DataNode[];
    nativeEvent: MouseEvent;
  }): void => {
    const { node } = info;
    const [sType, id] = node.key.toString().split('_')
    if (sType === 'channel' || sType === 'area') {
      setRight({
        type: sType,
        id: parseInt(id)
      })
    }
  };

  return (
    <PageHeaderWrapper content="配置基本参数">
      <ProCard split="vertical" style={{
        minHeight: '500px'
      }}
      >
        <ProCard
          title="车场结构"
          colSpan="30%"
        >
          {tree ? (
            <Tree
              treeData={tree.map(a => converToTreeNode(a))}
              showLine
              showIcon
              defaultExpandAll
              onSelect={onSelect}
            />
          ) : (
            <Button type="primary"> <PlusOutlined />新增停车场</Button>
          )
          }
        </ProCard>
        <ProCard>
          {right && (
            right.type === 'area' ? (
              <AreaShow areaId={right.id} onChanged={(id, type) => {
                refreshTree();
                if (type === 'deleted') {
                  // 删除了区域，右边显示区域要置空
                  setRight(undefined);
                } else if (type === 'addNewChannel') {
                  setRight({ type: 'channel', id })
                } else {
                  setRight({ type: 'area', id })
                }
              }} />
            ) : (
              <span>Wait!</span>
            )
          )}
        </ProCard>
      </ProCard>
    </PageHeaderWrapper>
  );
};

export default Parking;
