import { Button, Card, Collapse } from "antd";
import { MoreOutlined, PlusOutlined } from "@ant-design/icons";
import { axios } from "../api/axios";
import { useEffect, useState } from "react";
import { CategoryDropdown } from "./CategoryDropdown";
import { useNotificationStore } from "../stores/notifications";
import { AddCategoryModal } from "./AddCategoryModal";
import { CategoryDelete } from "./CategoryDelete";


export function CategoryList() {

    const [dialogOpened, setDialogOpened] = useState({open: false});
    const [categories, setCategories] = useState([]);
    const notifications = useNotificationStore();

    const handleModalCancel = () => {
        setDialogOpened({open: false});
    }

    const getCategoryList = () => {
        axios.get("/category").then(res => {
            setCategories(res);
        });
    };

    const addCategory = (name, description) => {
        axios.post("/category/add", { name, description })
        .then(() => {
            notifications.addNotification({
                type: "success",
                title: "Success",
                message: "Category added successfully"
            })
            handleModalCancel();
            getCategoryList();
        })
        .catch((error) => {
            notifications.addNotification({
                type: "error",
                title: "Error",
                message: error.message
            })
        })
    }

    const updateCategory = (id, name, description) => {
        axios.put("/category/edit", { id, name, description})
        .then(() => {
            notifications.addNotification({
                type: "success",
                title: "Success",
                message: "Category updated successfully"
            })
            getCategoryList();
        })
        .catch((error) => {
            notifications.addNotification({
                type: 'error',
                title: 'Error',
                message: error.message
            })
        })
    }
    
    const deleteCategory = (id) => {
        axios.delete(`/category/delete/id/${id}`)
        .then(() => {
            notifications.addNotification({
                type: "success",
                title: "Success",
                message: "Category deleted successfully"
            })
            getCategoryList();
        })
        .catch((error) => {
            notifications.addNotification({
                type: 'error',
                title: 'Error',
                message: error.message
            })
        })
    }
    

    useEffect(() => {
        getCategoryList();
    }, []);

    return (
        <>
            <Card style={{ margin: "20px" }}>
                <div
                    style = {{
                        display: "flex",
                        justifyContent: "end",
                    }}
                >
                    <Button
                        type="primary"
                        onClick={ () => setDialogOpened({open: true}) }
                        style={{ marginBottom: 10}}
                    >
                        <PlusOutlined /> Add category
                    </Button>
                </div>
                <Collapse items={categories.map((category) => {
                    return {
                        key: category.id,
                        label: category.name,
                        children: <CategoryDropdown 
                                    category={category}
                                    updateCategory={updateCategory}
                                />,
                        extra: <CategoryDelete id={category.id} deleteCategory={deleteCategory} />
                        }
                })}/>
            </Card>
            <AddCategoryModal 
                dialogOpened={dialogOpened}
                setDialogOpened={setDialogOpened}
                addCategory={addCategory}
            />
        </>
    )
}