import { FileDoneOutlined, FilePdfOutlined } from "@ant-design/icons";
import { DashboardCard } from "./DashboardCard";
import { MyHeader } from "./MyHeader";

export function Dashboard() {
    return (
        <>
            <MyHeader title="Dashboard" />
            <DashboardCard 
                title = "Report Created"
                icon={<FilePdfOutlined />}
                dbInfo={"20"}
            />
            <DashboardCard
                title="Report Risolti"
                icon={<FileDoneOutlined />}
                dbInfo={"15"}
            />
        </>
    )
}