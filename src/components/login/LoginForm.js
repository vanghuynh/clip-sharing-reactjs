import "../../asset/css/form.css";
import Logo from "./img/logo.png";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../redux/store/auth";
import { login } from "../../api/service";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";

const LoginForm = () => {
  const isLogin = useSelector((state) => state.auth.isAuthenticated);
  const emailInputRef = useRef();
  const paswordInputRef = useRef();

  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    if (isLogin) {
      history.push("/clips");
    }
  }, [isLogin]);

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPasword = paswordInputRef.current.value;

    login(enteredEmail, enteredPasword)
      .then((res) => {
        console.log(res);
        const data = res.data;
        dispatch(authActions.login());
        dispatch(authActions.setToken(data.token));
        dispatch(authActions.setName(enteredEmail));
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          text: 'Wrong login username, password!',
        })
      });
  };

  const registerHandler = (event) => {
    event.preventDefault();
    history.push("/register");
  }

  const clipHandler = (event) => {
    event.preventDefault();
    history.push("/clips");
  }

  return (
    <div>
    <div className="form-login">
      <form onSubmit={submitHandler}>
        <div className="grid">
          <div className="login">
            <div className="login__headgier">
            </div>
            <div className="login__form">
              <div className="login__content">
              <img src={Logo} alt="logo" className="logo" style={{width:"300px"}}
                   onClick={clipHandler}
              ></img>
                <h2 className="login__content-heading">
                  Login
                </h2>
                <div className="login__import">
                  <div className="form-field">
                    <input type="text" id="name" ref={emailInputRef} required className="form-input" placeholder=" " />
                    <lable htmlFor="name" className="form-lable">User Name</lable>
                  </div>
                  <div className="form-field">
                    <input type="password"
            id="password"
            ref={paswordInputRef}
            required className="form-input" placeholder=" " />
                    <lable htmlFor="password" className="form-lable">Password</lable>
                  </div>
                  <button className="login__import-link" type="button"
                          onClick={registerHandler}>
                    Register
                  </button>
                  <button className="login__import-btn" type="submit">
                    Login
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
