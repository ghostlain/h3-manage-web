import ProDescriptions from "@ant-design/pro-descriptions";
import { Button, Dropdown, Form, Menu, message, Space, Tooltip } from "antd";
import { useEffect } from "react";
import { deleteAreaById, getAreaById, updateArea } from "@/services/parking/api";
import { useState } from "react";
import styles from '../index.less'
import { Access, useAccess, useIntl } from "umi";
import { PlusOutlined } from "@ant-design/icons";
import { AreaIcon, EnterChannelIcon, ExitChannelIcon, ParkingIcon } from "@/components/HongmenIcon";
import AreaAddModel from "./AreaAddModel";

export type AreaShowProps = {
  areaId: number,
  onChanged: (id: number, type: ChangedType) => void
}

export type ChangedType = 'deleted' | 'updated' | 'addNewArea' | 'addNewChannel';

const DescLabel: React.FC<{ title: string }> = (props) => {
  return (
    <span className={styles.descLabel}>{props.title}</span>
  )
}

function areaTypeToString(areaType: API.AreaType) {
  if (areaType === 1) {
    return '停车场';
  } if (areaType === 2) {
    return '外区域';
  }

  return '内区域';
}

const AreaShow: React.FC<AreaShowProps> = (props) => {
  const [area, setArea] = useState<API.ParkArea>();
  const [loading, setLoading] = useState<boolean>(true);

  const [editable, setEditable] = useState<boolean>(false);
  const [form] = Form.useForm();
  const access = useAccess();

  const intl = useIntl();

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const { data } = await getAreaById(props.areaId);
        setArea(data);
      } catch (error) {
        message.error(`加载区域信息失败${error}`)
      } finally {
        setLoading(false);
      }
    }
    fetch();
  }, [props.areaId])

  // 更改列表显示状态
  const changeEditable = () => {
    if (editable) {
      setEditable(false);
      form.resetFields();
    } else {
      setEditable(true);
    }
  }

  // 刷新显示区域
  const doRefresh = async () => {
    setLoading(true);
    try {
      const { data } = await getAreaById(props.areaId);
      setArea(data);
    } catch (error) {
      message.error(intl.formatMessage({ id: 'pages.parking.loadAreaException', defaultMessage: '加载区域信息失败' }) + error)
    } finally {
      setLoading(false);
    }
  }

  // 提交区域更新
  const onSubmit = async () => {
    const values = form.getFieldsValue();
    try {
      const { areaId } = props;
      const response = await updateArea(areaId, { ...values });
      if (response.code === 0) {
        message.success(intl.formatMessage({ id: 'pages.parking.saveArea.success', defaultMessage: '保存成功' }));
        // 刷新显示
        changeEditable();
        doRefresh();
        props.onChanged(areaId, 'updated');
        return;
      }
      message.error(intl.formatMessage({ id: 'pages.parking.saveArea.exception', defaultMessage: '保存失败' }) + (response.msg || ''));
    } catch (err) {
      message.error(intl.formatMessage({ id: 'pages.parking.saveArea.exception', defaultMessage: '保存失败' }) + err)
    }
  }

  // 删除区域
  const onDelete = async () => {
    try {
      const { areaId } = props;
      const response = await deleteAreaById(areaId)
      if (response.code === 0) {
        message.success('删除区域成功!');
        props.onChanged(areaId, 'deleted');
        return;
      }
      message.error(`删除区域失败!${response.msg}`);
    } catch (error) {
      message.error(`删除区域失败!${error}`);
    }
  }

  const onAddArea = async (formData: Record<string, any>) => {
    console.log(formData)
    return true;
  }

  return (
    <ProDescriptions
      editable={editable ? {
        form,
        editableKeys: ['areaName', 'whetherCharge', 'temporaryQuantities', 'fixedQuantities', 'specialQuantities'],
        actionRender: () => [],
      } : undefined}
      column={1}
      loading={loading}
      title={(
        <Space>
          {area && areaTypeToString(area.areaType)}—<span className={styles.rightContentTitle}>{area?.areaName}</span>
          <Access accessible={access.hasAuthority('parking.modify')}>
            <Dropdown trigger={['click']} placement="bottomRight" overlay={(
              <Menu>
                <Menu.Item key="1" icon={<AreaIcon />}>
                  <AreaAddModel title={(
                    <><span style={{ color: '#92C110' }}>{area?.areaName} </span>的子区域</>
                  )} trigger={<span>子区域</span>} parentId={props.areaId} />
                </Menu.Item>
                {area?.areaType === 1 ? (
                  // 停车场
                  <Menu.Item key="4" icon={<ParkingIcon />}>
                    <AreaAddModel title={(
                      <><span style={{ color: '#92C110' }}>{area?.areaName} </span>的平级停车场</>
                    )} trigger={<span>平级停车场</span>} parentId={area?.parentId || 0} /></Menu.Item>
                ) : (
                  // 区域
                  <>
                    <Menu.Item key="2" icon={<EnterChannelIcon />}>入口通道</Menu.Item>
                    <Menu.Item key="3" icon={<ExitChannelIcon />}>出口通道</Menu.Item>
                    <Menu.Item key="5" icon={<AreaIcon />}>
                      <AreaAddModel title={(
                        <><span style={{ color: '#92C110' }}>{area?.areaName} </span>的平级区域</>
                      )} trigger={<span>平级区域</span>} parentId={area?.parentId || 0} onFinish={onAddArea} /></Menu.Item>
                  </>
                )}
              </Menu>
            )}>
              <Tooltip title="新增区域通道等">
                <Button type="primary" icon={<PlusOutlined />} size="small"
                  style={{ backgroundColor: '#92C110', borderColor: '#92C110' }} />
              </Tooltip>
            </Dropdown>
          </Access>
        </Space>
      )}
      dataSource={area}
      extra={
        <Access accessible={access.hasAuthority('parking.modify')}>
          <Space size="small">
            {editable ? (
              <>
                <Button shape="round" type="primary" onClick={onSubmit}>提交</Button>
                <Button shape="round" onClick={changeEditable}>取消</Button>
              </>
            ) :
              <Button shape="round" type="primary" onClick={changeEditable}>编辑</Button>
            }
            <Button type="link" danger onClick={onDelete}>删除</Button>

          </Space>
        </Access>
      }
    >
      <ProDescriptions.Item label={<DescLabel title="区域类型" />} valueType="select" valueEnum={{
        1: { text: '停车场' },
        2: { text: '外区域' },
        3: { text: '内区域' },
      }} editable={false} dataIndex="areaType" key="areaType">
      </ProDescriptions.Item>
      <ProDescriptions.Item label={<DescLabel title="区域名称" />} dataIndex="areaName" key="areaName" formItemProps={{
        rules: [{ required: true, whitespace: true, message: '此项是必填项' },],
      }} valueType="text">
      </ProDescriptions.Item>
      <ProDescriptions.Item label={<DescLabel title="是否收费" />} dataIndex="whetherCharge" key="whetherCharge" valueType="select"
        valueEnum={{ 'false': { text: '不收费', status: 'Success' }, 'true': { text: '收费', status: 'Error' }, }}
        formItemProps={{
          rules: [{ required: true },],
          initialValue: 1
        }}
      >
      </ProDescriptions.Item>

      {/* 普通区域 */}
      {area?.areaType !== 1 && (
        <>
          <ProDescriptions.Item label={<DescLabel title="公共临时车位总数" />} valueType="digit" dataIndex="temporaryQuantities" key="temporaryQuantities"
            formItemProps={{
              rules: [{ required: true }],
              initialValue: 0
            }}
          >
          </ProDescriptions.Item>
          <ProDescriptions.Item label={<DescLabel title="公共月租车位总数" />} valueType="digit" dataIndex="fixedQuantities" key="fixedQuantities"
            formItemProps={{
              rules: [{ required: true }],
              initialValue: 0
            }}
          >
          </ProDescriptions.Item>
          <ProDescriptions.Item label={<DescLabel title="专用私有车位总数" />} valueType="digit" dataIndex="specialQuantities" key="specialQuantities"
            formItemProps={{
              rules: [{ required: true }],
              initialValue: 0
            }}
          >
          </ProDescriptions.Item>
          <ProDescriptions.Item label={<DescLabel title="记录创建人" />} valueType="text" editable={false}>
            {area?.createdUser}
          </ProDescriptions.Item>
          <ProDescriptions.Item label={<DescLabel title="记录创建时间" />} valueType="text" editable={false}>
            {area?.createdTime}
          </ProDescriptions.Item>
          <ProDescriptions.Item label={<DescLabel title="记录最后修改人" />} valueType="text" editable={false}>
            {area?.lastUpdateUser}
          </ProDescriptions.Item>
          <ProDescriptions.Item label={<DescLabel title="记录最后修改时间" />} valueType="text" editable={false}>
            {area?.lastUpdateTime}
          </ProDescriptions.Item>
        </>
      )}
    </ProDescriptions>
  )
}

export {
  AreaShow,
}
