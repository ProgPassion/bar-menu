import { MyHeader } from "./MyHeader";
import { CategoryList } from "./CategoryList";

export function Category() {
    return <>
        <MyHeader title="Categories" />
        <CategoryList />
    </>
}