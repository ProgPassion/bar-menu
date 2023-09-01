import { Card } from "antd"

export function DashboardCard({title, icon, dbInfo}) {
    return (
        <Card>
            <div style={{display:"inline-flex", justifyContent: "space-between"}}>
                <div style={{fontSize: '50px', width:50, color:'#777'}}>
                    {icon}
                </div>
                <div style={{width:200, fontSize:15, marginTop:'auto', marginBottom:10, marginLeft:25}}>
                    <span style={{color: '#aaa'}}>{title}</span>
                    <p style={{padding:0, margin:0}}>{dbInfo}</p>
                </div>
            </div>
        </Card>
    )
}