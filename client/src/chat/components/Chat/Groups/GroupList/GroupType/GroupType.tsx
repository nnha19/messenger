import React from "react";

const GroupType = (props: { type: string }) => {
  let typeOutput: JSX.Element;
  if (props.type === "public") {
    typeOutput = (
      <>
        <i className="fas fa-globe-europe "></i>
        <span className="ml-2">Public</span>
      </>
    );
  } else {
    typeOutput = (
      <>
        <i className="fas fa-lock  "></i>
        <span className="ml-2">Private</span>
      </>
    );
  }
  return <div className="mt-2 text-gray-500 text-sm">{typeOutput}</div>;
};

export default GroupType;
