import {Button, Form, Input, Card} from "antd";
import Title from "antd/lib/typography/Title";
import { MyLabel } from "./MyLabel";

export function Login() {
    const [form] = Form.useForm();

    const authenticate = (values) => {
        console.log(values);
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
                    </Form>
                </div>
            </Card>
        </div>
    )
}