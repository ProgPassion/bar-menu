import { MoreOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Modal, Input } from "antd";
import { MyLabel } from "./MyLabel";
import TextArea from "antd/es/input/TextArea";

export function AddCategoryModal({dialogOpened, setDialogOpened, addCategory}) {

    const [form] = Form.useForm();
    const handleCancel = () => {
        setDialogOpened({open: false});
    }

    const handleAdd = () => {
        form.validateFields().then(({categoryName, categoryDescription}) => {
            form.resetFields();
            addCategory(categoryName, categoryDescription);
        })
    }

    return (
        <Modal
            title="Add New Category"
            open={dialogOpened.open}
            onCancel={handleCancel}
            footer={[
                <Button key="cancel" onClick={handleCancel}>
                    Cancel
                </Button>,
                <Button key="add" type="primary" onClick={handleAdd} icon={<PlusOutlined />}>
                    Add
                </Button>
            ]}
        >
            <Form layout="vertical" form={form}>
                <Form.Item
                    label={<MyLabel text='Category name' fontSize={15}/>}
                    name="categoryName"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the Category Name!',
                        }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label={<MyLabel text='Category description' fontSize={15}/>}
                    name="categoryDescription"
                >
                    <TextArea rows={3}></TextArea> 
                </Form.Item>
            </Form>
        </Modal>
    );
}