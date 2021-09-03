import React, { useState } from "react";

import { Route, Switch, useHistory } from "react-router-dom";
import { AuthContext } from "./context/authContext";
import { IUserType } from "./types/types";

import ChatPage from "./chat/pages/chatPage";
import AuthPage from "./auth/pages/authPage";
import Nav from "./common/Nav/Nav";
import axios from "axios";

function App() {
  const history = useHistory();
  const [curUser, setCurUser] = useState<IUserType["user"]>();
  const isAuth = !!curUser;

  const signInHandler = (userObj: IUserType["user"]) => {
    setCurUser(userObj);
    history.push("/chat");
  };

  const signOutHandler = async () => {
    const resp = await axios({
      url: `http://localhost:5000/user/logout`,
      method: "PUT",
      data: { userId: curUser?._id },
    });
    setCurUser(undefined);
  };
  return (
    <AuthContext.Provider
      value={{
        isAuth,
        signIn: signInHandler,
        curUser,
        setCurUser,
        signOut: signOutHandler,
      }}
    >
      <div>
        {isAuth && <Nav />}
        <Switch>
          {isAuth && curUser && (
            <Route path="/chat" exact component={ChatPage} />
          )}
          {!isAuth && <Route exact component={AuthPage} />}
        </Switch>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
