import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import LoginForm from "../components/login/LoginForm";
import { useSelector } from "react-redux";
import "../asset/css/navbar.css";
import "../asset/css/header.css";
import "../asset/css/crudModal.css";
import "../asset/css/tableCandidate.css";
import "../asset/css/pagination.css";
import "../asset/css/interviewShedule.css";
import "../asset/css/mentor.css";
import "../asset/css/interview.css";
import "../asset/css/dg.css";
import Navbar from "../components/home/navbar/index";
import Header from "../components/home/header/index";
import ClipList from "../components/clip/list/index";
import RegisterForm from "../components/register/RegisterForm";
function App() {
  const isAuthed = useSelector((state) => state.auth.isAuthenticated);

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          {!isAuthed && <Redirect to="/clips" />}
          {isAuthed && <Redirect to="/clips" />}
        </Route>
        <Route path="/login" exact>
          <LoginForm />
        </Route>
        <Route path="/register" exact>
          <RegisterForm />
        </Route>
        {/*{isAuthed && (*/}
          <>
            <Header />
            <Navbar />
            <Switch>
              <Route>
                <Route path="/clips" exact component={ClipList} />
              </Route>
            </Switch>
          </>
        {/*)}*/}

        <Route path="*">
          <Redirect to="/login" />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
