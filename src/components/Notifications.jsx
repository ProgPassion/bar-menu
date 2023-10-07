import { useNotificationStore } from "../stores/notifications";
import { notification } from "antd";

export const Notifications = () => {
    const notificationStore = useNotificationStore();
    
    notificationStore.notifications.map((notificationItem) => {
        notification.open({
          type: notificationItem.type,
          placement: "topRight",
          message: notificationItem.title,
          description: notificationItem.message
        })
    })
    if(notificationStore.notifications.length > 0)
        notificationStore.clearNotifications();
    return null;
}