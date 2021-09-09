import { IGroup, IUserType } from "../../../../types/types";
import axios from "axios";

import AvatarImage from "../../../../common/AvatarImage/AvatarImage";
import DisplayMessages from "../Messenger/DisplayMessages/DisplayMessages";
import SendMessage from "../Messenger/SendMessage/SendMessage";
import JoinGroup from "./JoinGroup/JoinGroup";
import ThreeDots from "./ThreeDots/ThreeDots";
import { useAuthContext } from "../../../../customHooks/useAuthContext";
import GroupType from "../Groups/GroupList/GroupType/GroupType";

function GroupMessenger(props: {
  group: IGroup;
  sendMsgInGroup: (
    message: string,
    sender: IUserType["user"],
    room: string
  ) => void;
}) {
  const authContext = useAuthContext("");
  const { group, sendMsgInGroup } = props;

  const sendMessageHandler = async (message: string) => {
    try {
      const res = await axios({
        url: `http://localhost:5000/group/message`,
        method: "POST",
        data: {
          groupId: group._id,
          sender: authContext?.curUser?._id,
          message,
        },
      });
      authContext?.curUser &&
        sendMsgInGroup(message, authContext?.curUser, group.name);
    } catch (err) {
      console.log(err);
    }
  };
  let curUserIsGroupMember = authContext?.curUser?.groups.some(
    (g) => g === group._id
  );

  const groupIsPublicAndNotMember =
    group.type === "public" &&
    !group.members.some((u) => u._id === authContext.curUser?._id);

  const activeNowMembers = group.members.filter((member) => member.activeNow);
  return authContext?.curUser ? (
    <div className="w-md border-2">
      <div className="flex items-center justify-between">
        <div className="px-12 py-4  flex items-center">
          <AvatarImage imgURL={`http://localhost:5000/${group.img}`} />
          <div className="ml-8">
            <h2 className="text-lg font-medium">{group.name}</h2>
            <span>{activeNowMembers.length} users Active Now</span>
            <GroupType type={group.type} />
            {groupIsPublicAndNotMember && (
              <JoinGroup userId={authContext.curUser._id} groupId={group._id} />
            )}
          </div>
        </div>
        <div className="mr-4 self-center cursor-pointer">
          <ThreeDots
            group={group}
            userId={authContext.curUser._id}
            groupId={group._id}
            curUserIsGroupMember={curUserIsGroupMember}
          />
        </div>
      </div>
      <hr />

      {curUserIsGroupMember || group.type === "public" ? (
        <>
          <DisplayMessages
            curUser={authContext.curUser}
            messages={group.messages}
          />
          <hr />
          <SendMessage
            style={{ width: "80%" }}
            sendMessage={sendMessageHandler}
          />
        </>
      ) : (
        <div className="h-md flex items-center justify-center">
          <div className="w-96">
            <h5 className="mb-4 font-medium">
              This is a private group. You need to join the group first to send
              and receive messages
            </h5>
            <JoinGroup userId={authContext.curUser._id} groupId={group._id} />
          </div>
        </div>
      )}
    </div>
  ) : null;
}

export default GroupMessenger;
