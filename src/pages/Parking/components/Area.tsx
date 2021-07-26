import ProDescriptions from "@ant-design/pro-descriptions";
import moment from 'moment';
import { Button, Form } from "antd";

export type AreaShowProps = {
    areaId?: number
}

const AreaShow: React.FC<AreaShowProps> = (props) => {
    const [form] = Form.useForm();

    const onReset = () => {
        form.resetFields();
    };

    return (
        <ProDescriptions
            formProps={{
                onValuesChange: (e, f) => console.log(f),
            }}
            editable={{
                form: form
            }}
            column={1}
            title="高级定义列表" tooltip="包含了从服务器请求，columns等功能"
        >
            <ProDescriptions.Item label="文本" valueType="option">
                <Button key="primary" type="primary" onClick={onReset}>
                    提交
                </Button>
            </ProDescriptions.Item>
            <ProDescriptions.Item label="文本">
                这是一段很长很长超级超级长的无意义说明文本并且重复了很多没有意义的词语，就是为了让它变得很长很长超级超级长
            </ProDescriptions.Item>
            <ProDescriptions.Item label="金额" tooltip="仅供参考，以实际为准" valueType="money">
                100
            </ProDescriptions.Item>
            <ProDescriptions.Item label="百分比" valueType="percent"
                formItemProps={{
                    rules: [
                        {
                            required: true,
                            whitespace: true,
                            message: '此项是必填项',
                        },
                    ],
                }}>
                100
            </ProDescriptions.Item>
            <ProDescriptions.Item
                label="选择框"
                valueEnum={{
                    all: { text: '全部', status: 'Default' },
                    open: {
                        text: '未解决',
                        status: 'Error',
                    },
                    closed: {
                        text: '已解决',
                        status: 'Success',
                    },
                    processing: {
                        text: '解决中',
                        status: 'Processing',
                    },
                }}
            >
                open
            </ProDescriptions.Item>
            <ProDescriptions.Item
                label="远程选择框"
                request={async () => [
                    { label: '全部', value: 'all' },
                    { label: '未解决', value: 'open' },
                    { label: '已解决', value: 'closed' },
                    { label: '解决中', value: 'processing' },
                ]}
            >
                closed
            </ProDescriptions.Item>
            <ProDescriptions.Item label="进度条" valueType="progress">
                40
            </ProDescriptions.Item>
            <ProDescriptions.Item label="日期时间" valueType="dateTime">
                {moment().valueOf()}
            </ProDescriptions.Item>
            <ProDescriptions.Item label="日期" valueType="date">
                {moment().valueOf()}
            </ProDescriptions.Item>
            <ProDescriptions.Item label="日期区间" valueType="dateTimeRange">
                {[moment().add(-1, 'd').valueOf(), moment().valueOf()]}
            </ProDescriptions.Item>
            <ProDescriptions.Item label="时间" valueType="time">
                {moment().valueOf()}
            </ProDescriptions.Item>
        </ProDescriptions>
    )
}

export {
    AreaShow,
}