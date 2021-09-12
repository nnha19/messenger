import React, { useState } from "react";

const Message = ({
  timestamp,
  message,
  senderIsCurUser,
}: {
  timestamp: string;
  message: string;
  senderIsCurUser: any;
}) => {
  const [showTimeStamp, setShowTimeStamp] = useState(false);

  let textStyle = senderIsCurUser
    ? `bg-primary text-white ml-auto w-max `
    : "ml-4 bg-gray-200";

  const months = "Jan Feb Mar Apr May Jun July Aug Sep Oct Nov Dec".split(" ");

  const date = new Date(timestamp);
  const hour = date.getHours();
  const min = date.getMinutes();
  const day = date.getDay();
  const month = months[date.getMonth()];

  const showTimeStampHandler = () => setShowTimeStamp(!showTimeStamp);

  return (
    <div className={`${senderIsCurUser ? "ml-auto" : ""}`}>
      <div
        onClick={showTimeStampHandler}
        className={`${textStyle} cursor-pointer rounded-2xl p-4 py-2`}
      >
        <span>{message}</span>
      </div>
      {showTimeStamp && (
        <span className="block text-center text-sm">
          {month} {day}, &nbsp;
          {hour}:{min}
        </span>
      )}
    </div>
  );
};
export default Message;
