import React from "react";
import AvatarImage from "../../../../../common/AvatarImage/AvatarImage";

import { IGroups } from "../../../../../types/types";

interface IProps {
  groups: IGroups["groups"];
}

const GroupList: React.FC<IGroups> = ({ groups }) => {
  const groupListOutput = groups.map((group): JSX.Element => {
    let threeMemImgURL: string[] = [];

    for (let i = 0; i < group.members.length; i++) {
      if (threeMemImgURL.length === 3) {
        break;
      }
      threeMemImgURL.push(group.members[i].img);
    }

    const memberImgs = threeMemImgURL.map((imgURL) => {
      return (
        <AvatarImage
          imgURL={imgURL}
          style={{
            height: "2rem",
            width: "2rem",
            marginRight: threeMemImgURL.length > 1 && "-10px",
          }}
        />
      );
    });

    return (
      <div className="mb-4 cursor-pointer  p-2 py-4 border-2">
        <div className="flex items-center">
          <AvatarImage style={{ alignSelf: "flex-start" }} imgURL={group.img} />
          <div className="ml-4">
            <h4 className="font-medium text-xl mb-2">{group.name}</h4>
            <div className="flex items-center">
              <div className="flex mr-4">{memberImgs}</div>
              <span>{group.members.length} Members</span>
            </div>
          </div>
        </div>
      </div>
    );
  });
  return <div className="p-4">{groupListOutput}</div>;
};

export default GroupList;
