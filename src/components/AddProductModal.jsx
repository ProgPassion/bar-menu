import { MoreOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Modal, Input, Select } from "antd";
import { MyLabel } from "./MyLabel";
import TextArea from "antd/es/input/TextArea";

export function AddProductModal({dialogOpened, setDialogOpened, addProduct}) {

    const [form] = Form.useForm();
    const handleCancel = () => {
        setDialogOpened({open: false});
        form.resetFields();
        form.setFieldValue("predefinedProducts", undefined);
    }

    const handleAdd = () => {
        form.validateFields().then(({productName, productDescription, productPrice}) => {
            form.resetFields();
            addProduct(productName, productDescription, productPrice);
            form.setFieldValue("predefinedProducts", undefined);
        });
    }

    const filterOption = (input, option) => {
        return (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
    }

    const predefinedProductOnChange = (value) => {
        let selectedValue = value.split("|");
        let productName = (selectedValue[0] ?? "");
        let productDescription = (selectedValue[1] ?? "");
        
        productName = productName.charAt(0).toUpperCase() + productName.slice(1);
        productDescription = productDescription.charAt(0).toUpperCase() + productDescription.slice(1);    
        
        form.setFieldValue("productName", productName);
        form.setFieldValue("productDescription", productDescription);
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
                    label={<MyLabel text='Predifined Products' fontSize={15}/>}
                    name="predefinedProducts"
                >
                    <Select 
                        showSearch
                        placeholder="Select predefined product"
                        optionFilterProp="children"
                        onChange={predefinedProductOnChange}
                        filterOption={filterOption}
                        listItemHeight={10}
                        listHeight={200}
                        options={[
                            {
                                value: "",
                                label: "-- Clear --",
                            },
                            {
                                label: "Drinks",
                                options: [
                                    {
                                        value: "cola",
                                        label: "Cola",
                                    },
                                    {
                                        value: "spring",
                                        label: "Spring",
                                    },
                                    {
                                        value: "pepsi",
                                        label: "Pepsi",
                                    },
                                    {
                                        value: "b52",
                                        label: "B52",
                                    },
                                    {
                                        value: "Red bull",
                                        label: "Red bull",
                                    },
                                    {
                                        value: "Bravo",
                                        label: "Bravo",
                                    }
                                ]
                            }
                        ]}
                    />
                </Form.Item>
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