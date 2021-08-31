export interface IUserType {
  user: {
    email: string;
    username: string;
    _id: string;
    img: string;
    activeNow: boolean;
  };
}

export interface IUsersType {
  users: IUserType["user"][];
}

export interface IAuthContext {
  isAuth: boolean;
  signIn: (userObj: IUserType["user"]) => void;
  signOut: () => void;
  curUser: IUserType["user"] | undefined;
}

export interface IMessages {
  messages: {
    sender: IUserType["user"];
    message: String;
    _id: string;
  }[];
}

export interface IGroup {
  name: string;
  members: IUserType["user"][];
  messages: IMessages["messages"];
  type: string;
  img: string;
  _id: string;
}

export interface IGroups {
  groups: IGroup[];
}
