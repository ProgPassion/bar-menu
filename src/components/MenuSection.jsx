import { MenuItem } from "./MenuItem";

export function MenuSection({name, description, items, sectionId, divRefs}) {
    return (
        <div ref={divRefs[`div${sectionId}`]} className='menu_section'>
            <div className='menu_sectionName'>{name}</div>
            <div className='menu_sectionDescription'>{description}</div>
            {items.map((item, index) => {
                return <MenuItem 
                            itemName={item.itemName} 
                            itemPrice={item.itemPrice} 
                            itemDescription={item.itemDescription}
                            key={index}
                        />
            })}
        </div>
    )
}