import { CoffeeOutlined, BarsOutlined, DownOutlined, QrcodeOutlined, CopyFilled} from "@ant-design/icons";
import { Tree, Card, Input, Button, Spin, Space, Tooltip, QRCode, message } from "antd";
import { MyLabel } from "./MyLabel";
import { DashboardCard } from "./DashboardCard";
import { MyHeader } from "./MyHeader";
import { useEffect, useState } from "react";
import {LoadingOutlined, InfoCircleOutlined} from '@ant-design/icons';
import { UserUrlModal } from "./UserUrlModal";
import { axios } from "../api/axios";
import { WEB_URL } from "../config";

export function Dashboard() {

    const [categories, setCategories] = useState(0);
    const [products, setProducts] = useState(0);
    const [treeData, setTreeData] = useState([]);
    const [userUrl, setUserUrl] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isUrlModalOpen, setIsUrlModalOpen] = useState(false);
    const antIcon = <LoadingOutlined style={{ fontSize: 140}} spin />


    const getUserUrl = () => {
        axios.get("/user/geturl").then(res => {
            setUserUrl(res);
            setIsLoading(false);
        });
    }

    const getDashboardData = () => {
        let tempCategories = 0;
        let tempProducts = 0; 
        
        axios.get("/product").then(res => {
            const result = res.map((data, categIndex) => {  
                tempCategories++;
                return {
                    title: data.name,
                    key: `${categIndex}-0`,
                    children: data.products.map((product, prodIndex) => {
                        tempProducts++;
                        return {
                            title: `${product.name} - ${product.price}$`,
                            key: `${categIndex}-${prodIndex + 1}`,
                        }
                    }),
                }
            });
            setCategories(tempCategories);
            setProducts(tempProducts);
            setTreeData(result);
        });
    }

    const handleCopy = (text) => {
        if(!text) {
            message.error("Copy failed. Please try again.");
            return;
        }
        navigator.clipboard
            .writeText(text)
            .then(() => message.success("Link copied successfully."))
            .catch(() => message.error("Copy failed. Please try again."));
    }

    const downloadQRCode = () => {
        const canvas = document.getElementById("myqrcode")?.querySelector("canvas");
        if(canvas) {
            const url = canvas.toDataURL();
            const a = document.createElement("a");
            a.download = "QRCode.png";
            a.href = url;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    }

    useEffect(() => {
        getDashboardData();
        getUserUrl();
    }, []);

    return (
        <>
            <MyHeader title="Dashboard" />
            <DashboardCard 
                title = "Categories"
                icon={<BarsOutlined />}
                dbInfo={categories}
            />
            <DashboardCard
                title="Product"
                icon={<CoffeeOutlined />}
                dbInfo={products}
            />
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
                <Card>
                    <div style={{display: "flex"}}>
                        <Tree 
                            showIcon
                            switcherIcon={<DownOutlined />}
                            treeData={treeData}
                        />
                        <div style={{marginLeft: "auto"}}>
                            <div style={{display: "flex"}}>
                                <label style={{display: "flex"}}>
                                    <Space>
                                        <MyLabel text={"Direct Link"} />
                                        <Tooltip title={"Use this link to access the menu"}>
                                            <InfoCircleOutlined style={{fontSize: 11, color: "#545653"}} />
                                        </Tooltip>
                                    </Space>
                                </label>
                                <Button type="link" onClick={() => {setIsUrlModalOpen(true);}}
                                style={{display: "flex", marginLeft: "auto"}}>
                                    Change
                                </Button>
                            </div>
                            <Space.Compact style={{width: "400px"}}>
                                <Input type="text" value={`${WEB_URL}/menu/${userUrl}`} />
                                <div id="myqrcode">
                                    <QRCode value={`${WEB_URL}/menu/${userUrl}`} bgColor="#fff"
                                        color="#000" size={300} bordered={true} errorLevel="Q" style={{display: "none"}} />
                                    <Button icon={<QrcodeOutlined style={{fontSize: 11, color: "#545653"}}/>} 
                                        onClick={downloadQRCode}/>
                                </div>
                                <Button onClick={() => handleCopy(`${WEB_URL}/menu/${userUrl}`)} icon={<CopyFilled style={{fontSize: 11, color: "#545653"}} />}/>
                            </Space.Compact>
                        </div>
                    </div>
                </Card>
                <UserUrlModal
                    isOpen={isUrlModalOpen}
                    setIsOpen={setIsUrlModalOpen}
                    urlCode={userUrl}
                    setUserUrl={setUserUrl}
                />
                </>
            )}
        </>
    )
}