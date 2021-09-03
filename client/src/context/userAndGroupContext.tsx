import { createContext } from "react";

import { IUsersType, IGroups, IGroup } from "../types/types";

interface IUserAndGroup {
  users: IUsersType["users"];
  groups: IGroups["groups"];
  setUsers: React.Dispatch<React.SetStateAction<IUsersType["users"]>>;
  setGroups: React.Dispatch<React.SetStateAction<IGroup[]>>;
}

export const UserAndGroupContext = createContext({} as IUserAndGroup);
