import { Button, Input } from "antd";
import { MyLabel } from "./MyLabel";
import { useState } from "react";
import TextArea from "antd/es/input/TextArea";
import { axios } from "../api/axios";



export function CategoryDropdown({category, updateCategory}) {

    const [categoryName, setCategoryName] = useState(category.name);
    const [categoryDescription, setCategoryDescription] = useState(category.description);

    const handleSaveCategory = () => {
        updateCategory(category.id, categoryName, categoryDescription)
    }

    return (
        <>
            <MyLabel text={"Category Name:"} />
            <Input
                style={{ marginTop: 5, marginBottom: 10 }}
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
            />
            <MyLabel text={"Category Description:"} />
            <TextArea 
                rows={3} 
                style={{ marginTop: 5, marginBottom: 10}}
                value={categoryDescription}
                onChange={(e) => setCategoryDescription(e.target.value)}
            />
            <Button type="primary" onClick={handleSaveCategory}>
                Save
            </Button>
        </>
    )
}