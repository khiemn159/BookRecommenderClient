import { useEffect, useState } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import SignIn from "./components/Utils/SignIn";
import SignUp from "./components/Utils/SignUp";
import styled from "styled-components";
import Home from "./components/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MainContent from "./components/MainContent";
import ProductDetail from "./components/MainContent/ProductDetail";
import { useTypedSelector } from "./hooks/useTypedSelector";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { User, Products, Categories, MenuItems } from "./firebase";
import jwt_decode from "jwt-decode";
import { ActionType } from "./state/action-types";
import {
  ProductType,
  UserType,
  CategoryType,
  MenuItemType,
} from "./state/reducers/repositoriesReducer";
import Loading from "./components/Utils/Loading";
import MyProfile from "./components/MyProfile";
// import Admin from "./components/Admin";
import { getCategoriesOfMenuItem, getProductsOfCategory, getUserWhenReload, POPULAR_LINK, RECOMMENDATION_LINK } from "./helper";
import SearchPage from "./components/Utils/SearchPage";


const Layout = styled.div`
  width: 1200px;
  max-width: 100%;
  margin: 66px auto;
`;

function App() {
  const { isLoggedIn, token } = useTypedSelector(
    (state) => state.repositories
  );
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const pageNum = 0;
  const pageSize = 100;



  const location = useLocation<{ from: { pathname: string } }>();
  useEffect(() => {
    if (isLoggedIn) {
      (async () => {
        fetch(
          POPULAR_LINK + `?pageNum=${pageNum}&pageSize=${pageSize}`
        )
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            return res.json().then((data) => {
              let errorMessage = "Không lấy được dữ liệu popular!";
              throw new Error(errorMessage);
            });
            
          }
        })
        .then((bookfetch) => {
          dispatch({type: ActionType.LOAD_POPULAR_BOOK, payload: [bookfetch.content]});
        })
        .catch((err) => { toast.error(err.message); });
      })();

      (async () => {
        fetch(
          RECOMMENDATION_LINK + `?pageNum=${pageNum}&pageSize=${pageSize}`,
          {
            headers: {
              Authorization: "Bearer " + token,
            }
          }
        )
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            return res.json().then((data) => {
              let errorMessage = "Không lấy được dữ liệu recommendation!";
              throw new Error(errorMessage);
            });
            
          }
        })
        .then((bookfetch) => {
          dispatch({type: ActionType.LOAD_RECOMMENDATION_BOOK, payload: [bookfetch.content]});
        })
        .catch((err) => {
          toast.error(err.message);
        });
      })();
    }
  }, [setIsLoading, isLoggedIn, dispatch, token]);


  return (
    <>
      {isLoading && <Loading />}
      <Layout>
        <ToastContainer autoClose={2000} />
        <Header />

        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/register">
            {!isLoggedIn && <SignUp />}
            {isLoggedIn && location.state && (
              <Redirect to={location.state.from} />
            )}
            {isLoggedIn && !location.state && <Redirect to="/" />}
          </Route>
          <Route path="/login">
            {!isLoggedIn && <SignIn />}
            {isLoggedIn && location.state && (
              <Redirect to={location.state.from} />
            )}
            {isLoggedIn && !location.state && <Redirect to="/" />}
          </Route>
          <Route exact path="/menu-item/:menuItemID" component={MainContent} />
          <Route exact path="/product-detail/:id" component={ProductDetail} />
          <Route exact path="/search" component={SearchPage} />
          <Route exact
            path={[
              "/my/account",
              "/my/purchase",
              "/my/order-waiting",
              "/my/new-password",
            ]}
          >
            {isLoggedIn && <MyProfile />}
            {!isLoggedIn && <Redirect to="/login" />}
          </Route>
          {/* <Route
            exact
            path={["/admin/account", "/admin/order", "/admin/product"]}
          >
            {isLoggedIn && user.email === "admin@gmail.com" && <Admin />}
            {isLoggedIn && user.email !== "admin@gmail.com" && (
              <Redirect to="/" />
            )}
            {!isLoggedIn && <Redirect to="/login" />}
          </Route> */}
          {/* <Route exact path="/product-detail/:id/edit">
            {isLoggedIn && user.email === "admin@gmail.com" && <EditProduct />}
            {isLoggedIn && user.email !== "admin@gmail.com" && (
              <Redirect to="/" />
            )}
            {!isLoggedIn && <Redirect to="/login" />}
          </Route> */}
          <Redirect to="/" />
        </Switch>
      </Layout>


      <Footer />
    </>
  );
}

export default App;
