import { Button, Form, Modal, Input, Select } from "antd";
import { MyLabel } from "./MyLabel";
import TextArea from "antd/es/input/TextArea";
import { useEffect } from "react";

export function EditProductModal({dialogOpened, setDialogOpened, editProduct, categories, selectedCategory}) {
    const [form] = Form.useForm();
    
    useEffect(() => {
        form.resetFields();
        form.setFieldsValue({...dialogOpened.product, category: selectedCategory});
    }, [dialogOpened, selectedCategory]);
    
    const handleCancel = () => {
        setDialogOpened({...dialogOpened, open: false});
    }

    const handleSave = () => {
        //id, name, description, price, categoryName
        form.validateFields().then(() => {
            const formValues = form.getFieldsValue();
            editProduct(dialogOpened.product.id, formValues.name, formValues.description, formValues.price, formValues.category);
        });
    }

    return (
        <>
            <Modal
                title="Edit Product"
                open={dialogOpened.open}
                onCancel={handleCancel}
                footer={[
                    <Button key="cancel" onClick={handleCancel}>
                        Cancel
                    </Button>,
                    <Button key="save" type="primary" onClick={handleSave}>
                        Save
                    </Button>
                ]}
            >
                <Form layout="vertical" form={form} autoComplete="false">
                    <Form.Item
                        label={<MyLabel text='Product name' fontSize={15}/>}
                        name="name"
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
                        name="description"
                        rules={[
                            {
                                required: true,
                                message: 'Please input the Product Description!',
                            }
                        ]}
                    >
                        <TextArea rows={3}></TextArea> 
                    </Form.Item>
                    <Form.Item
                        label={<MyLabel text='Product price' fontSize={15}/>}
                        name="price"
                        rules={[
                            {
                                required: true,
                                message: 'Please input the Product Price!',
                            }
                        ]}
                    >
                        <Input /> 
                    </Form.Item>
                    <Form.Item
                        label={<MyLabel text='Product category' fontSize={15}/>}
                        name="category"
                        initialValue={selectedCategory}
                    >
                        <Select 
                            defaultValue={selectedCategory}
                            options={categories}
                        />
                    </Form.Item>    
                </Form>
            </Modal>
        </>
    );
}