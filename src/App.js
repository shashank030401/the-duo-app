import { Add } from "@mui/icons-material";
import ListAltIcon from "@mui/icons-material/ListAlt";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import "./App.css";
import { useEffect, useState } from "react";
import { db } from "./config-firebase";
import BucketList from "./Components/BucketList";
import { AddFlex, CustomText, Icon } from "./ReusableStyledComponents/Reusable";
import { HeaderContent, PrimaryActionColor } from "./CONSTANTS";
import styled from "styled-components";
import Memories from "./Components/Memories";
import { useNavigate } from "react-router-dom";
import { Backdrop, CircularProgress } from "@mui/material";

function App() {
  const [bucketLists, setBucketLists] = useState([]);
  const [memoryList, setMemoryList] = useState([]);
  const [selectedListId, setSelectedListId] = useState("");
  const [isShowIconClicked, setIsShowIconClicked] = useState(false);
  const [isAddBucketListClicked, setIsBucketListClicked] = useState(false);
  const [isItemEditClicked, setIsItemEditClicked] = useState(null);
  const [editItemIndex, setEditItemIndex] = useState(false);
  const [bucketListIndex, setBucketListIndex] = useState(null);
  const [isAddItemClicked, setIsAddItemClicked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [listLoading, setListLoading] = useState(false);
  const navigate = useNavigate();
  const handleAddData = async () => {
    setLoading(true);
    const bucketLists = await getDocs(collection(db, "bucketLists"));
    const q = query(collection(db, "memories"), orderBy("date", "asc"));
    // const memoriesCollection = collection(db, "memories");

    const memories = await getDocs(q);
    const bucketListArr = [];
    const memoriesArr = [];
    bucketLists.forEach((doc) => {
      bucketListArr.push(doc.data());
    });
    memories.forEach((doc) => {
      memoriesArr.push(doc.data());
    });
    setMemoryList(memoriesArr);
    setBucketLists(bucketListArr);
    setLoading(false);
  };
  const handleUpdateBucketLists = (data) => {
    setBucketLists(data);
  };
  const handleAddNewList = () => {
    setIsBucketListClicked(!isAddBucketListClicked);
  };

  const handleAddItemDialogClicked = (
    id,
    isEdit,
    editIndex,
    bucketListIndex
  ) => {
    if (isEdit) {
      setIsItemEditClicked(true);
      setBucketListIndex(bucketListIndex);
      setEditItemIndex(editIndex);
    }
    if (isAddItemClicked) {
      setSelectedListId("");
      setIsAddItemClicked(false);
      setIsItemEditClicked(false);
      setEditItemIndex(null);
      setBucketListIndex(null);
    } else {
      setSelectedListId(id);
      setIsAddItemClicked(true);
    }
  };
  const handleNavigateToAddNewMemory = () => {
    navigate("/add-new-memory");
  };

  const handleCheckListItem = async (bucketListIndex, listItemIndex) => {
    setListLoading(true);
    var list = bucketLists[bucketListIndex].list;
    const id = bucketLists[bucketListIndex].id;
    var newListItem = {
      ...bucketLists[bucketListIndex].list[listItemIndex],
      checked: !bucketLists[bucketListIndex].list[listItemIndex].checked,
    };
    await updateDoc(doc(db, "bucketLists", id), {
      list: list,
    });
    setBucketLists(
      bucketLists.map((bucketList, index) => {
        if (index === bucketListIndex) {
          return {
            ...bucketList,
            list: bucketLists[bucketListIndex].list.map((list, index) => {
              if (index === listItemIndex) {
                return newListItem;
              } else {
                return list;
              }
            }),
          };
        } else {
          return bucketList;
        }
      })
    );
    setListLoading(false);
  };
  useEffect(() => {
    handleAddData();
    console.log("hey");
  }, []);
  return (
    <div className="App">
      <CustomText fontWeight="900" fontSize="30px" color="#E74646">
        {HeaderContent}
      </CustomText>
      <CustomText>Look who learnt to keep them (To an extent)..❤️</CustomText>

      {loading ? (
        <AddFlex
          flexDirection="column"
          width="100%"
          height="80vh"
          alignItems="center"
          justify="center"
        >
          <CircularProgress color="info" sx={{ color: "black" }} />
          <CustomText>Hang on, Hang on</CustomText>
        </AddFlex>
      ) : (
        <>
          <Backdrop open={listLoading} sx={{ zIndex: "111111" }}>
            <AddFlex
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <CircularProgress sx={{ color: "white" }} />
              <CustomText color="white">Please Wait</CustomText>
            </AddFlex>
          </Backdrop>
          <Icon
            bottom={isShowIconClicked && "75px"}
            showIcon={isShowIconClicked}
            onClick={handleAddNewList}
          >
            <ListAltIcon />
          </Icon>
          <Icon
            bottom={isShowIconClicked && "140px"}
            showIcon={isShowIconClicked}
            onClick={handleNavigateToAddNewMemory}
          >
            <FavoriteIcon />
          </Icon>
          <Icon showIcon={true} rotate_transform={isShowIconClicked}>
            <Add
              onClick={() => {
                setIsShowIconClicked(!isShowIconClicked);
              }}
            />
          </Icon>
          <AddFlex
            flexDirection="column"
            alignItems="flex-start"
            padding="20px"
          >
            <CustomText fontSize="17px" fontWeight="600" margin="10px 0">
              Memories
            </CustomText>
            <Memories memoryList={memoryList} />
          </AddFlex>

          <AddFlex
            flexDirection="column"
            alignItems="flex-start"
            padding="20px"
          >
            <CustomText fontSize="17px" fontWeight="600" margin="10px 0">
              Bucket Lists
            </CustomText>
            <BucketList
              addBucketListClicked={isAddBucketListClicked}
              lists={bucketLists}
              bucketListIndex={bucketListIndex}
              id={selectedListId}
              isAddItemClicked={isAddItemClicked}
              isItemEditClicked={isItemEditClicked}
              editItemIndex={editItemIndex}
              handleCheckListItem={handleCheckListItem}
              handleAddItemDialogClicked={handleAddItemDialogClicked}
              handleDialogAction={handleAddNewList}
              updateBucketLists={handleUpdateBucketLists}
            />
          </AddFlex>
        </>
      )}
    </div>
  );
}

export default App;
