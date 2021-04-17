import React from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import Saved from "./components/pages/Saved/index";
import Search from "./components/pages/Search/index";



function App() {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" component={Search} />
        <Route exact path="/search" component={Search} />
        <Route exact path="/saved" component={Saved} />
      </Switch>
    </HashRouter>
  );

}

export default App;