import {
  doc,
  getDocs,
  setDoc,
  collection,
  updateDoc,
  FieldValue,
  getDoc,
} from "firebase/firestore";
import React, { useState } from "react";
import styled from "styled-components";
import { db } from "../config-firebase";
import { PrimaryActionColor } from "../CONSTANTS";
import { CustomButton, CustomText } from "../ReusableStyledComponents/Reusable";
import { v4 } from "uuid";
import { CircularProgress } from "@mui/material";

const CustomInputWrapper = styled.div`
  padding: 10px;
`;

const CustomInput = styled.input`
  padding: 10px;
  width: 100%;
  outline: none;
  margin: 5px 0 0 0;
  border: 1px solid grey;
  border-radius: 5px;
  font-family: Poppins, "sans-serif";
`;

function AddBucketListForm({
  formTitle,
  updateBucketLists,
  formPlaceholder,
  handleDialogAction,
  isItemEditClicked,
  editItemIndex,
  actionButtonText,
  id,
  isAdd,
}) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    setLoading(true);
    console.log(id);
    const _id = id && id.length > 0 ? id : v4();
    console.log(_id);
    if (isAdd) {
      const newdata = await setDoc(doc(db, "bucketLists", _id), {
        id: _id,
        name: input,
        list: [],
      });
    } else {
      const newData = await getDoc(doc(db, "bucketLists", _id));
      var list = newData.data().list;
      if (isItemEditClicked) {
        list[editItemIndex] = { ...list[editItemIndex], task: input };
      } else {
        list.push({ id: v4(), task: input, checked: false });
      }
      console.log(list);
      await updateDoc(doc(db, "bucketLists", _id), {
        list: list,
      });
      setLoading(false);
    }

    const _collections = await getDocs(collection(db, "bucketLists"));
    const newColl = [];
    _collections.forEach((collection) => {
      newColl.push(collection.data());
    });
    updateBucketLists(newColl);
    handleDialogAction();
  };
  const handleChange = (e) => {
    setInput(e.target.value);
  };
  return (
    <CustomInputWrapper>
      <label>
        <CustomText fontWeight="500" fontSize="14px" margin="10px 0">
          {formTitle}
        </CustomText>
      </label>
      <CustomInput
        value={input}
        onChange={handleChange}
        placeholder={formPlaceholder}
      />

      <CustomButton
        margin="20px 0px"
        minWidth="130px"
        minHeight="40px"
        background={PrimaryActionColor}
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <CircularProgress size="18px" color="info" sx={{ color: "black" }} />
        ) : (
          <CustomText color="black">{actionButtonText}</CustomText>
        )}
      </CustomButton>
    </CustomInputWrapper>
  );
}

export default AddBucketListForm;
