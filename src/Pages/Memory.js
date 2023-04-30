import { Add, Edit, Home, More } from "@mui/icons-material";
import { format } from "date-fns";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { db } from "../config-firebase";
import {
  AddFlex,
  CustomText,
  Icon,
  Image,
} from "../ReusableStyledComponents/Reusable";

function Memory() {
  const [memory, setMemory] = useState(null);
  const [isShowIconClicked, setIsShowIconClicked] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const handleGetMemory = async () => {
    const _doc = await getDoc(doc(db, "memories", id));
    if (_doc.exists()) {
      setMemory(_doc.data());
    }
  };
  const handleAddEditMemory = () => {
    navigate(`/memory/edit/${id}`);
  };
  const handleNavigateToHome = () => {
    navigate("/");
  };
  useEffect(() => {
    handleGetMemory();
  }, []);
  return (
    memory && (
      <>
        <Image url={memory.imgUrl}>
          <AddFlex
            margin="30px 20px"
            flexDirection="column"
            alignItems="flex-end"
          >
            <CustomText color="white" fontWeight="600" fontSize="20px">
              {memory.memoryName}
            </CustomText>
            <CustomText color="white" fontWeight="600" fontSize="20px">
              {format(new Date(memory.date), "dd MMM yyyy")}
            </CustomText>
          </AddFlex>
          <Icon
            bottom={isShowIconClicked && "75px"}
            showIcon={isShowIconClicked}
            onClick={handleAddEditMemory}
          >
            <Edit />
          </Icon>
          <Icon
            bottom={isShowIconClicked && "140px"}
            showIcon={isShowIconClicked}
            onClick={handleNavigateToHome}
          >
            <Home />
          </Icon>
          <Icon
            showIcon={true}
            rotate_transform={isShowIconClicked}
            onClick={() => {
              setIsShowIconClicked(!isShowIconClicked);
            }}
          >
            <Add />
          </Icon>
        </Image>
        <AddFlex margin="10px" padding="0 20px">
          <CustomText
            dangerouslySetInnerHTML={{ __html: memory.memoryDescription }}
          />
        </AddFlex>
      </>
    )
  );
}

export default Memory;
