import { MenuSection } from './MenuSection';
import { data } from '../data';
import { useRef } from 'react';

export function BarMenu() {
    const divRefs = {};

    for(let i = 0; i < data.length; i++) {
        divRefs[`div${i}`] = useRef(null);
    }

    const handleBtnClick = (divId) => {
        const divRef = divRefs[divId];
        if(divRef.current) {
            divRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }

    return (
        <div>
            <div className='menu_header'>
                <div className='menu_name'>Bar & Grill</div>
                <ul className='menu_sections'>
                {data.map((section, index) => {
                    return <button key={index} onClick={() => handleBtnClick(`div${index}`)} className='menu_sectionButton'>
                            {section.category}
                        </button>;
                })}
                </ul>
            </div>
            <div className='menu_wrapper'>
                <div className='menu_content'>
                {data.map((section, index) => {
                    return <MenuSection 
                            name={section.category} 
                            description={section.description}
                            items={section.items} 
                            sectionId={index}
                            divRefs={divRefs}
                            key={index}
                            />;
                })} 
                </div>
                <footer className='footer'>Powered by <strong>Equity</strong></footer>
            </div>
        </div>
    )
}