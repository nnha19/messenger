export interface IUserType {
  user: {
    email: string;
    username: string;
    _id: string;
    img: string;
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
