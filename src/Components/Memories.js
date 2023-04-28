import { ArrowForward, ArrowRight } from "@mui/icons-material";
import React from "react";
import styled from "styled-components";
import { AddFlex } from "../App";
import { CustomButton, CustomText } from "../ReusableStyledComponents/Reusable";

const MemoryWrapper = styled.div`
  padding: 5px;
  margin-right: 5px;
  border-radius: 5px;
  background-color: black;
`;

const Memory = styled.div`
  display: flex;
  align-items: flex-end;
  background: linear-gradient(
      180deg,
      hsla(0, 0%, 100%, 0),
      hsla(0, 0%, 0%, 0.75)
    ),
    url(${(props) => props.url && props.url}) no-repeat center center / cover;
  height: 300px;
  width: 200px;
  border-radius: 5px;
  word-wrap: break-word;
`;

const CustomAddFlex = styled(AddFlex)`
  max-width: 90vw;
  overflow-x: scroll;
`;

function Memories() {
  return (
    <CustomAddFlex>
      <MemoryWrapper>
        <Memory
          url={
            "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
          }
        >
          <AddFlex width="100%">
            <AddFlex
              flexDirection="column"
              alignItems="flex-start"
              margin="10px"
              grow="1"
            >
              <CustomText
                fontSize="20px"
                fontWeight="600"
                color="white"
                // margin="10px"
              >
                Memory
              </CustomText>
              <CustomText color="white" margin="0">
                {new Date().getDate()}
              </CustomText>
            </AddFlex>
            <CustomButton
              background="transparent"
              padding="5px"
              borderRadius="100%"
              border="none"
            >
              <ArrowForward sx={{ color: "white" }} />
            </CustomButton>
          </AddFlex>
        </Memory>
      </MemoryWrapper>
    </CustomAddFlex>
  );
}

export default Memories;
