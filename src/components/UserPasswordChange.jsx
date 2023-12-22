import { Button, Form, Input } from "antd";
import { MyLabel } from "./MyLabel";
import { axios } from "../api/axios";
import { useNotificationStore } from "../stores/notifications";

export function UserPasswordChange({callbackFn}) {
    const [form] = Form.useForm();
    const notifications = useNotificationStore();

    const changePassword = (values) => {
        axios.put("/api/auth/update-password", values)
        .then(() => {
            notifications.addNotification({
                type: "success",
                title: "Sucess",
                message: "Password updated successfully"
            })
            if(callbackFn) {callbackFn()}
            form.resetFields();
        })
        .catch((error) => {
            notifications.addNotification({
                type: "error",
                title: "Error",
                message: error.message
            })
        });
        
    }

    return (
        <>
            <Form form={form} onFinish={changePassword} layout="vertical">
                <Form.Item name="currentPassword" label={<MyLabel text={"Current Password"} fontSize={16} />} 
                            rules={[{required: true, message: "Please insert current password"}]}>
                    <Input.Password />
                </Form.Item>
                <Form.Item name="newPassword" label={<MyLabel text={"New Password"} fontSize={16}/>} hasFeedback
                            rules={[
                                {required: true, message: "Please insert new password"},
                                {min: 8, message: "New password must contain at least 8 characters"}
                            ]}>
                    <Input.Password />
                </Form.Item>
                <Form.Item name="passwordConfirm" label={<MyLabel text={"Confirm Password"} fontSize={16}/>} hasFeedback
                            dependencies={['newPassword']}
                            rules={[
                                {required: true, message: "Please insert confirm password"},
                                ({getFieldValue}) => ({
                                    validator(_, value) {
                                        if(!value || getFieldValue("newPassword") === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error("The password provided don't match together"));
                                    }
                                })
                            ]}>
                    <Input.Password />
                </Form.Item>
                <Form.Item>
                    <Button htmlType="submit" type="primary" style={{width: "100%"}}>Change Password</Button>
                </Form.Item>
            </Form>
        </>
    );
}