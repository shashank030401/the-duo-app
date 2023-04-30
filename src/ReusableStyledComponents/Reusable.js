import styled from "styled-components";
import { PrimaryActionColor } from "../CONSTANTS";

export const CustomText = styled.p`
  margin: ${(props) => (props.margin ? props.margin : 0)};
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : "normal")};
  font-size: ${(props) => (props.fontSize ? props.fontSize : "14px")};
  color: ${(props) => (props.color ? props.color : "black")};
  text-align: ${(props) => (props.textAlign ? props.textAlign : "black")};
`;

export const AddFlex = styled.div`
  display: flex;
  flex-direction: ${(props) =>
    props.flexDirection ? props.flexDirection : "row"};
  padding: ${(props) => props.padding && props.padding};
  margin: ${(props) => props.margin && props.margin};
  flex-grow: ${(props) => props.grow && props.grow};
  width: ${(props) => props.width && props.width};
  height: ${(props) => props.height && props.height};
  justify-content: ${(props) => props.justify && props.justify};
  align-items: ${(props) =>
    props.alignItems ? props.alignItems : "flex-start"};
`;
export const Icon = styled.div`
  position: fixed;
  transition: all 0.1s ease-in-out;
  bottom: ${(props) => (props.bottom ? props.bottom : "10px")};
  transform: ${(props) => (props.rotate_transform ? "rotate(45deg)" : "false")};
  right: 10px;
  padding: 10px;
  display: flex;
  align-itms: center;
  justify-content: center;
  -webkit-box-shadow: ${(props) =>
    props.showIcon === true && "-1px 3px 14px 0px rgba(0, 0, 0, 0.31)"};
  -moz-box-shadow: ${(props) =>
    props.showIcon === true && "-1px 3px 14px 0px rgba(0, 0, 0, 0.31)"};
  box-shadow: ${(props) =>
    props.showIcon === true && "-1px 3px 14px 0px rgba(0, 0, 0, 0.31)"};
  border-radius: 100%;
  background-color: ${PrimaryActionColor};
  z-index:${(props) => props.zIndex && props.zIndex}
  cursor: pointer;
`;

export const Image = styled.div`
  display: flex;
  position: relative;
  align-items: flex-end;
  justify-content: flex-end;
  background: linear-gradient(180deg, hsla(0, 0%, 0%, 0), hsla(0, 0%, 0%, 0.65)),
    url(${(props) => props.url && props.url}) no-repeat center center / cover;
  height: ${(props) => (props.height ? props.height : "700px")};
  width: ${(props) => (props.width ? props.width : "100%")};
  border-radius: ${(props) =>
    props.borderRadius ? props.borderRadius : "0 0 0 90px"};

  word-wrap: break-word;
`;

export const CustomButton = styled.button`
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: ${(props) => props.justify && props.justify};
  position: relative;
  padding: ${(props) => (props.padding ? props.padding : "9px 20px")};
  margin: ${(props) => props.margin && props.margin};
  background-color: ${(props) =>
    props.background ? props.background : "transparent"};
  color: ${(props) => (props.color ? props.color : "black")};
  border: ${(props) => (props.border ? props.border : "1px solid black")};
  outline: none;
  border-radius: ${(props) =>
    props.borderRadius ? props.borderRadius : "8px"};
  margin: ${(props) => (props.margin ? props.margin : "10px 0")};
  min-width: ${(props) => props.minWidth && props.minWidth};
  min-height: ${(props) => props.minHeight && props.minHeight};
  transition: all 0.3s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: ${(props) => props.fontWeight && props.fontWeight};
  &:hover {
    background-color: ${(props) =>
      props.hoverBackground && props.hoverBackground};

    color: ${(props) => props.hoverColor && props.hoverColor};
  }
`;
