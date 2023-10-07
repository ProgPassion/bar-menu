import {Button, Form, Input, Card} from "antd";
import Title from "antd/lib/typography/Title";
import { MyLabel } from "./MyLabel";
import { axios } from "../api/axios";
import { useNavigate } from "react-router-dom";
import { useNotificationStore } from "../stores/notifications";
import storage from "../utils/storage";
import { Link } from "react-router-dom";

const LOGIN_URL = "/api/auth/authenticate";

export function Login() {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const notifications = useNotificationStore();


    const authenticate = async (values) => {
        
        try {
            const response = await axios.post(LOGIN_URL, values);
            storage.setUser(response);
            navigate('/admin');
        } catch(error) {
            if(error.code === 403) {
                notifications.addNotification({type:"error", message:"Wrong Email or Password", title:"Authentication Error"});
            }
            else {
                notifications.addNotification({type:"error", message:error.message, title:"Authentication Error"});
            }
        } 
    }

    return (
        <div style={{display: "flex", backgroundColor: "#eee", height: "100vh"}}>
            <Card style={{width:550, margin:"auto", marginTop:"18vh"}}>
                <Title level={3} style={{fontWeight:700, textAlign:"center", marginTop:5, marginBottom:20}}>
                    <span>Login to your account</span>
                </Title>
                <div style={{paddingLeft:40, paddingRight:40}}>
                    <Form layout="vertical" onFinish={authenticate} form={form}>
                        <Form.Item label={<MyLabel text="Email"/>} name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: "Insert Email!"
                                    }
                                ]}>
                            <Input style={{height: 50}} />
                        </Form.Item>
                        <Form.Item label={<MyLabel text="Password"/>} name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: "Insert Password!"
                                    }
                                ]}>
                            <Input.Password style={{height: 50}} />
                        </Form.Item>
                        <Button type="primary" htmlType="submit" style={{width: "100%", marginTop: 15}} size="large">
                            <span style={{fontWeight: 500, fontSize: 18}}>Login</span>
                        </Button>
                        <Button type="link" style={{display: "block", margin: "auto", marginTop: 15, fontSize: 16}}>
                            <Link to="/signup">Sign up</Link>
                        </Button>
                    </Form>
                </div>
            </Card>
        </div>
    )
}