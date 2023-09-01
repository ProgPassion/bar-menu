import Title from "antd/lib/typography/Title";
import {grey} from "@ant-design/colors";

export function MyHeader({title}) {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                paddingLeft: "20px",
                padding: 20,
                width: "100%",
                backgroundColor: "white",
                height: 80,
                alignItems: "center",
        }}>
            <div style={{flex: 1, display: "flex", alignItems: "center"}}>
              <Title level={3} style={{margin: 0, color: grey.primary}}>
                {title}
              </Title>
            </div>
        </div>

    )
}