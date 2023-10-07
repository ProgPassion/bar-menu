import { Result } from "antd";

export function NotFound() {
    
    return (
        <div>
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
            />
        </div>
    )
}