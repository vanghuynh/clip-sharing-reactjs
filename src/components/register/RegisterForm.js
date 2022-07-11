import "../../asset/css/form.css";
import { useRef } from "react";
import { register } from "../../api/service";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";

const RegisterForm = () => {
  const emailInputRef = useRef();
  const paswordInputRef = useRef();

  const history = useHistory();

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPasword = paswordInputRef.current.value;

    register(enteredEmail, enteredPasword)
      .then((res) => {
        console.log(res);
        const data = res.data;
        console.log(data);
        history.push("/login");
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          text: 'Username may be already exist!',
        })
      });
  };

  const loginHandler = (event) => {
    event.preventDefault();
    history.push("/login");
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
                  <h2 className="login__content-heading">
                    Register
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
                      onClick={loginHandler}>
                      Login
                    </button>
                    <button className="login__import-btn" type="submit">
                      Register
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

export default RegisterForm;
