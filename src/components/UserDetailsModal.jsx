import { Collapse, Descriptions, Modal } from "antd";
import storage from "../utils/storage";
import { UserPasswordChange } from "./UserPasswordChange";

export function UserDetailsModal({setOpen, open}) {
    const user = storage.getUser();
    const close = () => {
        setOpen(false);
    }

    return (
        <>
            <Modal
                title="Change Password"
                open={open}
                onCancel={close}
                footer={[]}
            >
                <Descriptions layout="horizontal">
                    <Descriptions.Item label="Username">{user?.username}</Descriptions.Item>
                </Descriptions>
                <Collapse items={[{
                    key: 1,
                    label: "Change Password",
                    children: <UserPasswordChange callbackFn={() => setOpen(false)} />
                }]} />
            </Modal>
        </>
    )
}