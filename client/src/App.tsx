import React, { useState } from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "./common/auth/auth";

function App() {
  const [isAuth, setIsAuth] = useState<boolean>(false);

  return (
    <div>
      <Router>
        <Switch>
          {isAuth && <></>}
          {!isAuth && (
            <>
              <Route exact component={Auth} />
            </>
          )}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
