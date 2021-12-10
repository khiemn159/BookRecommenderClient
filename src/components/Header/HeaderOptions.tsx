import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { ActionType } from "../../state/action-types";
import { useHistory } from "react-router-dom";
import { Avatar } from "@mui/material";
import { getUserWhenReload } from "../../helper";

const HeaderOptions: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { isLoggedIn, user, token } = useTypedSelector(
    (state) => state.repositories
  );


  useEffect(() => {
    if (user && !user.id) {
      (async()=>{
        let user = await getUserWhenReload(token);
        dispatch({ type: ActionType.LOAD_USER, payload: user });

      })();
    }
  },[user, token]);

  return (
    <div className="cssmenu">

      {/***********************************************************/}
      {!isLoggedIn && (
        <Link className="link separate" to="/register">
          Sign Up
        </Link>
      )}
      {!isLoggedIn && (
        <Link className="link separate" to="/login">
          Log In
        </Link>
      )}

      {/***********************************************************/}
      {isLoggedIn && (
        <div
          className={`link list__category ${
            user.email === "admin@gmail.com" ? "" : "separate"
          }`}
        >
          <Avatar
            alt={user.id}
            src={user.avatar}
            style={{ marginRight: "8px", width: "30px", height: "30px" }}
          />
          {user.id}
          <ul className="select-category__list">
            <li className="select-input__item">
              <Link to="/my/account" className="select-input__link">
                My Account
              </Link>
            </li>
            {
              user.isAdmin && (
                <li className="select-input__item">
                  <Link to="/my/addbook" className="select-input__link">
                    Add Book
                  </Link>
                </li>
              )
            }
            
            {/* LOG OUT ***********************************************************/}
            <li className="select-input__item">
              <button
                onClick={() => {
                  dispatch({ type: ActionType.LOGOUT });
                  history.replace("/");
                }}
                className="select-input__link"
                style={{
                  padding: "2px 8px",
                  cursor: "pointer",
                  marginTop: "4px",
                  marginLeft: "-6px",
                  border: "none",
                  outline: "none",
                  backgroundColor: "var(--white-color)",
                }}
              >
                Log out
                <FontAwesomeIcon
                  icon={faSignOutAlt}
                  style={{ marginLeft: "8px" }}
                />
              </button>
            </li>
          </ul>
        </div>
      )}

    </div>
  );
};

export default HeaderOptions;
