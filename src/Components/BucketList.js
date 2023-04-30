import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import { PrimaryActionColor } from "../CONSTANTS";
import AddBucketListForm from "./AddBucketListForm";
import CustomDialog from "./CustomDialog";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { CustomText } from "../ReusableStyledComponents/Reusable";

const BucketListHolder = styled.div`
  /* padding: 20px; */
  width: 100%;
`;

function BucketList({
  lists,
  updateBucketLists,
  addBucketListClicked,
  handleDialogAction,
}) {
  const handleDialog = () => {
    handleDialogAction();
  };
  return (
    <>
      <BucketListHolder>
        {lists.map((list) => (
          <Accordion sx={{ width: "100%" }} key={list.id}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <CustomText>{list.name}</CustomText>
            </AccordionSummary>
            <AccordionDetails></AccordionDetails>
          </Accordion>
        ))}
      </BucketListHolder>

      <CustomDialog
        isOpen={addBucketListClicked}
        handleClose={handleDialog}
        dialogContentComponent={
          <AddBucketListForm
            updateBucketLists={updateBucketLists}
            handleDialogAction={handleDialogAction}
          />
        }
      />
    </>
  );
}

export default BucketList;
