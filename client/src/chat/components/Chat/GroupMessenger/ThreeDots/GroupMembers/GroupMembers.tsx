import React from "react";
import { IUsersType } from "../../../../../../types/types";
import Users from "../../../Users/Users";

interface IProps {
  hideMembers: () => void;
  groupMembers: IUsersType["users"];
}

const GroupMembers: React.FC<IProps> = ({ hideMembers, groupMembers }) => {
  return (
    <>
      <div className="bg-white absolute-center w-96 z-10 shadow-sm cursor-auto">
        <h1 className="font-medium text-xl my-2  px-8 border-b-2 py-4 ">
          Group Members
        </h1>
        <div className=" px-8 py-4 ">
          <Users style={{ cursor: "auto" }} users={groupMembers} />
        </div>
      </div>
      <div onClick={hideMembers} className="backdrop"></div>
    </>
  );
};

export default GroupMembers;
