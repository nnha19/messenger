import React, { useState } from "react";

import { Route, Switch, useHistory } from "react-router-dom";

import { AuthContext } from "./context/authContext";

import ChatPage from "./chat/pages/chatPage";
import AuthPage from "./auth/pages/authPage";

export interface IUser {
  user: {
    username: string;
    email: string;
    _id: string;
  };
}

function App() {
  const history = useHistory();
  const [curUser, setCurUser] = useState<IUser["user"]>();

  const isAuth = !!curUser;

  const signInHandler = (userObj: IUser["user"]) => {
    setCurUser(userObj);
    history.push("/chat");
  };

  return (
    <AuthContext.Provider value={{ isAuth, signIn: signInHandler }}>
      <div>
        <Switch>
          {isAuth && <Route path="/chat" exact component={ChatPage} />}
          {!isAuth && <Route exact component={AuthPage} />}
        </Switch>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
