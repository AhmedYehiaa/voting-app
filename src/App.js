import React from "react";
import {
  Route,
  Redirect,
  Switch,
  BrowserRouter as Router
} from "react-router-dom";

import Header from "./components/Header";
import Questions from "./containers/Questions";
import QuestionDetails from "./containers/QuestionDetails";
import NotFound from "./components/NotFound";
import NewQuestion from "./containers/NewQuestion";

function App() {
  return (
    <div className="App">
      <Header />
      <Router>
        <Switch>
          <Route exact path="/" component={Questions} />
          <Route path="/questions/new" component={NewQuestion} />
          <Route path="/questions/:id" component={QuestionDetails} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
