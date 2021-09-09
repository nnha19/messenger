import axios from "axios";
import React, { useState } from "react";
import ImageUpload from "../../../../../auth/components/Auth/ImgUpload/ImageUpload";
import Button from "../../../../../common/button/button";
import Input from "../../../../../common/input/Input";
import RadioButton from "../../../../../common/radioButton/radioButton";
import { useAuthContext } from "../../../../../customHooks/useAuthContext";
import { useUserAndGroup } from "../../../../../customHooks/userUserAndGroup";

interface ICreateGroupInputVal {
  name: string;
  groupImg: string;
  type: string;
}

const CreateGroup = () => {
  const [inputVals, setInputVals] = useState({} as ICreateGroupInputVal);
  const [createGroup, setCreateGroup] = useState(false);
  const { groups, setGroups } = useUserAndGroup();
  const { curUser, setCurUser } = useAuthContext("");

  const changeValHandler = (e) => {
    const { name, value } = e.target;
    setInputVals({ ...inputVals, [name]: value });
  };

  const setcreateGroupHandler = () => {
    setCreateGroup(true);
  };

  const hideCreateGroupHandler = () => {
    setCreateGroup(false);
  };

  const createGroupHandler = async (e) => {
    e.preventDefault();
    try {
      setCreateGroup(false);
      const { name, groupImg, type } = inputVals;
      const formData = new FormData();
      formData.append("name", name);
      formData.append("type", type);
      formData.append("groupImg", groupImg);
      curUser && formData.append("userId", curUser._id);

      const resp = await axios({
        url: "http://localhost:5000/group",
        method: "POST",
        data: formData,
      });
      setGroups([...groups, resp.data]);
      curUser &&
        setCurUser({ ...curUser, groups: [...curUser.groups, resp.data._id] });
    } catch (err) {
      alert(err);
      console.log(err);
    }
  };
  const changeGroupImageHandler = (e) => {
    setInputVals({ ...inputVals, groupImg: e.target.files[0] });
  };

  return (
    <>
      <div className="text-center border-t-2">
        <Button
          style={{ width: "60%", margin: ".7rem 0" }}
          clicked={setcreateGroupHandler}
        >
          Create Group
        </Button>
      </div>
      {createGroup && (
        <>
          <div onClick={hideCreateGroupHandler} className="backdrop"></div>
          <div className="z-10 bg-white w-md absolute absolute-center shadow-md">
            <h3 className="font-bold text-lg px-8 border-b-2 py-4">
              Create Group
            </h3>
            <form onSubmit={createGroupHandler} className="px-8 py-4">
              <ImageUpload
                style={{ left: "17rem" }}
                changeAvatar={changeGroupImageHandler}
              />
              <Input
                type="text"
                placeholder="Group Name"
                value={inputVals["name"]}
                name="name"
                onChange={changeValHandler}
              />
              <div className="flex justify-center items-center">
                <RadioButton
                  value="private"
                  changeVal={changeValHandler}
                  label="Private"
                  name="type"
                  id="private"
                  checked={inputVals["type"] === "private"}
                />
                <RadioButton
                  value="public"
                  changeVal={changeValHandler}
                  label="Public"
                  name="type"
                  id="public"
                  checked={inputVals["type"] === "public"}
                />
              </div>
              <Button style={{ margin: "1rem 0" }}>Create</Button>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default CreateGroup;
