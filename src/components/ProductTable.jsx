import { Card, Select, Space, Table, Spin, Button, Popconfirm, Tooltip } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { axios } from "../api/axios";
import { AddProductModal } from "./AddProductModal";
import { EditProductModal } from "./EditProductModal";
import { useNotificationStore } from "../stores/notifications";

export function ProductTable() {

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name"
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description"
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price"
        },
        {
            title: "Edit",
            key: "edit",  
            render: (_, record) => {
                return <Space size="middle">
                         <Button type="link" onClick={() => handleModalEdit(record)}>
                            <EditOutlined />
                         </Button>
                         <Popconfirm title="Are you sure you want to delete this product?" onConfirm={() => handleDelete(record.id)}>
                            <Tooltip title="Delete">
                                <Button type="link" danger>
                                    <DeleteOutlined />
                                </Button>
                            </Tooltip>
                         </Popconfirm>
                       </Space>
            }
        }
    ];

    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [products, setProducts] = useState([]);
    const [insertDialogData, setInsertDialogData] = useState({open: false});
    const [editDialogData, setEditDialogData] = useState({open: false, product: null});
    const notifications = useNotificationStore();

    const [isLoading, setIsLoading] = useState(true);

    const handleModalAddCancel = () => {
        setInsertDialogData({open: false});
    }

    const handleModalEdit = (product) => {
        setEditDialogData({open: true, product});
    }

    const handleModalEditCancel = (product) => {
        setEditDialogData({open: false, product});
    } 

    const handleDelete = (id) => {
        deleteProduct(id);
    }

    const getCategoryList = () => {
        axios.get("/category").then(res => {
            res = res.map((categ) => {
                return {
                    id: categ.id,
                    value: categ.name.toLowerCase(),
                    label: categ.name
                };   
            })
            setCategories(res);
        });
    };

    const getProductsByCategory = ({name}) => {
        axios.get(`/product/by-category?category=${name}`).then(res => {
            res = res.map((prod, index) => {
                prod["key"] = index + 1;
                return prod
            });
            setProducts(res);
            setIsLoading(false);
        });
    }

    const addProduct = (name, description, price) => {
        axios.post("/product/add", { name, description, price, categoryId: selectedCategory.id })
        .then(() => {
            notifications.addNotification({
                type: "success",
                title: "Success",
                message: "Product added successfully"
            })
            handleModalAddCancel();
            getProductsByCategory(selectedCategory);
        })
        .catch((error) => {
            notifications.addNotification({
                type: "error",
                title: "Error",
                message: error.message
            })
        })
    }

    const editProduct = (id, name, description, price, categoryName) => {
        axios.put("/product/edit", { id, name, description, price, categoryName })
        .then(() => {
            notifications.addNotification({
                type: "success",
                title: "Success",
                message: "Product edited successfully"
            })
            handleModalEditCancel({ id, name, description, price });
            getProductsByCategory(selectedCategory);
        })
        .catch((error) => {
            notifications.addNotification({
                type: "error",
                title: "Error",
                message: error.message
            })
        })
    }

    const deleteProduct = (id) => {
        axios.delete(`/product/delete/id/${id}`)
        .then(() => {
            notifications.addNotification({
                type: "success",
                title: "Success",
                message: "Product deleted successfully"
            })
            getProductsByCategory(selectedCategory);
        })
        .catch((error) => {
            notifications.addNotification({
                type: "error",
                title: "Error",
                message: error.message
            })
        })
    }

    const handleChangeCategory = (categoryName) => {
        const categorySelected = categories.find((category) => {
            return category.value === categoryName;
        });
        setSelectedCategory({id: categorySelected.id, name: categoryName});
    }

    useEffect(() => {
        getCategoryList();
    }, []);

    useEffect(() => {
        if(categories.length > 0) {
            setSelectedCategory({id: categories[0].id, name: categories[0].value});
        }
    }, [categories]);

    useEffect(() => {
        if(selectedCategory != null) {
            getProductsByCategory(selectedCategory);
        }
    }, [selectedCategory]);

    return (
        <>
            <Card style={{ margin: "20px" }}>
                {isLoading ? (
                    <Spin />
                ) : (
                    <div>
                        <div>
                            <Space wrap style={{
                                marginBottom: 20, 
                                background: '#eee', 
                                paddingLeft: 20,
                                paddingRight: 20,
                                paddingTop: 10,
                                paddingBottom: 10,  
                            }}>
                                <span style={{
                                    fontSize: 16, 
                                    fontWeight: 700,
                                    marginRight: 15
                                }}>
                                    Current Category
                                </span>
                                <Select
                                    defaultValue={selectedCategory.name}
                                    style={{ minWidth: 150 }}
                                    onChange={handleChangeCategory}
                                    options={categories}
                                />
                            </Space>
                            <Button
                                type="primary"
                                onClick={ () => setInsertDialogData({open: true}) }
                                style={{ marginTop: 10, float: 'right'}}
                            >
                                <PlusOutlined /> Add product
                            </Button>
                        </div>
                        <Table columns={columns} pagination={{position: ["none"]}} dataSource={products} />
                    </div>    
                )}
            </Card>
            {isLoading ? (<></>) : (
                <>
                    <AddProductModal
                        dialogOpened={insertDialogData}
                        setDialogOpened={setInsertDialogData}
                        addProduct={addProduct}
                    />
                    <EditProductModal
                        dialogOpened={editDialogData}
                        setDialogOpened={setEditDialogData}
                        editProduct={editProduct}
                        categories={categories}
                        selectedCategory={selectedCategory.name}
                    />
                </>
            )}
            
        </>
    );
}
