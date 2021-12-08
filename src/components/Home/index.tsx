import { useEffect, useState } from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { getAllProducts, POPULAR_LINK } from "../../helper";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
// import "./index.css";
import HomeProduct from "../MainContent/HomeProduct";
import { URLSearchParams } from "url";
import { BookType } from "../../state/reducers/repositoriesReducer";

const HomePage: React.FC = () => {
  // const menuItems = useTypedSelector((state) => state.repositories.menuItems);
  const [popularItems, setPopularItems] = useState<Array<BookType>>([]);
  const { isLoggedIn } = useTypedSelector((state) => state.repositories);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    (async () => {
      fetch(
        POPULAR_LINK + "?pageNum=0&pageSize=5"
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
        setPopularItems(bookfetch.content);
      })
      .catch((err) => {console.log(err)});
    })();
  }, [popularItems])

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>BRS</title>
      </Helmet>

      {isLoggedIn && (
        <>
          <div className="home-filter">
            <Link
              to={`/menu-item/popular`}
              className="home-filter__btn btn btn--primary"
            >
              Recommend
            </Link>
          </div>
          <div className="home-product">
            <div className="grid__row">
              {popularItems.map((item) => (
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
