import { ArrowBack } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import { format } from "date-fns";
import { deleteDoc, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { v4 } from "uuid";
import TextEditor from "../Components/TextEditor";
import { db } from "../config-firebase";
import { PrimaryActionColor } from "../CONSTANTS";
import { handleImageUpload } from "../Helpers";
import {
  AddFlex,
  CustomButton,
  CustomText,
  Image,
} from "../ReusableStyledComponents/Reusable";

const CustomInput = styled.input`
  padding: 10px;
  width: 100%;
  outline: none;
  margin: 5px 0 0 0;
  border: 1px solid grey;
  border-radius: 5px;
  font-family: Poppins, "sans-serif";
`;

const CustomAddFlex = styled(AddFlex)`
  position: relative;
`;

function AddNewMemory({ isEdit }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [memory, setMemory] = useState({
    date: format(new Date(), "dd MMM yyyy"),
  });

  const navigate = useNavigate();
  const { id } = useParams();
  const handleSetFile = (e) => {
    setFile(e.target.files[0]);
  };
  const handleNavigateBack = () => {
    navigate(-1);
  };
  const handleUpdateMemory = (updateKey, updateValue) => {
    setMemory({ ...memory, [updateKey]: updateValue });
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    await deleteDoc(doc(db, "memories", id)).then(() => {
      setIsDeleting(false);
      navigate("/");
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    const _id = isEdit ? id : v4();
    const bodyObj = memory;
    const tempImgURL =
      "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80";
    await handleImageUpload(file, "memories")
      .then((res) => {
        if (res.length === 0) {
          if (!isEdit) {
            bodyObj["imgUrl"] = tempImgURL;
          }
        } else {
          bodyObj["imgUrl"] = res;
        }
      })
      .then(async () => {
        bodyObj["id"] = _id;
        if (isEdit) {
          await updateDoc(doc(db, "memories", _id), bodyObj);
          return;
        } else {
          await setDoc(doc(db, "memories", _id), bodyObj);
        }
      })
      .then(() => {
        setLoading(false);
        navigate(-1);
      });
  };

  const handleSetMemory = async () => {
    const _doc = await getDoc(doc(db, "memories", id));
    if (_doc.exists()) {
      setMemory(_doc.data());
    }
  };

  useEffect(() => {
    if (isEdit) {
      handleSetMemory();
    }
  }, []);
  return (
    <AddFlex flexDirection="column" alignItems="flex-end" padding="20px">
      <CustomAddFlex width="100%" alignItems="center" justify="center">
        <div className="fixLeft" onClick={handleNavigateBack}>
          <ArrowBack />
        </div>
        <CustomText fontWeight="900" fontSize="30px" color="#E74646">
          Add a new memory
        </CustomText>
      </CustomAddFlex>
      <AddFlex flexDirection="column" width="100%" margin=" 20px 0">
        <CustomText>Add Name to your memory. </CustomText>
        <CustomInput
          placeholder="Add a name to your memory"
          value={memory.memoryName ? memory.memoryName : ""}
          onChange={(e) => handleUpdateMemory("memoryName", e.target.value)}
        />
      </AddFlex>
      <AddFlex flexDirection="column" width="100%" margin="0px 0 20px 0">
        <CustomText>Describe your memory. </CustomText>
        <TextEditor
          placeholder="Describe your memory.."
          value={memory.memoryDescription ? memory.memoryDescription : ""}
          getTextEditorInput={(text) =>
            handleUpdateMemory("memoryDescription", text)
          }
        />
      </AddFlex>
      <AddFlex flexDirection="column" width="100%">
        {isEdit && (
          <Image
            width="100px"
            height="100px"
            url={memory.imgUrl}
            borderRadius={"10px"}
          />
        )}
        <CustomInput type={"file"} onChange={handleSetFile} />
      </AddFlex>
      <AddFlex>
        {isEdit && (
          <CustomButton
            margin="20px 10px"
            minWidth="130px"
            minHeight="40px"
            background={"#E06469"}
            onClick={handleDelete}
            disabled={loading}
          >
            {isDeleting ? (
              <CircularProgress
                size="18px"
                color="info"
                sx={{ color: "black" }}
              />
            ) : (
              <CustomText color="white">Delete memory</CustomText>
            )}
          </CustomButton>
        )}
        <CustomButton
          margin="20px 0"
          minWidth="130px"
          minHeight="40px"
          background={PrimaryActionColor}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <CircularProgress
              size="18px"
              color="info"
              sx={{ color: "black" }}
            />
          ) : (
            <CustomText>Add Memory</CustomText>
          )}
        </CustomButton>
      </AddFlex>
    </AddFlex>
  );
}

export default AddNewMemory;
