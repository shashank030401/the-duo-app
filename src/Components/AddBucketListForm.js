import { doc, getDocs, setDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import styled from "styled-components";
import { db } from "../config-firebase";
import { PrimaryActionColor } from "../CONSTANTS";
import { CustomButton, CustomText } from "../ReusableStyledComponents/Reusable";
import { v4 } from "uuid";

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

function AddBucketListForm({ updateBucketLists, handleDialogAction }) {
  const [input, setInput] = useState("");
  const handleSubmit = async () => {
    const id = v4();
    const newdata = await setDoc(doc(db, "bucketLists", id), {
      id: id,
      name: input,
      list: [],
    });

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
          Add a name to this bucket list.
        </CustomText>
      </label>
      <CustomInput
        value={input}
        onChange={handleChange}
        placeholder={"Enter your bucketlist name here"}
      />
      <CustomButton background={PrimaryActionColor} onClick={handleSubmit}>
        <CustomText>Add New Bucket List</CustomText>
      </CustomButton>
    </CustomInputWrapper>
  );
}

export default AddBucketListForm;
