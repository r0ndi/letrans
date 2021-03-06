import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import React from "react";
import CssBaseline from '@material-ui/core/CssBaseline';
import HomePage from "../../pages/home/home-page";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import LoginPage from "../../pages/login/login-page";
import RegisterPage from "../../pages/register/register-page";
import UserTranslationListPage from "../../pages/user-translation-list/user-translation-list-page";
import ProtectedRoute from "../../components/protected-route/protected-route";
import TranslatorQuizPage from "../../pages/translator-quiz/translator-quiz-page";
import UserDetailsPage from "../../pages/user-details/user-details-page";

function App() {
  return (
    <>
      <BrowserRouter>
        <ReactNotification />
        <CssBaseline />

        <Switch>
          <Route exact path="/home" component={HomePage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
          <ProtectedRoute path="/user/details" component={UserDetailsPage} />
          <ProtectedRoute path="/tranlator/quiz" component={TranslatorQuizPage} />
          <ProtectedRoute path="/user-translation/list" component={UserTranslationListPage} />

          <Route path="*" component={() => <Redirect to="/home" />} />
        </Switch>

      </BrowserRouter>
    </>
  );
}

export default App;
