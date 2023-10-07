import { Button, Card, Form, Input } from "antd";
import Title from "antd/lib/typography/Title";
import { MyLabel } from "./MyLabel";
import { axios } from "../api/axios";
import { useNavigate } from "react-router-dom";
import { useNotificationStore } from "../stores/notifications";
import storage from "../utils/storage";

const REGISTER_URL = "/api/auth/register";

export function SingUp() {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const notifications = useNotificationStore();

    const register = async (values) => {
        try {
            const response = await axios.post(REGISTER_URL, values);
            storage.setUser(response);
            navigate('/admin');
        } catch(error) {
            notifications.addNotification({type:"error", message:error.message, title:"Error"});
        }
    }

    return (
        <div style={{display: "flex", backgroundColor: "#eee", height: "100vh"}}>
        <Card style={{width:550, margin:"auto", marginTop: "10vh"}}>
            <Title
                level={3}
                style={{
                    textAlign: "center",
                    marginTop: 5,
                    marginBottom: 20,
                }}
            >
                <span>Sign up</span>
            </Title>
            <Form layout="vertical" onFinish={register} form={form}>
                <Form.Item
                    label={<MyLabel text="Email" />}
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: "Email is required",
                        },
                    ]}
                >
                    <Input style={{height: 50}} />
                </Form.Item>
                <Form.Item
                    label={<MyLabel text="First Name" />}
                    name="firstname"
                    rules={[
                        {
                            required: true,
                            message: "First Name is required",
                        }
                    ]}
                >
                    <Input style={{height: 50}} />
                </Form.Item>
                <Form.Item
                    label={<MyLabel text="Last Name" />}
                    name="lastname"
                    rules={[
                        {
                            required: true,
                            message: "Last Name is required",
                        }
                    ]}
                >
                    <Input style={{height: 50}} />
                </Form.Item>
                <Form.Item
                    label={<MyLabel text="Password" />}
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "Password is required",
                        }
                    ]}
                >
                    <Input.Password style={{ height: 50 }} />
                </Form.Item>
                <Form.Item
                    label={<MyLabel text="Confirm Password" />}
                    name="confirmpassword"
                    rules={[
                        {
                            required: true,
                            message: "Please confirm your password",
                        },
                        {
                            validator: (_, value) => {
                                if(!value || value === form.getFieldValue("password")) {
                                    return Promise.resolve();
                                }
                                return Promise.reject("Passwords do not match");
                            }
                        }
                    ]}
                >
                    <Input.Password style={{ height: 50 }} />
                </Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    style={{width: "100%", marginTop: 15}}
                    size="large"
                >
                    <span
                        style={{
                            fontWeight: 500,
                            fontSize: 18,
                        }}
                    >
                        Sign up
                    </span>
                </Button>
            </Form>
        </Card>
        </div>
    )
}