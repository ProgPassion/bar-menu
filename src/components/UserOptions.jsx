import { List } from "antd";
import { useState } from "react";
import { useLogout } from "../utils/useLogout";
import { UserDetailsModal } from "./UserDetailsModal";

export function UserOptions() {
    const listItemStyle = {
       cursor: "pointer",
       "&:hover": {
            backgroundColor: "#f9f9f9"
       } 
    }
    const [detailsOpen, setDetailsOpen] = useState(false);
    const logout = useLogout();
    return <>
        <List>
            <List.Item style={listItemStyle} onClick={() => setDetailsOpen(true)}>Change Password</List.Item>
            <List.Item style={listItemStyle} onClick={logout}>Logout</List.Item>
        </List>
        <UserDetailsModal open={detailsOpen} setOpen={setDetailsOpen} />
    </>
} 