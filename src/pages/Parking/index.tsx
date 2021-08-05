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
  const switcherIcon: JSX.Element = area.areaType === 1 ?
    <ParkingIcon /> : <AreaIcon />; // 子区域
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
        switcherIcon: <EnterChannelIcon />,
      });
    });
  }

  /** 出口 */
  if (area.exitChannels && area.exitChannels.length > 0) {
    area.exitChannels.forEach(c => {
      children.push({
        title: c.channelName,
        key: `channel_${c.id}`,
        switcherIcon: <ExitChannelIcon />,
      });
    });
  }

  return {
    title: area.areaName,
    key: `area_${area.id}`,
    switcherIcon,
    children,
  };
}

type RightContent = {
  type: 'channel' | 'area',
  id: string
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
        id
      })
    }
  };

  return (
    <PageHeaderWrapper content="配置基本参数">
      <ProCard split="vertical" style={{
        minHeight: '500px'
      }}>
        <ProCard
          title="车场结构"
          colSpan="30%"
        >
          {tree ? (
            <Tree
              treeData={tree.map(a => converToTreeNode(a))}
              showLine
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
              <AreaShow areaId={right.id} onChanged={refreshTree}/>
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
