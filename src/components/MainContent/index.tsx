import { useEffect, useState } from "react";
import HomeProduct from "./HomeProduct";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import "./index.css";
import { getAllProducts } from "../../helper";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import {
  BookType,
  MenuItemType,
} from "../../state/reducers/repositoriesReducer";
import { Helmet } from "react-helmet";
import { useHistory, useLocation, useParams } from "react-router-dom";

const MainContent: React.FC = () => {
  const { popularBook, recommendationBook } = useTypedSelector((state) => state.repositories);
  const [page, setPage] = useState(1);
  const [menuItem, setMenuItem] = useState<MenuItemType>();
  const [titleContent, setTitleContent] = useState<string>("");
  const history = useHistory();
  const location = useLocation();

  const menuItemID = useParams<{ menuItemID?: string }>()?.menuItemID;


  const [books, setBooks] = useState<BookType[]>([]);
  useEffect(() => {
    if (menuItemID === "popular") {
      setBooks(popularBook);
      setTitleContent("Popular Books");
    } else if (menuItemID === "recommendation") {
      setBooks(recommendationBook);
      setTitleContent("Recommend For You");
    }
  }, [menuItemID, setBooks, books, titleContent, setTitleContent]);



  const sizeProducts = books.length;

  useEffect(() => {
    window.scrollTo(0, 0);
    const query = new URLSearchParams(location.search);
    const pageNumber = parseInt(query.get("page") || "1", 10);
    if (
      menuItem &&
      getAllProducts(menuItem.categories).length < 15 * (pageNumber - 1)
    ) {
      setPage(1);
      history.replace(`${location.pathname}?page=1`);
    } else setPage(pageNumber);
  }, [page, location.search, menuItem, location.pathname, history]);

  return (
    <div className="app__container">
      <Helmet>
        <meta charSet="utf-8" />
        <title>{menuItem ? menuItem.name : "Sản phẩm"}</title>
      </Helmet>
      <div className="grid">
        <div className="grid__row app-content">

          <div className="grid__column-12">
            <div className="home-filter">
              <span className="home-filter__label">{titleContent}</span>
            </div>
            <div className="home-product">
              <div className="grid__row">
                {books &&
                  books
                    .slice(15 * (page - 1), 15 * page)
                    .map((item) => (
                      <HomeProduct key={item.id} data={item} />
                    ))}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "2.5rem",
              }}
            >
              <Stack spacing={2}>
                <Pagination
                  count={Math.floor(sizeProducts / 15) + 1}
                  page={page}
                  color="secondary"
                  onChange={(event, val) => {
                    history.push(`${location.pathname}?page=${val}`);
                    setPage(val);
                  }}
                />
              </Stack>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default MainContent;
