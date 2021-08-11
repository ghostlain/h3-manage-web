import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { useState, useEffect } from 'react';
import { AreaIcon, EnterChannelIcon, ExitChannelIcon, ParkingIcon } from '@/components/HongmenIcon';
import ProCard from '@ant-design/pro-card';
import { Tree } from 'antd';
import { getParkTree } from '@/services/parking/api';

export default () => {
  const [tree, setTree] = useState<API.AreaNode[]>();

  useEffect(() => {
    const fetchTree = async () => {
      const { data } = await getParkTree();
      setTree(data);
    };

    fetchTree();
  }, []);

  return (
    <PageHeaderWrapper content="设备添加、删除，设备配置修改">
       <ProCard split="vertical" style={{
        minHeight: '500px'
      }}
      >
        <ProCard
          title="设备列表"
          colSpan="30%"
        >
          {tree ? (
            <Tree
              treeData={tree.map(a => converToTreeNode(a))}
              showLine
              showIcon
              defaultExpandAll
            />
          ) : (
            <span>未创建停车场</span>
          )
          }
        </ProCard>
        <ProCard>
        </ProCard>
      </ProCard>
    </PageHeaderWrapper>
  );
};


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
