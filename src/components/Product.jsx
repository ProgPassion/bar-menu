import { MyHeader } from "./MyHeader";
import { ProductTable } from "./ProductTable";

export function Product() {
    return <>
        <MyHeader title="Products" />
        <ProductTable />
    </>;
}