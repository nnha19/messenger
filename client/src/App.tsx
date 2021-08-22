import React, { useState } from "react";

import { Route, Switch, useHistory } from "react-router-dom";
import { AuthContext } from "./context/authContext";
import { IUserType } from "./types/userTypes";

import ChatPage from "./chat/pages/chatPage";
import AuthPage from "./auth/pages/authPage";
import Nav from "./common/Nav/Nav";

function App() {
  const history = useHistory();
  const [curUser, setCurUser] = useState<IUserType["users"]>();

  const isAuth = !!curUser;

  const signInHandler = (userObj: IUserType["users"]) => {
    setCurUser(userObj);
    history.push("/chat");
  };

  const signOutHandler = () => {
    setCurUser(undefined);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        signIn: signInHandler,
        curUser,
        signOut: signOutHandler,
      }}
    >
      <div>
        {isAuth && <Nav />}
        <Switch>
          {isAuth && <Route path="/chat" exact component={ChatPage} />}
          {!isAuth && <Route exact component={AuthPage} />}
        </Switch>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
