import { useEffect, useState } from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { POPULAR_LINK } from "../../helper";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import "./index.css";
import HomeProduct from "../MainContent/HomeProduct";
import { URLSearchParams } from "url";
import { BookType } from "../../state/reducers/repositoriesReducer";
import SearchInput from "../Header/SearchInput";

const HomePage: React.FC = () => {
  const { popularBook, recommendationBook } = useTypedSelector((state) => state.repositories);
  const { isLoggedIn } = useTypedSelector((state) => state.repositories);

  let popularItems = popularBook.slice(0, 5);
  let recommendationItems = recommendationBook.slice(0, 5);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>BRS</title>
      </Helmet>

      <div className="home-filter-search">
        <SearchInput />
      </div>


      {isLoggedIn && (
        <>
          <div className="home-filter">
            <Link
              to={`/menu-item/recommendation`}
              className="home-filter__btn btn btn--primary"
            >
              Recommend
            </Link>
          </div>
          <div className="home-product">
            <div className="grid__row">
              {recommendationItems.map((item) => (
                <HomeProduct key={item.id} data={item} />
              ))}
            </div>
          </div>
        </>
      )}

      <div className="home-filter">
        <Link
          to={`/menu-item/popular`}
          className="home-filter__btn btn btn--primary"
        >
          Popular
        </Link>
      </div>
      <div className="home-product">
        <div className="grid__row">
          {popularItems.map((item) => (
            <HomeProduct key={item.id} data={item} />
          ))}
        </div>
      </div>





      {/* <SwipeableTextMobileStepper /> */}
      {/* {menuItems &&
        menuItems.map((menuItem) => (
          <Product
            key={menuItem.menuItemId}
            name={menuItem.name}
            menuItemID={menuItem.menuItemId}
            items={getAllProducts(menuItem.categories).slice(0, 5)}
          />
        ))} */}
    </>
  );
};

export default HomePage;
