import { Button, Input, Modal } from "antd";
import { axios } from "../api/axios";
import { useEffect, useState } from "react";
import { useNotificationStore } from "../stores/notifications";
import { WEB_URL } from "../config";

export function UserUrlModal({isOpen, setIsOpen, urlCode, setUserUrl}) {

    const [tempInputValue, setTempInputValue] = useState(urlCode);
    const notifications = useNotificationStore();

    useEffect(() => {
        // if(isOpen) return;
        setTempInputValue(urlCode);
    }, [urlCode, isOpen]);

    const handleSaveUrl = () => {
        axios.put("/user/seturl", {"url": tempInputValue})
        .then(() => {
            notifications.addNotification({
                type: "success",
                title: "Success",
                message: "Url code changed successfully"
            })
            setIsOpen(false);
            setUserUrl(tempInputValue);
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
        <Modal
            title={"Change URL code"}
            open={isOpen}
            onCancel={() => {
                setIsOpen(false)
            }}
            footer={[
                <Button onClick={() => setIsOpen(false)}>Cancel</Button>,
                <Button type="primary" onClick={handleSaveUrl}>
                    Save
                </Button>
            ]}
        >
            <label htmlFor="input">Menu link:</label>
            <Input
                addonBefore={`${WEB_URL}/menu/`}
                type="text"
                placeholder="Url code"
                value={tempInputValue}
                onChange={(e) => setTempInputValue(e.target.value)}
            />
        </Modal>
    );
}