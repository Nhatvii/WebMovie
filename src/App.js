import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch, useLocation } from "react-router-dom";
import { Fragment} from "react";
import NotFoundPage from "./pages/NotFoundPage";
import route from './routing/route'; 
import RoutingTemplate from "./Template/RoutingTemplate";
function App() {

  const showMenuRouting = routes => {
    if (routes && routes.length > 0) {
      return routes.map((item, index) =>{
        return(
          <RoutingTemplate 
            key={index} 
            exact = {item.exact} 
            path = {item.path} 
            Component = {item.component}
          />
        )
      })
    }
  }

  return (
    <BrowserRouter>
      <Fragment>
        <Switch>
          {showMenuRouting(route)}
          <Route exact path="" component = {NotFoundPage} />
        </Switch>
      </Fragment>
    </BrowserRouter>
  );
}

export default App;
