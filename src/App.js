import { Add } from "@mui/icons-material";
import ListAltIcon from "@mui/icons-material/ListAlt";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { collection, getDocs } from "firebase/firestore";
import "./App.css";
import { useEffect, useState } from "react";
import { db } from "./config-firebase";
import BucketList from "./Components/BucketList";
import { CustomText } from "./ReusableStyledComponents/Reusable";
import { HeaderContent, PrimaryActionColor } from "./CONSTANTS";
import styled from "styled-components";
import Memories from "./Components/Memories";

const Icon = styled.div`
  position: fixed;
  transition: all 0.1s ease-in-out;
  bottom: ${(props) => (props.bottom ? props.bottom : "10px")};
  transform: ${(props) => props.rotate && "rotate(45deg)"};
  right: 10px;
  padding: 10px;
  display: flex;
  align-itms: center;
  justify-content: center;
  -webkit-box-shadow: ${(props) =>
    props.showIcon === true && "-1px 3px 14px 0px rgba(0, 0, 0, 0.31)"};
  -moz-box-shadow: ${(props) =>
    props.showIcon === true && "-1px 3px 14px 0px rgba(0, 0, 0, 0.31)"};
  box-shadow: ${(props) =>
    props.showIcon === true && "-1px 3px 14px 0px rgba(0, 0, 0, 0.31)"};
  border-radius: 100%;
  background-color: ${PrimaryActionColor};
  z-index:${(props) => props.zIndex && props.zIndex}
  cursor: pointer;
`;

export const AddFlex = styled.div`
  display: flex;
  flex-direction: ${(props) =>
    props.flexDirection ? props.flexDirection : "row"};
  padding: ${(props) => props.padding && props.padding};
  margin: ${(props) => props.margin && props.margin};
  flex-grow: ${(props) => props.grow && props.grow};
  width: ${(props) => props.width && props.width};

  align-items: ${(props) => (props.alignItems ? props.alignItems : "row")};
`;
function App() {
  const [bucketLists, setBucketLists] = useState([]);
  const [isShowIconClicked, setIsShowIconClicked] = useState(false);
  const [isAddBucketListClicked, setIsBucketListClicked] = useState(false);
  const handleAddData = async () => {
    const docs = await getDocs(collection(db, "bucketLists"));
    const arr = [];
    docs.forEach((doc) => {
      arr.push(doc.data());
    });
    setBucketLists(arr);
    // setBucketLists(docs);
  };
  const handleUpdateBucketLists = (data) => {
    setBucketLists(data);
  };
  const handleAddNewList = () => {
    setIsBucketListClicked(!isAddBucketListClicked);
  };
  useEffect(() => {
    handleAddData();
  }, []);
  return (
    <div className="App">
      <CustomText fontWeight="900" fontSize="30px" color="#E74646">
        {HeaderContent}
      </CustomText>
      <CustomText>Look who learnt to keep them..❤️</CustomText>

      <Icon
        bottom={isShowIconClicked && "65px"}
        showIcon={isShowIconClicked}
        onClick={handleAddNewList}
      >
        <ListAltIcon />
      </Icon>
      <Icon bottom={isShowIconClicked && "120px"} showIcon={isShowIconClicked}>
        <FavoriteIcon />
      </Icon>
      <Icon showIcon={true} rotate={isShowIconClicked}>
        <Add
          onClick={() => {
            setIsShowIconClicked(!isShowIconClicked);
          }}
        />
      </Icon>
      <AddFlex flexDirection="column" alignItems="flex-start" padding="20px">
        <CustomText fontSize="17px" fontWeight="600" margin="10px 0">
          Memories
        </CustomText>
        <Memories />
      </AddFlex>

      <AddFlex flexDirection="column" alignItems="flex-start" padding="20px">
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
    </div>
  );
}

export default App;
