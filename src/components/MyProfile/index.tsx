import { faUserEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useLocation } from "react-router-dom";
import MyAccount from "./MyAccount";
import AddItem from "./AddItem";

const MyProfile: React.FC = () => {
  const user = useTypedSelector((state) => state.repositories.user);
  const isLoggedIn = useTypedSelector((state) => state.repositories.isLoggedIn);
  const location = useLocation();
  // const [categoryActive, setCategoryActive] = useState("account");

  // useEffect(() => {
  //   setCategoryActive(
  //     location.pathname.match("account")
  //       ? "account"
  //       : location.pathname.match("purchase")
  //       ? "purchase"
  //       : location.pathname.match("password")
  //       ? "newPassword"
  //       : "waiting"
  //   );
  // }, [location.pathname]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>My Account</title>
      </Helmet>
      <div className="app__container" style={{ minHeight: "79vh" }}>
        <div className="grid">
          <div className="grid__row app-content">
            
            <div className="grid__column-12">
              <div className="home-product">
                <div className="grid__row" style={{ marginLeft: "8px" }}>
                  {isLoggedIn &&
                    location.pathname === "/my/account" &&
                    user && <MyAccount />}
                  {isLoggedIn &&
                    location.pathname === "/my/addbook" &&
                    user && <AddItem />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyProfile;
