import React, { useState } from "react";
import ImageUpload from "../../../../../auth/components/Auth/ImgUpload/ImageUpload";
import Button from "../../../../../common/button/button";
import Input from "../../../../../common/input/Input";
import RadioButton from "../../../../../common/radioButton/radioButton";

interface ICreateGroupInputVal {
  name: string;
  groupImg: string;
  type: string;
}

const CreateGroup = () => {
  const [inputVals, setInputVals] = useState({} as ICreateGroupInputVal);
  const [createGroup, setCreateGroup] = useState(false);

  const changeValHandler = (e) => {};

  const createGroupHandler = () => {
    setCreateGroup(true);
  };

  const hideCreateGroupHandler = () => {
    setCreateGroup(false);
  };

  return (
    <>
      <Button clicked={createGroupHandler}>Create Group</Button>
      {createGroup && (
        <>
          <div onClick={hideCreateGroupHandler} className="backdrop"></div>
          <div className="z-10 bg-white w-md absolute absolute-center shadow-md">
            <h3 className="font-bold text-lg px-8 border-b-2 py-4">
              Create Group
            </h3>
            <form className="px-8 py-4">
              <ImageUpload changeAvatar={changeValHandler} />
              <Input
                type="text"
                placeholder="Group Name"
                value={inputVals["name"]}
                name="groupName"
                onChange={changeValHandler}
              />
              <div className="flex justify-center items-center">
                <RadioButton id="private" label="Private" name="type" />
                <RadioButton id="public" label="Public" name="type" />
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
