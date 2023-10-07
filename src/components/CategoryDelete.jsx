import { Button } from "antd";

export function CategoryDelete({id, deleteCategory}) {

    const handleDeleteCategory = (e) => {
        e.stopPropagation();
        deleteCategory(id);
    }

    return (
        <Button
            danger
            style={{ minWidth: 90 }}
            onClick={handleDeleteCategory}
        >
            Remove
        </Button>
    );
}