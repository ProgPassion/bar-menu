import {LoadingOutlined} from "@ant-design/icons";
import {Spin} from "antd";

export const MySpin = ({props, iconSize}) => {
  if(!iconSize)
    iconSize = 24
  const icon = <LoadingOutlined style={{ fontSize: iconSize }} spin />;
  return <Spin indicator={icon} {...props}/>;
}