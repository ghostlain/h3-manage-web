import type { ModalFormProps} from "@ant-design/pro-form";
import { ModalForm, ProFormText } from "@ant-design/pro-form"

export default (props: {
  parentId: string,
} | ModalFormProps) => {
  return (
    <ModalForm
      {...props}
    >
        <ProFormText width="md" name="name" label="name" />
    </ModalForm>
  )
}
