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
import { useNotificationStore } from "../stores/notifications";

export function Dashboard() {

    const [categories, setCategories] = useState(0);
    const [products, setProducts] = useState(0);
    const [treeData, setTreeData] = useState([]);
    const [userUrl, setUserUrl] = useState("");
    const [userBusinessName, setUserBusinessName] = useState("");
    const [isUrlFetched, setIsUrlFetched] = useState(false);
    const [isBusinessNameFetched, setIsBusinessNameFetched] = useState(false);
    
    const [isUrlModalOpen, setIsUrlModalOpen] = useState(false);
    const antIcon = <LoadingOutlined style={{ fontSize: 140}} spin />
    const notifications = useNotificationStore();


    const getUserUrl = () => {
        axios.get("/user/geturl").then(res => {
            setUserUrl(res);
            setIsUrlFetched(true);
        });
    }

    const getUserBusinessName = () => {
        axios.get("/user/getbusinessname").then(res => {
            setUserBusinessName(res);
            setIsBusinessNameFetched(true);
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

    const handleSaveBusinessName = () => {
        axios.put("/user/setbusinessname", {"name": userBusinessName})
        .then(() => {
            notifications.addNotification({
                type: "success",
                title: "Success",
                message: "Business name changed successfully"
            })
        })
        .catch((error) => {
            notifications.addNotification({
                type: "error",
                title: "Error",
                message: error.message
            })
        });
    }

    useEffect(() => {
        getDashboardData();
        getUserUrl();
        getUserBusinessName();
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
            { (isUrlFetched === false || isBusinessNameFetched === false)
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
                            <div style={{display: "flex", flexDirection: "column"}}>
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
                                <div style={{display: "flex", marginTop: "10px", alignItems: "center"}}>
                                    <span style={{width: "100px", color: "#777373", fontWeight: "700"}}>Business name: </span>
                                    <Input 
                                        type="text" 
                                        style={{width: "240px"}} 
                                        value={userBusinessName} 
                                        onChange={(e) => setUserBusinessName(e.target.value)} 
                                    />
                                    <Button 
                                        style={{
                                            backgroundColor: "#1677ff", 
                                            color: "#fff"
                                        }}
                                        onClick={handleSaveBusinessName}
                                    >
                                        Save
                                    </Button>
                                </div>
                            </div>
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