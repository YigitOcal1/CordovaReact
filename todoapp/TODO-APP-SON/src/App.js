import React, { useState, useEffect } from "react";
import "./App.css";
import { HashRouter, Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Todo from "./components/Todo";
import Home from "./components/Home";
import { auth } from "./firebase";
function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) setUser(user);
      else setUser(null);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <HashRouter>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route path="/login">
            <Login />
          </Route>

          <Route path="/register">
            <Register />
          </Route>
          <Route path="/todo">
            <Todo user={user} />
          </Route>
        </Switch>
      </HashRouter>
    </>
  );
}

export default App;
