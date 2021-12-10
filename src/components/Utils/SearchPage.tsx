import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import "./index.css";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { BookType } from "../../state/reducers/repositoriesReducer";
import { Helmet } from "react-helmet";
import HomeProduct from "../MainContent/HomeProduct";
import { SEARCH_LINK } from "../../helper";
import { toast } from "react-toastify";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SearchPage: React.FC = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const keyword = query.get("keyword") || "";
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [page, setPage] = useState(1);
  const history = useHistory();

  const pageNum=0;
  const pageSize=100;

  const [books, setBooks] = useState<BookType[]>([]);
  useEffect(() => {
    (async () => {
      fetch(
        SEARCH_LINK + `?pageNum=${pageNum}&pageSize=${pageSize}&keyword=${keyword}`
      )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "cant find search result!";
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
    }) ();
  }, []);


  const sizeProducts = books.length;

  const onSearchHandler = () => {
    history.push(`/search?keyword=${searchInput}`);
    history.go(0);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const query = new URLSearchParams(location.search);
    const pageNumber = parseInt(query.get("page") || "1", 10);
    if (sizeProducts < 15 * (pageNumber - 1)) {
      setPage(1);
      history.replace(`${location.pathname}?page=1`);
    } else setPage(pageNumber);
  }, [history, location, sizeProducts]);

  return (
    <>
      <div
        style={{
          width: "100%",
          backgroundColor: "rgb(245, 251, 255)",
          padding: "32px",
          fontSize: "1.2rem",
        }}
      >
        <span>Search result for: </span>
        <span style={{ fontWeight: "bold", color: "var(--primary-color)" }}>
          {keyword}
        </span>
      </div>
      {books.length > 0 ? (
        <div className="app__container">
          <Helmet>
            <meta charSet="utf-8" />
            <title>Search</title>
          </Helmet>
          <div className="home-filter-search">
            <div className="header-with-search">
              <div className="header__search">
                <div className="header__search-input-wrap">
                  <input
                    type="text"
                    className="header__search-input"
                    placeholder="Search"
                    value={searchInput}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        if (searchInput) {
                          e.currentTarget.blur();
                          onSearchHandler();
                        }
                      }
                    }}
                    onChange={(e) => {
                      setSearchInput(e.target.value);
                    }}
                  />
                  
                </div>
                <button
                  className="header__search-btn"
                  disabled={!searchInput}
                  onClick={() => {
                    if (searchInput) onSearchHandler();
                  }}
                >
                  <FontAwesomeIcon
                    icon={faSearch}
                    className="header__search-btn-icon"
                  />
                </button>
              </div>
            </div>
          </div>
          <div className="grid">
            <div className="grid__row app-content">

              <div className="home-product">
                <div className="grid__row">
                  {books
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
                  width: "100%",
                }}
              >
                <Stack spacing={2}>
                  <Pagination
                    count={Math.floor(sizeProducts / 15) + 1}
                    page={page}
                    color="secondary"
                    onChange={(event, val) => {
                      history.push(
                        `${location.pathname}?keyword=${keyword}&page=${val}`
                      );
                      setPage(val);
                    }}
                  />
                </Stack>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          style={{
            width: "100%",
            textAlign: "center",
            backgroundColor: "var(--white-color)",
            padding: "12rem",
          }}
        >
          <p style={{ marginTop: 0, fontSize: "1.8rem" }}>
            Cannot find any results
          </p>
          <span style={{ fontWeight: 300 }}>
            Please try other keywords
          </span>
        </div>
      )}
    </>
  );
};

export default SearchPage;
