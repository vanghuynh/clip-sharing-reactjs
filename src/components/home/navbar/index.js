import React from "react";
import { authActions } from "../../../redux/store/auth";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";

export default function Navbar() {
  const id = useSelector((state) => state.auth.id);
  const history = useHistory();
  const isLogin = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const logoutHandler = () => {
    Swal.fire({
      title: "You are logging out?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonText: "Cancel",
      confirmButtonText: "Yes",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(authActions.logout());
      }
    });
  };

  const loginHandler = (event) => {
    event.preventDefault();
    history.push("/login");
  }

  return (
    <div class="wrap">
      <nav>
        <ul class="primary">
          {isLogin && <li className="float--right">
            <a class="nav-color" onClick={logoutHandler}>
              Logout
            </a>
            <ul class="sub"></ul>
          </li>}
          {isLogin && <li className="float--right">

            <p class="nav-color1">
              {id}
            </p>
            <ul class="sub"></ul>
          </li>}
          {!isLogin && <li className="float--right">

            <p class="nav-color1" onClick={loginHandler}>
              Login
            </p>
            <ul class="sub"></ul>
          </li>}
        </ul>
      </nav>
    </div>
  );
}
