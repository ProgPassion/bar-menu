export function MenuItem({itemName, itemPrice, itemDescription}) {
    return (
        <div className='menu_item'>
            <div className='menu_name-price'>
                <div className='menu_itemName'>{itemName}</div>
                <div className='menu_itemPrice'>{itemPrice}</div>
            </div>
            <div className='menu_itemDescription'>{itemDescription}</div>
        </div>
    )
}