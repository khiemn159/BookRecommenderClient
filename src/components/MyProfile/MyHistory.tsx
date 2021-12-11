import { useEffect, useState } from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import "./index.css";
import { BOOK_HISTORY_LINK, getAllProducts, POPULAR_LINK } from "../../helper";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import {
  BookType,
  MenuItemType,
} from "../../state/reducers/repositoriesReducer";
import { Helmet } from "react-helmet";
import { useHistory, useLocation, useParams } from "react-router-dom";
import HomeProduct from "../MainContent/HomeProduct";
import { toast } from "react-toastify";

const MyHistory: React.FC = () => {
    const { token, popularBook, recommendationBook } = useTypedSelector((state) => state.repositories);
    const [page, setPage] = useState(1);
    const [menuItem, setMenuItem] = useState<MenuItemType>();
    const [titleContent, setTitleContent] = useState<string>("History");
    const history = useHistory();
    const location = useLocation();
  

    const pageNum = 0;
    const pageSize = 100;
  
  
    const [books, setBooks] = useState<BookType[]>([]);
    useEffect(() => {
      fetch(
        BOOK_HISTORY_LINK + `?pageNum=${pageNum}&pageSize=${pageSize}`,
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
        setBooks(bookfetch.content);
      })
      .catch((err) => {
        toast.error(err.message);
      });
    }, [setBooks, books, titleContent, setTitleContent, token]);
  
  
  
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
          <title>{"History"}</title>
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
  
  export default MyHistory;
  