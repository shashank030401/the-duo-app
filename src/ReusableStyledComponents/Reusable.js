import styled from "styled-components";

export const CustomText = styled.p`
  margin: ${(props) => (props.margin ? props.margin : 0)};
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : "normal")};
  font-size: ${(props) => (props.fontSize ? props.fontSize : "14px")};
  color: ${(props) => (props.color ? props.color : "black")};
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
