import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  Fab,
} from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import { PrimaryActionColor } from "../CONSTANTS";
import AddBucketListForm from "./AddBucketListForm";
import CustomDialog from "./CustomDialog";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  AddFlex,
  CustomButton,
  CustomText,
} from "../ReusableStyledComponents/Reusable";
import { Add, Edit } from "@mui/icons-material";

const BucketListHolder = styled.div`
  /* padding: 20px; */
  width: 100%;
`;

function BucketList({
  lists,
  updateBucketLists,
  addBucketListClicked,
  isAddItemClicked,
  handleAddItemDialogClicked,
  handleDialogAction,
  isItemEditClicked,
  editItemIndex,
  handleCheckListItem,
  id,
}) {
  const handleDialog = () => {
    handleDialogAction();
  };
  return (
    <>
      <BucketListHolder>
        {lists.map((list, bucketListIndex) => (
          <Accordion sx={{ width: "100%" }} key={list.id}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <CustomText>{list.name}</CustomText>
            </AccordionSummary>
            <AccordionDetails>
              <AddFlex flexDirection="column" alignItems="flex-end">
                <AddFlex flexDirection="column" width="100%">
                  {list.list.map((item, index) => (
                    <AddFlex
                      alignItems="center"
                      justify="space-between"
                      key={item.id}
                      width="100%"
                      margin="10px 0 20px 0"
                      padding="0 10px"
                    >
                      <AddFlex alignItems="center">
                        <Checkbox
                          onClick={() =>
                            handleCheckListItem(bucketListIndex, index)
                          }
                        />
                        <CustomText
                          textAlign="left"
                          style={{
                            textDecoration: item.checked
                              ? "line-through"
                              : "none",
                          }}
                        >
                          {item.task}
                        </CustomText>
                      </AddFlex>
                      <Edit
                        onClick={() =>
                          handleAddItemDialogClicked(
                            list.id,
                            true,
                            index,
                            bucketListIndex
                          )
                        }
                      />
                    </AddFlex>
                  ))}
                </AddFlex>
                <Fab
                  color="primary"
                  sx={{
                    backgroundColor: `${PrimaryActionColor}`,
                    width: "50px",
                    height: "50px",
                  }}
                  aria-label="add"
                  onClick={() => handleAddItemDialogClicked(list.id, false)}
                >
                  <Add sx={{ color: `black` }} />
                </Fab>
              </AddFlex>
            </AccordionDetails>
          </Accordion>
        ))}
      </BucketListHolder>

      <CustomDialog
        isOpen={addBucketListClicked}
        handleClose={handleDialog}
        dialogContentComponent={
          <AddBucketListForm
            formTitle={"Add a name to this bucket list."}
            actionButtonText={"Add new bucket list"}
            updateBucketLists={updateBucketLists}
            formPlaceholder={"Enter your bucketlist name here"}
            id={id}
            isAdd={true}
            handleDialogAction={handleDialogAction}
          />
        }
      />

      <CustomDialog
        isOpen={isAddItemClicked}
        handleClose={handleAddItemDialogClicked}
        dialogContentComponent={
          <AddBucketListForm
            formTitle={
              isItemEditClicked
                ? "Edit this task"
                : "Add a new task to your list"
            }
            formPlaceholder={"Enter your task here"}
            actionButtonText={isItemEditClicked ? "Edit Task" : "Add Task "}
            id={id}
            editItemIndex={editItemIndex}
            isItemEditClicked={isItemEditClicked}
            updateBucketLists={updateBucketLists}
            handleDialogAction={handleAddItemDialogClicked}
          />
        }
      />
    </>
  );
}

export default BucketList;
