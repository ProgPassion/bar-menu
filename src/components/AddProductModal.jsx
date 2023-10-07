import { MoreOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Modal, Input } from "antd";
import { MyLabel } from "./MyLabel";
import TextArea from "antd/es/input/TextArea";

export function AddProductModal({dialogOpened, setDialogOpened, addProduct}) {

    const [form] = Form.useForm();
    const handleCancel = () => {
        setDialogOpened({open: false});
    }

    const handleAdd = () => {
        form.validateFields().then(({productName, productDescription, productPrice}) => {
            form.resetFields();
            addProduct(productName, productDescription, productPrice);
        });
    }

    return (
        <Modal
            title="Add New Product"
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
                    label={<MyLabel text='Product name' fontSize={15}/>}
                    name="productName"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the Product Name!',
                        }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label={<MyLabel text='Product description' fontSize={15}/>}
                    name="productDescription"
                    rules={[
                        {
                            message: 'Please input the Product Description!',
                        }
                    ]}
                >
                    <TextArea rows={3}></TextArea> 
                </Form.Item>
                <Form.Item
                    label={<MyLabel text='Product price' fontSize={15}/>}
                    name="productPrice"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the Product Price!',
                        }
                    ]}
                >
                    <Input /> 
                </Form.Item>
            </Form>
        </Modal>
    ) 
}