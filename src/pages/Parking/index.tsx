import { PageContainer } from '@ant-design/pro-layout';
import { Tree, Button } from 'antd';
import React, { useState, useEffect } from 'react';
import { ParkingIcon, AreaIcon, EnterChannelIcon, ExitChannelIcon } from '@/components/HongmenIcon';
import { getParkTree } from '@/services/parking/api';
import ProCard from '@ant-design/pro-card';
import styles from './index.less'; // import ProForm from '@ant-design/pro-form';

function converToTreeNode(area: API.ParkArea) {
  const switcherIcon: JSX.Element = area.areaLevel === 0 ? <ParkingIcon /> : <AreaIcon />; // 子区域

  const subAreas = area.areas;
  const children: any[] = [];

  if (subAreas && subAreas.length > 0) {
    subAreas.forEach(subArea => {
      children.push(converToTreeNode(subArea));
    });
  } // 入口

  if (area.enterChannels && area.enterChannels.length > 0) {
    area.enterChannels.forEach(c => {
      children.push({
        title: c.channelName,
        key: `channel_${c.id || 0}`,
        switcherIcon: <EnterChannelIcon />,
      });
    });
  } // 出口

  if (area.exitChannels && area.exitChannels.length > 0) {
    area.exitChannels.forEach(c => {
      children.push({
        title: c.channelName,
        key: `channel_${c.id || 0}`,
        switcherIcon: <ExitChannelIcon />,
      });
    });
  }

  return {
    title: area.areaName,
    key: `area_${area.id || 0}`,
    switcherIcon,
    children,
  };
}

function getAreasAndChannels(
  tree: API.ParkArea[]
): {
  areas: Record<number, API.ParkArea>;
  channels: Record<number, API.ParkChannel>;
} {
  const areas: Record<number, API.ParkArea> = {};
  const channels: Record<number, API.ParkChannel> = {};
  const path: API.ParkArea[] = [];

  for (const t of tree) {
    if (t.id) {
      areas[t.id] = t;

      if (t.areas) {
        path.push(...t.areas);
      }
    }
  }

  let area: API.ParkArea | undefined;

  while (area = path.pop()) {
    if (area.id) {
      areas[area.id] = area;

      if (area.enterChannels) {
        area.enterChannels.forEach(c => {
          if (c.id) {
            channels[c.id] = c;
          }
        });
      }

      if (area.exitChannels) {
        area.exitChannels.forEach(c => {
          if (c.id) {
            channels[c.id] = c;
          }
        });
      }

      if (area.areas) {
        path.push(...area.areas);
      }
    }
  }

  return {
    areas,
    channels,
  };
}

const Parking: React.FC = () => {
  const [tree, setTree] = useState<API.ParkArea[]>();
  const [areas, setAreas] = useState<Record<number, API.ParkArea>>({});
  const [channels, setChannels] = useState<Record<number, API.ParkChannel>>({});
  const [editable, setEditable] = useState(false);

  const changeEditState = () => {
    setEditable(!editable);
  }; // const onDrop = (info: any) => {
  //   console.log(info)
  // }

  useEffect(() => {
    const fetchTree = async () => {
      const { data } = await getParkTree();
      setTree(data);
    };

    fetchTree();
  }, []);

  useEffect(() => {
    if (tree) {
      const result = getAreasAndChannels(tree);
      setAreas(result.areas);
      setChannels(result.channels);
    } else {
      setAreas({});
      setChannels({});
    }
  }, [tree]);
  return (
    <PageContainer content="配置基本参数" className={styles.main}>
      <ProCard split="vertical">
        <ProCard
          title="车场结构"
          colSpan="30%"
          extra={
            <div>
              <Button type="link" onClick={changeEditState}>
                {editable ? '取消' : '编辑'}
              </Button>
            </div>
          }
        >
          {tree && (
            <Tree
              treeData={tree.map(a => converToTreeNode(a))}
              showLine
              draggable={editable} // onDrop={onDrop}
              defaultExpandAll
            />
          )}
        </ProCard>
        <ProCard title="{左右分栏子卡片带标题}" headerBordered>
          <div
            style={{
              height: 360,
            }}
          >
            右侧内容
            {JSON.stringify(channels)}
            <hr />
            {JSON.stringify(areas)}
          </div>
        </ProCard>
      </ProCard>
    </PageContainer>
  );
};

export default Parking;
