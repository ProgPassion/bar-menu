import { MenuSection } from './MenuSection';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import {LoadingOutlined} from '@ant-design/icons';
import { Spin } from 'antd';
import { axios } from "../api/axios";
import React from 'react';
import { NotFound } from './NotFound';

export function BarMenu() {
    const { linkCode } = useParams();
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [divRefs, setDivRefs] = useState({});
    const [notFound, setNotFound] = useState(true);
    const antIcon = <LoadingOutlined style={{ fontSize: 140}} spin />

    const handleSetDivRefs = (data) => {
        for(let i = 0; i < data.length; i++) {
            divRefs[`div${i}`] = React.createRef();
        }
        setDivRefs(divRefs)
    }
    
    const getMenuData = () => {
        axios.get(`/menu/${linkCode}`)
        .then(res => {
            setData(res);
            setIsLoading(false);
            handleSetDivRefs(res);
            setNotFound(false);
        })
        .catch((error) => {
            setIsLoading(false);
        });
    }

    const handleBtnClick = (divId) => {
        const divRef = divRefs[divId];
        if(divRef.current) {
            divRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }

    useEffect(() => {
        getMenuData();
    }, []);

    return (
        <div>
            {isLoading 
            ? (
                <div style={{
                    width: "100vw", 
                    height: "100vh", 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center"
                }}>
                    <Spin indicator={antIcon} />
                </div>
            ) : (
                <>
                {notFound
                ? (
                    <NotFound />
                ) : (
                    <>
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
                    </>
                )}
                </>
            )}
        </div>
    )
}