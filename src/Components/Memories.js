import { ArrowForward, ArrowRight } from "@mui/icons-material";
import { format } from "date-fns";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  AddFlex,
  CustomButton,
  CustomText,
} from "../ReusableStyledComponents/Reusable";

const MemoryWrapper = styled.div`
  padding: 5px;
  margin-right: 5px;
  border-radius: 5px;
  /* background-color: black; */
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

function Memories({ memoryList }) {
  const navigate = useNavigate();
  const handleNavigateToMemory = (id) => {
    navigate(`/memory/${id}`);
  };

  return (
    <CustomAddFlex>
      {memoryList.map((memory) => (
        <MemoryWrapper
          key={memory.id}
          onClick={() => handleNavigateToMemory(memory.id)}
        >
          <Memory url={memory.imgUrl}>
            <AddFlex width="100%">
              <AddFlex
                flexDirection="column"
                alignItems="flex-start"
                margin="10px"
                grow="1"
              >
                <CustomText
                  fontSize="16px"
                  fontWeight="600"
                  color="white"
                  textAlign="left"
                  // margin="10px"
                >
                  {memory.memoryName}
                </CustomText>
                <CustomText color="white" margin="0">
                  {format(new Date(memory.date), "dd MMM yyyy")}
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
      ))}
    </CustomAddFlex>
  );
}

export default Memories;
