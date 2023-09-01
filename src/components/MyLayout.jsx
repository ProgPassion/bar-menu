import { useState } from 'react';
import {
    BarChartOutlined,
    SolutionOutlined,
    SwapOutlined,
    TeamOutlined, UnorderedListOutlined,
    UserOutlined,
} from '@ant-design/icons';
import {Layout, Menu, Popover, theme} from 'antd';
import {Footer} from "antd/lib/layout/layout";
import {Link, useLocation} from "react-router-dom";

const {Content, Sider} = Layout;

const itemsTop = [
    {title: 'Dashboard', key: '1', url: '/admin', icon: <BarChartOutlined/>},
    {title: 'Categories', key: '2', url: '/admin/categories', icon: <UnorderedListOutlined/>},
    {title: 'Products', key: '3', url: '/admin/products', icon: <SolutionOutlined/>},
];

const getItemTopByUrl = (url) => {
    return itemsTop.find(item => item.url === url);
}

export function MyLayout({children, visible = true}) {
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();
    const {
        token: {colorBgContainer},
    } = theme.useToken();


    if(visible === false) return children;

    return (
        <Layout style={{minHeight: '100vh', width: '100%'}}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <Menu theme='dark' defaultSelectedKeys={[getItemTopByUrl(location.pathname)?.key || "1"]} mode="inline">
                    {itemsTop.map((item) => {
                        return <Menu.Item key={item.key}>
                            {item.icon}
                            <span>{item.title}</span>
                            <Link to={item.url || "/"}/>
                        </Menu.Item>
                    })}
                </Menu>
                <div style={{bottom: 50, position: "absolute", width: "100%"}}>
                    <Popover placement='rightTop' title="admin">
                        <Menu theme="dark" mode="inline" defaultSelectedKeys={["user"]}>
                            <Menu.Item key="user" title="">
                                <UserOutlined />
                                <span>admin</span>
                            </Menu.Item>
                        </Menu>
                    </Popover>
                </div>
            </Sider>
            <Layout style={{width: "100%", overflowX:'hidden'}}>
                <Content style={{margin: '0', width: "100%", overflow:"auto", height:"calc(100vh - 40px)"}}>
                    {children}
                </Content>
                <Footer style={{textAlign: 'center', backgroundColor: "rgb(206,212,217)", height: 40, paddingTop: 10, whiteSpace:"nowrap", textOverflow:"ellipsis"}}>
                    Questo software è stato prodotto da Equity - © 2023 Equity. <a target="_blank" href="https://www.gms-equity.com">www.gms-equity.com</a> Tutti i diritti di proprietà
                    intellettuale appartengono a Seta Srl. <a target="_blank" href="https://www.setagroup.it">www.setagroup.it</a>
                </Footer>
            </Layout>
        </Layout>
    );
}