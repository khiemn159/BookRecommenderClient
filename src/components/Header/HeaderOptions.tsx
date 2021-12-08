import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faSignOutAlt,
  faFutbol,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { ActionType } from "../../state/action-types";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { Avatar } from "@mui/material";

const HeaderOptions: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const { isLoggedIn, user, productsOrder } = useTypedSelector(
    (state) => state.repositories
  );
  const menuItems = useTypedSelector((state) => state.repositories.menuItems);

  const btnClasses = `button link ${btnIsHighlighted ? "bump" : ""}`;

  useEffect(() => {
    if (productsOrder.length === 0) {
      return;
    }
    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [productsOrder]);

  return (
    <div className="cssmenu">

      {/***********************************************************/}
      {!isLoggedIn && (
        <Link className="link separate" to="/register">
          Đăng ký
        </Link>
      )}
      {!isLoggedIn && (
        <Link className="link separate" to="/login">
          Đăng nhập
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
            alt={user.name}
            src={user.avatar}
            style={{ marginRight: "8px", width: "30px", height: "30px" }}
          />
          {user.name}
          <ul className="select-category__list">
            {user.email === "admin@gmail.com" ? (
              <>
                {/* <li className="select-input__item">
                  <Link to="/admin/account" className="select-input__link">
                    Quản lý tài khoản
                  </Link>
                </li>
                <li className="select-input__item">
                  <Link to="/admin/order" className="select-input__link">
                    Quản lý đơn hàng
                  </Link>
                </li>
                <li className="select-input__item">
                  <Link to="/admin/product" className="select-input__link">
                    Quản lý sản phẩm
                  </Link>
                </li> */}
              </>
            ) : (
              <>
                <li className="select-input__item">
                  <Link to="/my/account" className="select-input__link">
                    Tài khoản của tôi
                  </Link>
                </li>
                {/* <li className="select-input__item">
                  <Link to="/my/new-password" className="select-input__link">
                    Đổi mật khẩu
                  </Link>
                </li> */}

              </>
            )}
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
                Đăng xuất
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
