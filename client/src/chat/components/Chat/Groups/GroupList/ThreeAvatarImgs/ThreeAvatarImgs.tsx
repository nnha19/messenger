import React from "react";

import AvatarImage from "../../../../../../common/AvatarImage/AvatarImage";
import { IGroup } from "../../../../../../types/types";

const ThreeAvatarImgs = (props: { group: IGroup }) => {
  const { group } = props;
  let threeMemImgURL: string[] = [];

  for (let i = 0; i < group.members.length; i++) {
    if (threeMemImgURL.length === 3) {
      break;
    }
    threeMemImgURL.push(group.members[i].img);
  }
  const memberImgs = threeMemImgURL.map((imgURL, i) => {
    return (
      <AvatarImage
        key={i}
        imgURL={`http://localhost:5000/${imgURL}`}
        style={{
          height: "2rem",
          width: "2rem",
          marginRight: threeMemImgURL.length > 1 && "-10px",
        }}
      />
    );
  });
  return <>{memberImgs}</>;
};

export default ThreeAvatarImgs;
