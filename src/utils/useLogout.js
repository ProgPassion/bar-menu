import { useNavigate } from "react-router-dom";
import storage from "./storage";

export function useLogout() {
    const navigate = useNavigate();
    return () => {
        storage.clearUser();
        navigate("/login");
    }
}