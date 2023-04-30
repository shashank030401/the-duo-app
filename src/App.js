import { Add } from "@mui/icons-material";
import ListAltIcon from "@mui/icons-material/ListAlt";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { collection, getDocs } from "firebase/firestore";
import "./App.css";
import { useEffect, useState } from "react";
import { db } from "./config-firebase";
import BucketList from "./Components/BucketList";
import { AddFlex, CustomText, Icon } from "./ReusableStyledComponents/Reusable";
import { HeaderContent, PrimaryActionColor } from "./CONSTANTS";
import styled from "styled-components";
import Memories from "./Components/Memories";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";

function App() {
  const [bucketLists, setBucketLists] = useState([]);
  const [memoryList, setMemoryList] = useState([]);
  const [isShowIconClicked, setIsShowIconClicked] = useState(false);
  const [isAddBucketListClicked, setIsBucketListClicked] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleAddData = async () => {
    setLoading(true);
    const bucketLists = await getDocs(collection(db, "bucketLists"));
    const memories = await getDocs(collection(db, "memories"));
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

  const handleNavigateToAddNewMemory = () => {
    navigate("/add-new-memory");
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
      <CustomText>Look who learnt to keep them..❤️</CustomText>

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
          <Icon
            bottom={isShowIconClicked && "65px"}
            showIcon={isShowIconClicked}
            onClick={handleAddNewList}
          >
            <ListAltIcon />
          </Icon>
          <Icon
            bottom={isShowIconClicked && "120px"}
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
