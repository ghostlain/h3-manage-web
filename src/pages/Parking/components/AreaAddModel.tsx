import type { ModalFormProps } from "@ant-design/pro-form";
import { ProFormDigit, ProFormSelect } from "@ant-design/pro-form";
import { ModalForm, ProFormText } from "@ant-design/pro-form"

export default (props: {
  parentId: number,
} & ModalFormProps) => {
  const { parentId, ...rest } = props

  return (
    <ModalForm
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 14 }}
      layout='horizontal'
      {...rest}
    >
      <ProFormText name="areaName" label={props.parentId === 0 ? '停车场名称' : '区域名称'} rules={[{ required: true }]} />
      <ProFormSelect name="whetherCharge" label="是否收费"
        valueEnum={{ 'false': { text: '不收费', status: 'Success' }, 'true': { text: '收费', status: 'Error' }, }}
        rules={[{ required: true }]}
      />
      {props.parentId !== 0 && (
        <>
          <ProFormDigit label="公共临时车位总数" name="temporaryQuantities" min={0} rules={[{ required: true }]} />
          <ProFormDigit label="公共月租车位总数" name="fixedQuantities" min={0} rules={[{ required: true }]} />
          <ProFormDigit label="专用私有车位总数" name="specialQuantities" min={0} rules={[{ required: true }]} />
        </>
      )}
    </ModalForm>
  )
}
