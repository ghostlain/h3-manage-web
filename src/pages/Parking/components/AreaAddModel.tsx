import { ModalFormProps, ProFormDigit, ProFormSelect } from "@ant-design/pro-form";
import { ModalForm, ProFormText } from "@ant-design/pro-form"

function toModalFormProps(props: {
  parentId: number,
} & ModalFormProps) {
  const result: ModalFormProps = { ...props };
  delete result['parentId'];
  return result;
}

export default (props: {
  parentId: number,
} & ModalFormProps) => {
  return (
    <ModalForm
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 14 }}
      layout='horizontal'
      {...toModalFormProps(props)}
    >
      <ProFormText name="areaName" label={props.parentId === 0 ? '停车场名称' : '区域名称'} rules={[{ required: true, message: '此项是必填项' }]} />
      <ProFormSelect name="whetherCharge" label="是否收费"
        valueEnum={{ 'false': { text: '不收费', status: 'Success' }, 'true': { text: '收费', status: 'Error' }, }}
        rules={[{ required: true, message: '此项是必填项' }]}
      />
      {props.parentId !== 0 && (
        <>
          <ProFormDigit label="公共临时车位总数" name="temporaryQuantities" min={0} rules={[{ required: true, message: '此项是必填项' }]} />
          <ProFormDigit label="公共月租车位总数" name="fixedQuantities" min={0} rules={[{ required: true, message: '此项是必填项' }]} />
          <ProFormDigit label="专用私有车位总数" name="specialQuantities" min={0} rules={[{ required: true, message: '此项是必填项' }]} />
        </>
      )}
    </ModalForm>
  )
}
