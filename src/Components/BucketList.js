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
    <div>
      <BucketListHolder>
        {lists.map((list) => (
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <CustomText>{list.name}</CustomText>
            </AccordionSummary>
            <AccordionDetails>
              <CustomText>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </CustomText>
            </AccordionDetails>
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
    </div>
  );
}

export default BucketList;
